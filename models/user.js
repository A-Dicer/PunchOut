const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const passLocalMon = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new Schema({
  twitchId: { type: String },
  userName: { type: String },
  imgLink: { type: String },
  email: { type: String },
  splits: { 
     mtpo:  [{ type: Schema.Types.ObjectId, ref: 'Splits' }],
      spo:  [{ type: Schema.Types.ObjectId, ref: 'Splits' }], 
    powii:  [{ type: Schema.Types.ObjectId, ref: 'Splits' }] 
  },
  options: { 
    gameInfo: { type: Boolean, default: true},
    fightInfo: { type: Boolean, default: false},
    individualInfo: { type: Boolean, default: true},
    splitTimes: { type: Boolean, default: true},
  }
});

userSchema.plugin(passLocalMon);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

module.exports = User;
