const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create OrderSchema using mongoose schema
const OrderSchema = new Schema({
  orderName: {
    type: String,
    required: true,
  },
  orderID: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderStatus:
  {
    type:String,
    required:true
  }
});
//Set and export the schema in mongoose model
module.exports = Order = mongoose.model("Order", OrderSchema);
