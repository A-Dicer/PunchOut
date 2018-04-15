const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fightersSchema = new Schema({
    fighter: { type: String},
    circuit: { type: String},
    img: { type: String},
    WR: { 
        KD1: { type: Number},
        KD2: { type: Number},
        time: { type: Number},
     }
});

const Fighters = mongoose.model("Fighters", fightersSchema);

module.exports = Fighters;