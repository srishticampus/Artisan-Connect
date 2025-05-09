const orderSchema = require("./orderSchema")
const deliveryschema=require("../Delivery/deliverySchema")
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

const viewOrders = (req, res) => {
    orderSchema.find({}).populate('userid').populate('artid').populate('deliveryId')
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

  
  const viewPendingOrdersForDelivery = async (req, res) => {
    
    try {
        const deliveryAgentId = req.params.deliveryId;
        console.log(deliveryAgentId);

        // Get the delivery agent's district
        const deliveryAgent = await deliveryschema.findById({_id:deliveryAgentId})
        console.log(deliveryAgent);
        
        if (!deliveryAgent) {
            return res.json({ status: 404, msg: "Delivery agent not found" });
        }

        const agentDistrict = deliveryAgent.district;

        // Get all orders with pending deliveryAssigned
        const pendingOrders = await orderSchema.find({ deliveryAssigned: 'pending' })
            .populate('artistId')
            .populate('userid')
            .populate('artid');

        // Filter orders where user's district matches the delivery agent's
        const filteredOrders = pendingOrders.filter(order => {
            return order.userid && order.userid.district === agentDistrict;
        });

        res.json({
            status: 200,
            msg: "Filtered data obtained successfully",
            data: filteredOrders
        });
    } catch (err) {
        console.log(err);
        res.json({
            status: 500,
            msg: "Error fetching data",
            Error: err
        });
    }
}

  
const updateStatusOfOrdersByOrderId=(req,res)=>{

    orderSchema.findByIdAndUpdate({_id:req.params.id},{
        deliveryStatus:req.body.deliveryStatus
    }).exec()
    .then(data=>{
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
  const viewOrderHistoryByUserId = async (req, res) => {
    try {
        const userId = req.params.userid;

        const orders = await orderSchema.find({ userid: userId })
            .populate('artistId')
            .populate('userid')
            .populate('artid')
            .populate('deliveryId')
            .sort({ date: -1 }); // optional: sort newest first

        if (orders.length > 0) {
            res.json({
                status: 200,
                msg: "Order history retrieved successfully",
                data: orders
            });
        } else {
            res.json({
                status: 200,
                msg: "No order history found for this user"
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: 500,
            msg: "Error retrieving order history",
            Error: err
        });
    }
}

   
const acceptorderByDeliverAgent=(req,res)=>{

    orderSchema.findByIdAndUpdate({_id:req.params.id},{
        deliveryAssigned:'assigned',
        deliveryId:req.body.deliveryId,
        expectedDeliveryDate:req.body.expectedDeliveryDate
    }).exec()
    .then(data=>{
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
acceptorderByDeliverAgent,
viewOrders
  }