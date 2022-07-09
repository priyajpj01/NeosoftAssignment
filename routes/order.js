const express=require('express')
const router=express.Router()


// Load User model
const Order = require("../../models/Order");

router.post('/createOrder',(req,res)=>
{
    try {
        const order = await Task.findOne({ orderID:req.body.orderID })
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

router.post('/updateOrderStatus',(req,res)=>
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
    
router.get('/getOrderStatus',(req,res)=>
{
   
    Order.find({orderID: req.body.orderID})
          .then((order) => res.json(order))
          .catch((err) =>
            res.status(404).json({
              noorderfound: "No order found",
            })
          );
        
})
    

    

   





