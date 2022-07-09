const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create Schema
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

module.exports = Order = mongoose.model("orders", OrderSchema);
