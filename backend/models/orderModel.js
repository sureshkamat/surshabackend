const mongoose = require("mongoose");
// "order validation failed: orderItems.0.product: Path `product` is required., orderItems.0.quantity: Path `quantity` is required., orderItems.1.product: Path `product` is required., orderItems.1.quantity: Path `quantity` is required."
const OrderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: Number, required: true },
  },
  orderItems: [
    {
      name: { type: String, required: true },
      //   category: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      //   stock: { type: Number, required: true },
      image: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
  },
  paidAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  itemsPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  orderStatus: { type: String, required: true, default: "Processing" },
  deliveredAt:Date,
  createdAt: { type: Date, default: Date.now() },
  
});

module.exports = mongoose.model("order", OrderSchema);
