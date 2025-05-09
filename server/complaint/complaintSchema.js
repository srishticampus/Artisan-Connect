const mongoose = require("mongoose");

const buyercomplaintSchema = new mongoose.Schema(
    {

        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        description:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:new Date()
        },
        
    })

    const artisancomplaintSchema = new mongoose.Schema(
    {

        artisanId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'artists'
        },
        description:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:new Date()
        },
        
    })

    var buyercomplaint=mongoose.model('buyercomplaints',buyercomplaintSchema )
    var artisancomplaint=mongoose.model('artisancomplaints',artisancomplaintSchema)

    module.exports={
        buyercomplaint,
        artisancomplaint
    }