const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      required: true,
    },
    guest: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    firstName: String,
    lastName: String,
    products: [
      {
        type: Schema.Types.Mixed,
        required: true,
      },
    ],
    address: {
      type: Schema.Types.Mixed,
    },

    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentInfo: {
      type: Schema.Types.Mixed,
      default: {},
    },
    totalSum: {
      type: Number,
      required: true,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = Order = mongoose.model("orders", OrderSchema);
