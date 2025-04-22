const mongoose= require("mongoose");

const deliverySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    housename:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    vehicleRegNumber:{
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
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    aadhar:{
        type:Number,
        required:true,
       
        dropDups: true
        },
    licence:{
        type:Object,
        required:true
    }
    ,
    isactive:{
        type:Boolean,
        default:false
    }

});
module.exports=mongoose.model('deliveryagents',deliverySchema)

