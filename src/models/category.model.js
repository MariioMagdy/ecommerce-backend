const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:30
    },
    parent_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Category',
        default:null
    }
},{
    timestamps:true
})

CategorySchema.virtual('parentCategory', {
    ref:'Category',
    localField: '_id',
    foreignField:'parent_id'
})

CategorySchema.virtual('myProducts', {
    ref:'Product',
    localField: '_id',
    foreignField:'category_id'
})



const Category = mongoose.model('Category', CategorySchema)
module.exports =Category