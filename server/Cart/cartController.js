const cartSchema = require("./cartSchema")

const addCart = (req, res) => {

let date = new Date()
    const art = new cartSchema({
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


//View all cart

const viewCartByUserid = (req, res) => {
    cartSchema.find({userid:req.params.id}).populate('artistId').populate('artid')
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


const deleteCartById=(req,res)=>{

    cartSchema.findByIdAndDelete({_id:req.params.id}).exec()
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

  module.exports={
    addCart,
    deleteCartById,
    viewCartByUserid
  }