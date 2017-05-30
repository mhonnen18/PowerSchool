
const mongoose = require('mongoose');
//const app = express();
const plm = require('passport-local-mongoose')

const User = mongoose.Schema({
  name: String,
  UserName: String,
  password: String,
  courses: Array,
  GPA: Number,
});

User.plugin(plm);

module.exports= mongoose.model('User', User);
