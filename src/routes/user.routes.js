const express=require('express')
const userModel=require('../models/user.model')
const auth = require('../middleware/auth')
const router= new express.Router()

router.post('/login', async(req,res)=>{
    try{
        user = await userModel.findUserByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.send({user, token})
    }
    catch(e){
        res.send({
            status:0,
            message:"error",
            data:e
        })
    }
}) //working

router.post('/register', async(req, res)=>{
   const user = new userModel(req.body)
    console.log(req.body)
    try{
                      await user.save()
        const token = await user.generateToken()
        res.send({
            status:1,
            data: user,
            message:'added'
        })
    }
    catch(error){
        res.send({
            status:0,
            data:error,
            message:"error"
            
        })
    }
}) //working

router.patch('/user/:id', async(req,res)=>{
    availableUpdates = ['fname', 'lname', 'username','role']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await userModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e,
            message: 'error update data'
        })
    }
})  //working

router.delete('/user/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await userModel.findByIdAndDelete(id)
        res.status(200).send({
            status:1,
            data:'',
            message:'deleted'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e,
            message: 'error deleting data'
        })
    }
})

router.patch('/editPassword/:id', async(req,res)=>{
    availableUpdates = ['password']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await userModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'password updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e,
            message: 'error update data'
        })
    }
}) 

router.get('/allUsers', auth, async(req,res)=>{
    try{
        const users = await userModel.find()
        res.status(200).send({
            status:1,
            data:users,
            message:'all data retrieved'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e,
            message: 'error retreive  data'
        })
    }
})

// show all address

//add address

//edit address 

//delete address

// add to order

// get all orders

router.get('/userOrders', auth, async(req,res)=>{    
    try{
        orders = await userModel.findById(req.user._id, 'orders')
        res.status(200).send({
            status:1,
            data:orders,
            message:'orders retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) //working

module.exports = router