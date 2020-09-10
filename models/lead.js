const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true
    },
    first_name:{
        type:String,
        required:true,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        trim:true
    },
    mobile: {
        type: String,
        unique: true,
        maxlength:10,
        minlength:10,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true
    },
    location_type: {
        type:String,
        enum:['Country','City','Zip'],
        required:true
    },
    location_string: {
        type:String,
        required:true
    },
    status: {
        type:String,
        enum:['Created','Contacted'],
        required:true
    },
    communication: {
        type: String,
        default:null
    }
},{
    timestamps:true
})

leadSchema.pre('save', async function (next) {
    const lead = this
    lead.status = 'Created'
    next()
})


const Lead = mongoose.model('Lead',leadSchema)

module.exports = Lead