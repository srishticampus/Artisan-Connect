const express = require('express');
const router = express.Router();
const buyerController = require('./controllers/buyercontroller');

router.post('/buyer/register', buyerController.createBuyer);
router.post('/buyer/login', buyerController.loginBuyer);
router.get('/viewall-buyer', buyerController.getAllBuyers);
router.get('/viewbuyerbyid/:id', buyerController.getBuyerById);
router.post('/editbuyerbyid/:id', buyerController.updateBuyer);
router.post('/buyer/deactivate/:id', buyerController.deactivateBuyer);
router.post('/buyer/activate/:id', buyerController.activateBuyer);

module.exports = router;
