const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const splitsSchema = new Schema({
    user: { type: String },
    date: { type: Date, default: Date.now },
    game: {
        title: { type: String },
        id: { type: Schema.Types.ObjectId, ref: 'Game' },
    },
    category: { type: String },
    time: { type: String },
    fighters: [{ type: Schema.Types.ObjectId, ref: 'Fighters' }],
    pb:[{ KD1: { type: String}, KD2: { type: String}, time: { type: String}}],
    gold:[{ KD1: { type: String}, KD2: { type: String}, time: { type: String}}] 
});

const Splits = mongoose.model("Splits", splitsSchema);

module.exports = Splits;