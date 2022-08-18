// const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');

const studentStruc = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  coursename: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email id already present plz try other'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 10,
      max: 10,
    },
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// we are creating a new collection

const Studentds = new mongoose.model('Studentds', studentStruc);
module.exports = Studentds;
