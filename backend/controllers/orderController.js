const Order = require("../models/orderModel");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

//Create new Order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,

  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get single order;
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order)
    return next(new ErrorHandler("Order not found with this Id", 404));
  
  res.status(200).send({ success: true, order });
});

//// get logged in user order;        ///not working this

exports.myOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user:req.user._id});
  
    
    res.status(200).json({ success: true, orders });
  });


// get all orders Admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = orders.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  
    res.status(200).json({ success: true, orders, totalAmount })
  })


  // get update orders status
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) return next(new ErrorHandler("Order not found", 404));
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400))
    }
  
     if(req.body.status==='Shipped'){
      order.orderItems.forEach(async (order) => (await updateStock(order.product, order.quantity)));
     }
  
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now()
    }
  
    await order.save({ validateBeforeSave: false })
  
    res.status(200).send({ success: true, order })
  })

// updating stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.stock -= quantity;
  
    await product.save({ validateBeforeSave: false })
  }


  //// delete order
exports.delOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) return next(new ErrorHandler("Order not found", 404));
  
    await order.deleteOne({ _id: req.params.id});
  
    res.status(200).send({ success: true, msg: "Order deleted successfully" })
  })
