const express = require('express')
const router = express.Router()
const userController = require('./Users/userController')
const artistController = require('./Artists/artistController')
const deliveryController = require('./Delivery/deliveryController')
const artwork = require('./Artists/ArtWorks/artWorkController')
const cart = require('./Cart/cartController')
const orderController = require('./Orders/orderController')
const chatController=require("./Chat/chatController")
const favoriteController=require("./favorite/favoritecontroller")
const ratingController=require("./Artists/ArtWorks/ratingcontroller")

const {
    BuyerAddComplaints,
    artisanAddComplaints,
    viewbuyerComplaint,
    viewartisanComplaint, viewBuyerComplaintById, viewArtisanComplaintById
} = require('./complaint/complainedcontroller');

//user routes
router.post('/registerUser', userController.upload, userController.registerUser)
router.post('/loginUser', userController.loginUser)
router.post('/viewUserById/:id', userController.viewUserById)
router.post('/viewUsers', userController.viewUsers)
router.post('/editUserById/:id', userController.upload, userController.editUserById)
router.post('/deleteUserById/:id', userController.deleteUserById)
router.post('/forgotPwdUser', userController.forgotPwd)

//artist routes
router.post('/registerArtist', artistController.upload, artistController.registerArtist)
router.post('/loginArtist', artistController.loginArtist)
router.post('/viewArtistById/:id', artistController.viewArtistById)
router.post('/viewArtists', artistController.viewArtists)
router.post('/editArtistById/:id', artistController.upload, artistController.editArtistById)
router.post('/deleteArtistById/:id', artistController.deleteArtistById)
router.post('/forgotPwdArtist', artistController.forgotPwd)


//Delivery agent 
router.post('/registerdelivery', deliveryController.upload, deliveryController.registerdelivery)
router.post('/logindelivery', deliveryController.logindelivery)
router.post('/viewdeliveryById/:id', deliveryController.viewdeliveryById)
router.post('/viewdeliveryReqs', deliveryController.viewdeliveryReqs)
router.post('/editdeliveryById/:id', deliveryController.upload, deliveryController.editdeliveryById)
router.post('/deletedeliveryById/:id', deliveryController.deletedeliveryById)
router.post('/acceptDelReqs/:id', deliveryController.acceptDelReqs)
router.post('/viewdeliverys', deliveryController.viewdeliverys)
router.post('/forgotPwddeliveryagent', deliveryController.forgotPwd)


//art works
router.post('/addartworks', artwork.upload, artwork.addartworks)
router.post('/editArtWorkById/:id', artwork.upload, artwork.editArtWorkById)
router.post('/deleteArtWorkById/:id', artwork.deleteArtWorkById)
router.post('/viewArtworkById/:id', artwork.viewArtWorksById)
router.post('/viewArtworks', artwork.viewArtworks)
router.post('/viewArtWorksByArtistId/:id', artwork.viewArtWorksByArtistId)
router.post('/searchartByName/:name', artwork.searchArtByName)


//cart
router.post('/addCart', cart.addCart)
router.post('/viewCartByUserid/:id', cart.viewCartByUserid)
router.post('/deleteCartById/:id', cart.deleteCartById)
router.post('/viewCart', cart.viewCart)
//order
router.post('/orderitem', orderController.addOrder)
router.post('/vieworderByUserid/:id', orderController.viewOrderByUserid)
router.post('/viewOrderByArtist/:id', orderController.viewOrderByArtist)
router.post('/deleteOrderById/:id', orderController.deleteOrderById)

router.post('/viewOrders', orderController.viewOrders)
router.post('/addOrderFromCart', orderController.addOrderFromCart)
router.post('/viewPendingOrdersForDelivery/:deliveryId', orderController.viewPendingOrdersForDelivery)
router.post('/updateStatusOfOrdersByOrderId/:id', orderController.updateStatusOfOrdersByOrderId)
router.post('/viewOrdersByDeliveryId/:id', orderController.viewOrdersByDeliveryId)
router.post('/acceptorderByDeliverAgent/:id', orderController.acceptorderByDeliverAgent)


router.post('/deleteCartByUserId/:userid', cart.deletecartbyuserid)
// complaints

router.post('/buyer/addComplaint/:id', BuyerAddComplaints);
router.post('/artisan/addComplaint/:id', artisanAddComplaints);
router.get('/buyer/viewComplaints', viewbuyerComplaint);// Route to view all artisan complaints
router.get('/artisan/viewComplaints', viewartisanComplaint);
router.get('/buyer/view/:id', viewBuyerComplaintById);
router.get('/artisan/view/:id', viewArtisanComplaintById);

// chet
router.post('/send', chatController.sendMessage);
router.get('/history/:fromUser/:toUser/:productId', chatController.getMessages);
router.get('/getAllChatsForArtisan/:artisanId', chatController.getAllChatsForArtisan);

router.post("/addToFavorites", favoriteController.addToFavorites);
router.get("/getFavorites/:userId", favoriteController.getUserFavorites);
router.post("/removeFavorite", favoriteController.removeFavorite);

router.post('/rate/:artworkId', ratingController.rateArtwork);
router.get('/average/:artworkId', ratingController.getAverageRating);

module.exports = router
