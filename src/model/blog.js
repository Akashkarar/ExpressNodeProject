const mongoose = require("mongoose");
// const schema = mongoose.Schema
const { Schema } = mongoose;

var tableStructure = new Schema(
  {
    title: { type: String },
    content: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  { timestamps: true }
);

const Blog = mongoose.model("BlogMst", tableStructure);

module.exports = Blog;
