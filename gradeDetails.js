
const mongoose = require('mongoose');
const users = require('./courses.js')
const plm = require('passport-local-mongoose')

const gradeDetails = mongoose.Schema({
  dueDate: String, 
  category: String,
  assignmentName: String,
  earnedPoints: Number,
  possiblePoints: Number,
  grade: String
      //Grade for each entry can be calculated below
});

gradeDetails.methods.getGrade = function(){
var grad = this.earnedPoints/this.possiblePoints;

if (grad>.96){
  this.grade ="A+"
  console.log("way to go");
}else if(grad>.9){
  this.grade = "A";
}else if (grad>.8) {
  this.grade = "B";
} else if (grad>.7) {
  this.grade ="C";
}else if (grad>.6) {
  this.grade = "D";
}else {
  this.grade = "F";
}
return this.grade;
}


function getGrade(earned, poss){
var percent = earned/poss;
  if (percent> 0.9) {
    return "A";
  } else if (percent> .8){
    return "B";
  }
}

gradeDetails.plugin(plm);

module.exports= mongoose.model('gradeDetails', gradeDetails);
