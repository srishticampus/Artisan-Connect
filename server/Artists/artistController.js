const Artists=require('./artistSchema')
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

const registerArtist=(req,res)=>{


    const newArtist=new Artists({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        image:req.file,
        housename:req.body.housename,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        password:req.body.password,
        dob:req.body.dob
    })
    newArtist.save().then(data=>{
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
//Artist Registration -- finished

//Login Artist 
const loginArtist=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
  
    Artists.findOne({email:email}).exec().then(data=>{
      if(password==data.password){
        res.json({
          status:200,
          msg:"Login successfully",
          data:data
      })
    }else{
      res.json({
        status:500,
        msg:"password Mismatch",
        
    })
    }
    
  }).catch(err=>{
  res.json({
      status:500,
      msg:"Artist not found",
      Error:err
  })
  })
    };
  
  
  //Login Artist --finished
  
  
  //View all Artists
  
  const viewArtists=(req,res)=>{
    Artists.find().exec()
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
  
  
  //update Artist by id
  const editArtistById=(req,res)=>{
  
    
      
    Artists.findByIdAndUpdate({_id:req.params.id},{
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        image:req.file,
        housename:req.body.housename,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        dob:req.body.dob
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
// view cust by id
  const viewArtistById=(req,res)=>{
    Artists.findOne({_id:req.params.id}).exec()
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
  
  const deleteArtistById=(req,res)=>{

    Artists.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
    emps=data
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
  //forgotvPawd Artist by id
  const forgotPwd=(req,res)=>{
  
    
      
    Artists.findOneAndUpdate({email:req.body.email},{
     
      password:req.body.password
      })
  .exec().then(data=>{
    if(data!=null)
    res.json({
        status:200,
        msg:"Updated successfully"
    })
    else
    res.json({
      status:500,
      msg:"Artist Not Found"
     
  })
  }).catch(err=>{
    console.log(err);
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
  



module.exports={
  registerArtist,
  viewArtists,
  editArtistById,
  loginArtist,
  forgotPwd,
  viewArtistById,
  deleteArtistById,
  upload
}