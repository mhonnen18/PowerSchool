
const mongoose = require('mongoose');
const users = require('./user.js')
const plm = require('passport-local-mongoose')

const courses = mongoose.Schema({
  className: String,
  periodNumber: Number,
  classTeacher: String,
  semesterOneGrade: String,
  semesterTwoGrade: String,
  unexcusedTardies: Number,
  tardies: Number,
  gradeDetails: Array,

});

courses.plugin(plm);

module.exports= mongoose.model('courses', courses);
