const express=require('express')
const router=express.Router()
const userController=require('./Users/userController')
const artistController=require('./Artists/artistController')
const deliveryController=require('./Delivery/deliveryController')
const artwork=require('./Artists/ArtWorks/artWorkController')
const cart=require('./Cart/cartController')
const orderController=require('./Orders/orderController')


//user routes
router.post('/registerUser',userController.upload,userController.registerUser)
router.post('/loginUser',userController.loginUser)
router.post('/viewUserById/:id',userController.viewUserById)
router.post('/viewUsers',userController.viewUsers)
router.post('/editUserById/:id',userController.upload,userController.editUserById)
router.post('/deleteUserById/:id',userController.deleteUserById)
router.post('/forgotPwdUser',userController.forgotPwd)

//artist routes
router.post('/registerArtist',artistController.upload,artistController.registerArtist)
router.post('/loginArtist',artistController.loginArtist)
router.post('/viewArtistById/:id',artistController.viewArtistById)
router.post('/viewArtists',artistController.viewArtists)
router.post('/editArtistById/:id',artistController.upload,artistController.editArtistById)
router.post('/deleteArtistById/:id',artistController.deleteArtistById)
router.post('/forgotPwdArtist',artistController.forgotPwd)


//Delivery agent 
router.post('/registerdelivery',deliveryController.upload,deliveryController.registerdelivery)
router.post('/logindelivery',deliveryController.logindelivery)
router.post('/viewdeliveryById/:id',deliveryController.viewdeliveryById)
router.post('/viewdeliveryReqs',deliveryController.viewdeliveryReqs)
router.post('/editdeliveryById/:id',deliveryController.upload,deliveryController.editdeliveryById)
router.post('/deletedeliveryById/:id',deliveryController.deletedeliveryById)
router.post('/acceptDelReqs/:id',deliveryController.acceptDelReqs)
router.post('/viewdeliverys',deliveryController.viewdeliverys)


//art works
router.post('/addartworks',artwork.upload,artwork.addartworks)
router.post('/editArtWorkById/:id',artwork.upload,artwork.editArtWorkById)
router.post('/deleteArtWorkById/:id',artwork.deleteArtWorkById)
router.post('/viewArtworkById/:id',artwork.viewArtWorksById)
router.post('/viewArtworks',artwork.viewArtworks)
router.post('/viewArtWorksByArtistId/:id',artwork.viewArtWorksByArtistId)
router.post('/searchartByName/:name', artwork.searchArtByName)


//cart
router.post('/addCart',cart.addCart)
router.post('/viewCartByUserid/:id',cart.viewCartByUserid)
router.post('/deleteCartById/:id',cart.deleteCartById)

//order
router.post('/orderitem',orderController.addOrder)
router.post('/vieworderByUserid/:id',orderController.viewOrderByUserid)
router.post('/viewOrderByArtist/:id',orderController.viewOrderByArtist)
router.post('/deleteOrderById/:id',orderController.deleteOrderById)

router.post('/addOrderFromCart',orderController.addOrderFromCart)
router.post('/viewPendingOrdersForDelivery',orderController.viewPendingOrdersForDelivery)
router.post('/updateStatusOfOrdersByOrderId/:id',orderController.updateStatusOfOrdersByOrderId)
router.post('/viewOrdersByDeliveryId/:id',orderController.viewOrdersByDeliveryId)
router.post('/acceptorderByDeliverAgent/:id',orderController.acceptorderByDeliverAgent)

module.exports=router
