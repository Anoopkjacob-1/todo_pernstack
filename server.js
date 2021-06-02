const express =require('express');
const app =express();
const cors=require('cors');
const pool=require('./db');

app.use(cors())
app.use(express.json())
const PORT =5000

// Routes

app.post('/todo',async(req,resp)=>{
    try {
      const {description}=req.body;
      const newtodo =await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING * ",[description])
      console.log(newtodo)
      resp.json(newtodo.rows[0])
    } catch (error) {
        console.log(error);
    }

})



app.get('/gettodo',async(req,resp)=>{
    try {
      const alltodo =await pool.query("SELECT * FROM todo")
      resp.json(alltodo.rows)
    } catch (error) {
        console.log(error);
    }
})


app.get('/getonetodo/:todo_id',async(req,resp)=>{
    try {
        console.log(req.params)
       const {todo_id} =req.params
      const onetodo =await pool.query("SELECT * FROM todo WHERE todo_id=$1",[todo_id])
      resp.json(onetodo.rows)
    } catch (error) {
        console.log(error);
    }
})

app.put('/gettodoupdate/:todo_id',async(req,resp)=>{
    try {
       const {description}=req.body
       const {todo_id} =req.params
      const onetodo =await pool.query("UPDATE  todo SET description=$1 WHERE todo_id=$2 RETURNING * ",[description,todo_id])
      resp.json({message:"Todo updated",data:onetodo.rows})
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT,()=>{
    console.log(`server running ${PORT}`)
})