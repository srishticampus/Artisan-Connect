const orderSchema = require("./orderSchema")

const addOrder = (req, res) => {

let date = new Date()
    const art = new orderSchema({
        userid: req.body.userid,
        artid: req.body.artid,
      date:date,
        artistId: req.body.artistId
    })
    art.save().then(data => {
        res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data
        })
    }).catch(err => {
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err
        })
    })
}
// Add cart -- finished



const addOrderFromCart = (req, res) => {

    let date = new Date()
    let cartitems=req.body.cartitems

    cartitems.map(x=>{

    
        const art = new orderSchema({
            userid: x.userid,
            artid: x.artid,
          date:date,
            artistId: x.artistId
        })
        art.save().then(data => {
            console.log("data saved");
        }).catch(err => {
           console.log(err);
        })

    })
    
    res.json({
        status: 200,
        msg: "Inserted successfully",
    })
}

//View all cart

const viewOrderByUserid = (req, res) => {
    orderSchema.find({userid:req.params.id}).populate('artistId').populate('artid').populate('deliveryId')
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        }).catch(err => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err
            })
        })

}

const viewOrderByArtist = (req, res) => {
    orderSchema.find({artistId:req.params.id}).populate('userid').populate('artid').populate('deliveryId')
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        }).catch(err => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err
            })
        })

}



const deleteOrderById=(req,res)=>{

    orderSchema.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data removed successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }

  
const viewPendingOrdersForDelivery=(req,res)=>{

    orderSchema.find({deliveryAssigned:'pending'}).populate('artistId')
    .populate('userid')
    .populate('artid')
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }

  
const updateStatusOfOrdersByOrderId=(req,res)=>{

    orderSchema.findByIdAndUpdate({_id:req.params.id},{
        deliveryStatus:req.body.deliveryStatus
    }).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data updated successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data ",
          Error:err
      })
  })
  
  }
  
   
const acceptorderByDeliverAgent=(req,res)=>{

    orderSchema.findByIdAndUpdate({_id:req.params.id},{
        deliveryAssigned:'assigned',
        deliveryId:req.body.deliveryId,
        expectedDeliveryDate:req.body.expectedDeliveryDate
    }).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data updated successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data ",
          Error:err
      })
  })
  
  }
  
const viewOrdersByDeliveryId=(req,res)=>{

    orderSchema.find({deliveryId:req.params.id}).populate('artistId')
    .populate('userid')
    .populate('artid')
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  module.exports={
    addOrder,
    deleteOrderById,
    viewOrderByUserid,
    viewOrderByArtist,
    addOrderFromCart,
    viewPendingOrdersForDelivery,
    viewOrdersByDeliveryId,
updateStatusOfOrdersByOrderId,
acceptorderByDeliverAgent

  }