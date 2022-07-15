const express=require('express')
const router=express.Router()
const { canCreateOrder,canUpdateOrder,viewStatus} = require('../middleware/permissions')

// load order model
const Order = require("../models/order");


// @route   POST /createOrder
// @desc    create order 
// @access  Public
// {role:"xxx",orderID:"xxx"}
router.post('/createOrder',authGetOrder,async (req,res)=>
{
    try {
        const order = await Order.findOne({ orderID:req.body.orderID })
        if (order) {
            return res.status(404).send("Order already exists")
        }
        else{
            const order = new Order({orderName:req.body.orderName,orderID:req.body.orderID,quantity:req.body.quantity,orderDate:req.body.orderDate,orderStatus:req.body.orderStatus});
            return order.save();
        }
       
    } catch (e) {
        res.status(500).send()
    }
});

// @route   POST /updateOrderStatus
// @desc    update order status
// @access  Public
// {role:"xxx",orderID:"xxx"}
router.post('/updateOrderStatus',authUpdateOrder,(req,res)=>
{
Order.findOneAndUpdate({orderID: req.body.orderID}, 
        {orderStatus:req.body.orderStatus}, null, function (err, docs) {
        if (err){
            console.log("No order found")
        }
        else{
            console.log("Order Status Updated");
        }
    });
})
  
// @route   GET /getOrderStatus
// @desc    fetch order status
// @access  Public
// {role:"xxx",orderID:"xxx"}
router.get('/getOrderStatus',authStatusOfOrder,(req,res)=>
{
   
    Order.find({orderID: req.body.orderID})
          .then((order) => res.json(order))
          .catch((err) =>
            res.status(404).json({
              noorderfound: "No order found",
            })
          );
        
})
    

// function to access middleware    
function authGetOrder(req, res, next) {
    if (!canCreateOrder(req.body.role)) {
      res.status(401)
      return res.send(req.body.role+' Not Allowed to create order')
    }
  
    next()
  }
   
  // function to access middleware  
  function authUpdateOrder(req, res, next) {
    if (!canUpdateOrder(req.body.role)) {
      res.status(401)
      return res.send(req.body.role+' Not Allowed to update order')
    }
  
    next()
  }
  
  // function to access middleware  
  function authStatusOfOrder(req, res, next) {
    if (!viewStatus(req.body.role)) {
      res.status(401)
      return res.send(req.body.role+' Not Allowed to view status of order')
    }
  
    next()
  }
  module.exports = router;



