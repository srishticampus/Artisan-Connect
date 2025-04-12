const mongoose= require("mongoose");

const cartSchema=mongoose.Schema({
   userid:{
        type:String,
        required:true
    },
    artid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artworks'
    },
   
    date:{
        type:Object,
       required:true
    },
    artistId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artists'
    }
});
module.exports=mongoose.model('carts',cartSchema)

