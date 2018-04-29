//----------------------------- Requirements --------------------------------------------
const express        = require("express");
const bodyParser     = require("body-parser");
const cookieParser   = require("cookie-parser");
const cookieSession  = require("cookie-session");
const passport       = require("passport");
const twitchStrategy = require("passport-twitch").Strategy;
const configAuth     = require('./config/twitchAuth.js');
const mongoose       = require("mongoose");
const socketEvents   = require('./socketEvents');  
const routes         = require("./routes");
const User           = require("./models/user");

//------------------------------- Express -----------------------------------------------
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("client/build"));

app.use(require("express-session")({secret: 'applypositivethinking', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

//------------------------------- Passport ----------------------------------------------
passport.use( new twitchStrategy({
  clientID      : configAuth.twitchAuth.clientID,
  clientSecret  : configAuth.twitchAuth.clientSecret,
  callbackURL   : configAuth.twitchAuth.callbackURL,
  scope         : configAuth.twitchAuth.scope
},
  
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      {twitchId: profile.id}, 
      {username: profile.displayName, imgLink: profile._json.logo,email: profile.email}, 
      
      function (err, user) {
        return done(err, user);
      }
    );
  }
));

passport.serializeUser(function(user, done){done(null, user)});
passport.deserializeUser(function(user, done){done(null, user)});

//------------------------------- Mongoose ----------------------------------------------
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/podb",
  { useMongoClient: true }
);

//----------------------------- Start Server --------------------------------------------
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, function(err) { 
  if (err) console.log(err); 
  else console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`); 
});

//------------------------------ Socket.io ----------------------------------------------
const io = require('socket.io').listen(server);
socketEvents(io)