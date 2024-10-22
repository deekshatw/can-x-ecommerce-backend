const mongoose = require("mongoose");
const { interest } = require("payu-websdk/wrapper/emi");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderType: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: false
  },
  long: {
    type: Number,
    required: false
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
      cashDiscount: {
        type: Number,
      },
      interest: {
        type: Number,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      dueAmount: {
        type: Number,
        default: 0,
      }
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  amountRmaining: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: [
      "orderReceived",
      "inProgress",
      "qualityCheck",
      "outForDelivery",
      "orderDelivered",
    ],
    default: "orderReceived",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    default: null,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
