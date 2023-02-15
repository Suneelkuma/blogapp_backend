const express=require("express");

const router=express.Router();

const Todo=require('../models/todoSchema')
const middleware=require("../middleware/authenticate")
router.post('/createTodo',middleware,async(req,res)=>{
  try {
    const {title,description}=req.body
    if (!title||!description) {
        return res.status(422).json({error:"Please fill all the data"})
    }
    const todo=await Todo.create({title,description,user:req.userID})
    const savedtodo=todo.save();
    res.status(200).json({
        status:"success",
        todo
    })

  } catch (e) {
    res.status(500).json({
        status:"failed",
        message:e.message
    })
  }
})


router.get('/fetchalltodos',middleware,async(req,res)=>{
    try {
        const todos=await Todo.find({user:req.userID})
        res.json(todos)
    } catch (e) {
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})
module.exports=router;