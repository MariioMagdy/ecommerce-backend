const express=require('express')
const cateModel=require('../models/category.model')

const router= new express.Router()

router.post('/addCate', async(req,res)=>{
    const cate = new cateModel(req.body)
    try{
        await cate.save()
        res.status(200).send({
            status:1,
            data:cate,
            message:'category added successfuly'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error inserting category'
        })
    }
})

router.patch('/cate/:id', async(req,res)=>{
    availableUpdates = ['name','sub_category']
    const reqKeys = Object.keys(req.body)
    flag = reqKeys.every(key=> availableUpdates.includes(key))
    try{
        if(!flag) throw new Error('updates not available')
        await cateModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
        data = await cateModel.findById(req.params.id)
        res.status(200).send({
            status:1,
            data:data,
            message: 'updated'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error update data'
        })
    }
}) //working

router.delete('/cate/:id', async(req,res)=>{
    const id = req.params.id
    try{
        await cateModel.findByIdAndDelete(id)
        res.status(200).send({
            status:1,
            data:'',
            message:'deleted'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error deleting data'
        })
    }
}) //working

router.get('/cate/:parent', async(req,res)=>{

    try{
        categories = await cateModel.findById(req.params.parent)
        sub_category= categories.sub_category
        res.status(200).send({
            status:1,
            data:sub_category,
            message:'Categories retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) 

// get other childern
router.get('/cate/:child_id', async(req,res)=>{
    // id = mongoose.Types.ObjectId(child_id)
    try{
        // categories = await cateModel.findOne({sub_category._id:id})
        // sub_category= categories.sub_category
        sub_category='test'
        res.status(200).send({
            status:1,
            data:sub_category,
            message:'Categories retrived'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retrive data'
        })
    }
}) 


router.get('/allCate', async(req,res)=>{
    try{
        const categories = await cateModel.find()
        res.status(200).send({
            status:1,
            data:categories,
            message:'all data retrieved'
        })
    }
    catch(e){
        res.status(400).send({
            status:0,
            data: e.message,
            message: 'error retreive  data'
        })
    }
})

module.exports = router