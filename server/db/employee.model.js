// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: String,
  author: String,
});

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  present: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FavoriteBrand",
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FavoriteColor",
  },
  salary: Number,
  created: {
    type: Date,
    default: Date.now,
  },
  readBooks: [BookSchema]
});

module.exports = mongoose.model("Employee", EmployeeSchema);
