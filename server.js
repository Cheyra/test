require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");
var path = require("path");





var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 3000;

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
//Routes
//var authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
//require('./config/passport.js')(passport);

//serialize
// passport.serializeUser(function(user, done) {
//   done(null, user.id);

// });

// deserialize user
// passport.deserializeUser(function(id, done) {
//   User.findById(id).then(function(user) {

//       if (user) {

//           done(null, user.get());

//       } else {

//           done(user.errors, null);

//       }

//   });

// });

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function(err) {
    if (!err) {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    }
    {
      console.log(err);
    }
  });
});

module.exports = app;
