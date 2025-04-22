const orderSchema = require('../../Orders/orderSchema');
const artworks=require('./artworkSchema')
const multer=require('multer')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
//Artist Registration 

const addartworks=(req,res)=>{
    const art=new artworks({
      name:req.body.name,
      price:req.body.price,
      file:req.file,
      artistId:req.body.artistId
    })
    art.save()
    .then(data=>{
        res.json({
            status:200,
            msg:"Inserted successfully",
            data:data
        })
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
}
// Registration -- finished


  //View all works
  
  const viewArtworks=(req,res)=>{
    artworks.find().populate('artistId')
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }
  
  // view Artists finished
  
  
  //update work by id
  const editArtWorkById=(req,res)=>{
  
    
      
    artworks.findByIdAndUpdate({_id:req.params.id},{
        name:req.body.name,
        price:req.body.price,
        file:req.file,
        artistId:req.body.artistId

      })
  .exec().then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
// view work by id
  const viewArtWorksById=(req,res)=>{
    artworks.findById({_id:req.params.id}).populate('artistId')
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
  

  
// view work by id
const viewArtWorksByArtistId=(req,res)=>{
  artworks.find({artistId:req.params.id}).exec()
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
  const deleteArtWorkById=async(req,res)=>{
    let flag=0
await orderSchema.findOne({artid:req.params.id}).exec().then(dataa=>{
if(dataa!=null)
{
  if(dataa.deliveryStatus=="pickup"||dataa.deliveryStatus=="assigned"){
    flag=1
  }
}
  })

if(flag==0){
  await artworks.findByIdAndDelete({_id:req.params.id}).exec()
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
}else{
  res.json({
    status:500,
    msg:"You can't delete It as we have an order Received for It "
    
})
}
  
  }

  //search artwork
  const searchArtByName = (req, res) => {
    artworks.find({ name: { $regex: req.params.name, $options: 'i' } }).populate('artistId')
        .then(services => {
            if (services.length === 0) {
                return res.status(404).json({ message: 'No art found with the name.' });
            }
            res.status(200).json(services);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        });
}



  module.exports={
    addartworks,
    editArtWorkById,
    upload,
    deleteArtWorkById,
    viewArtworks,
    viewArtWorksById,
    viewArtWorksByArtistId,
    searchArtByName
  }