const express        = require("express");
const bodyParser     = require("body-parser");
const cookieParser   = require("cookie-parser");
const cookieSession  = require("cookie-session");
const passport       = require("passport");
const twitchStrategy = require("passport-twitch").Strategy;
const configAuth = require('./config/twitchAuth.js');
const mongoose = require("mongoose");

socketEvents = require('./socketEvents');  

const routes = require("./routes");
const app = express();

const PORT = process.env.PORT || 3002;


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

app.use(require("express-session")({secret: 'applypositivethinking', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

const User = require("./models/user");

passport.use( new twitchStrategy({
  clientID      : configAuth.twitchAuth.clientID,
  clientSecret  : configAuth.twitchAuth.clientSecret,
  callbackURL   : configAuth.twitchAuth.callbackURL,
  scope         : configAuth.twitchAuth.scope
},
  
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {twitchId: profile.id}, 
      {userName: profile.displayName, imgLink: profile._json.logo,email: profile.email}, 
      
      function (err, user) {
        return done(err, user);
      }
    );
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/podb",
  {
    useMongoClient: true
  }
);



// Start the API server
const server = app.listen(PORT, function(err) {  
  if (err) {
    console.log(err);
  } else {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  }
});
//Start Socket.io
const io = require('socket.io').listen(server);
socketEvents(io)