const mongoose= require("mongoose");

const orderSchema=mongoose.Schema({
   userid:{
        type:String,
        required:true,
        ref:'users'
    },
    artid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artworks'
    },
   
    date:{
        type:Date,
       required:true
    },
    artistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artists'
    },
    deliveryAssigned:{
        type:String,
        default:'pending'
    },
    deliveryStatus:{
        type:String,
        default:'pending'
    },
    deliveryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'deliveryagents'
    },expectedDeliveryDate:{
        type:Date
    }
});
module.exports=mongoose.model('orders',orderSchema)

