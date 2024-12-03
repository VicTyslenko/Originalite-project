const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "customers",
      required: true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products"
        },
        cartQuantity: {
          type: Number
        },
        size: {
          type: String
        },
        color: {
          type: String
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    }
  },
  { strict: true }
);

module.exports = Cart = mongoose.model("cart", CartSchema, "cart");
