const express=require("express");
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1753982324741-839128d837ad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  },
  price: {
    type: Number,
    required: true
  },
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
