const mongoose= require("mongoose");

const artistSchema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    housename:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        default:'user.png'
    }
});
module.exports=mongoose.model('artists',artistSchema)

