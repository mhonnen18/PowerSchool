
const mongoose = require('mongoose');

const plm = require('passport-local-mongoose')

const Card = mongoose.Schema({
  title: String,
  positionX = Number,
  positionY = Number,
  Color = String,
  Message = String,
  Quote = String,
  Source = String,
  Cdor = String,
  PageNumber = Number,
  Paraphrase = String,
});

User.plugin(plm);

module.exports= mongoose.model('Card', Card);
