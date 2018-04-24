const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: { type: String },
    abv: { type: String},
    year: { type: String },
    img: { type: String },
    categories: [{ type: String }],

});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;