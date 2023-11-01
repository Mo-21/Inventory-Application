const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  description: {
    type: String,
    maxLength: 100,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: String,
    required: true,
    maxLength: 4,
    minLength: 2,
  },
  in_stock: {
    type: Number,
    required: true,
    max: 10000,
    min: 0,
  },
});

//Item URL
ItemSchema.virtual("url").get(function () {
  return `/catalog/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
