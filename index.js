const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'thisIsImportant';
const auth0 = require('auth0');
const passport = require('passport');
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const port = process.env.PORT || 3000

const courses = require('./courses.js');
const gradeDetails = require('./gradeDetails.js');
const User = require('./user.js');
const app = express();

mongoose.connect('mongodb://localhost/powerschool');

app.listen(port, function (err) {
  if (err) {
    throw err
  }
});

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(passport.initialize())
app.use(passport.session())


app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.send("How did I get here?");
})

app.get('/:user-id', function(req, res) {
  if (req.user.authenticated()){
    User.findById(id, function(err, user){
      if (err) throw err
      if (user==null){
        res.redirect('/')
      }
      console.log("homePage");
      //display Page
      res.render('user.html', {user: user})
    })
  }
})

app.get('/:user-id/:courses', function(req, res){
  if(req.user.authenticated()){
    User.findById(id, function(err, user){
      if (err) throw error
      if (user==null){
        res.redirect('/')
      }
      if(user.courses.contains(id)){
        console.log("courses");
        res.render('courses.html', {courses: courses})
      }
    })
  }
})

app.get('/:user-id/:courses/:gradeDetails', function(req, res){
  if(req.user.authenticated()){
    User.findById(id, function(err, user){
      if (err) throw error
      if (user==null){
        res.redirect('/')
      }
      if(user.courses.gradeDetails.contains(id)){
        console.log("gradeDetails");
        res.render('gradeDetails.html', {gradeDetails: gradeDetails})
      }
    })
  }
})

//-------------------------------------------

app.post("/newGradeDetail",function(req,res){
	gradeDetails.create({
    dueDate: req.body.dueDate, //or an object not sure how that may or may not work
    category: req.body.category,
    assignmentName: req.body.assignmentName,
    earnedPoints: req.body.earnedPoints,
    possiblePoints: req.body.possiblePoints,
    /*grade: req.body.grade*/

  },function(err,gradeDetails){
		if(err){
			throw(err);
		}
		return gradeDetails;
	});
});

app.post("/courses",function(req,res){
	courses.create({
    className: req.body.className,
    periodNumber: req.body.periodNumber,
    classTeacher: req.body.classTeacher,
    semesterOneGrade: req.body.semesterOneGrade,
    semesterTwoGrade: req.body.semesterTwoGrade,
    unexcusedTardies: req.body.unexcusedTardies,
    tardies: req.body.tardies,
    gradeDetails: []

  },function(err, courses){
		if(err){
			throw(err);
		}
		return courses;
	});
});

app.post("/newUser",function(req,res){
	User.create({
    name: req.body.name,
    UserName: req.body.UserName,
    password: req.body.password,
    courses: [],
    GPA: req.body.GPA

	},function(err,user){
		if(err)
		{
			throw(err);
		}
		res.redirect("/");
	});
});



//---------------------------------------------//---------------------------------------------

var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};


app.get('/courses',  passport.authenticationMiddleware(), function(req, res) {
  var username = req.params.name;
  res.render('courses', { user: req.user });
});

app.get('/courses/:name/gradeDetails',  function(req, res){
    var courseName = req.params.name;
    res.render('gradeDetails', { title: 'Express', env: env });   //looks for var in template
  });


  function renderCourses (req, res) {
    res.render('user/welcome')
  }

  function signinDb() {
        auth0.redirect.loginWithCredentials({
          connection: 'Username-Password-Authentication',
          username: document.getElementById('tempUser').value,
          password: document.getElementById('tempPass').value,
          responseType: 'code'
        });
      }
