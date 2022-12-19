const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
    {
      products: String,
      order_number:Number,
      amount: { type: Number },
      address: Object,
      status: {
        type: String,
        default: "Not processed",
        enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
      },
      updated: Date,
      customer: String,
      color :String,
      size:String,
      email :String,
      phone:String
    },
    { timestamps: true }
  );
  
  const Order = mongoose.model("Order", OrderSchema);