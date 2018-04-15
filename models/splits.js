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
    splits: [{ 
        _id: false,
        fighter: [{ type: Schema.Types.ObjectId, ref: 'Fighters' }],
        pb:{ 
            KD1: { type: Number},
            KD2: { type: Number},
            time: { type: Number},
        },
        gold:{ 
            KD1: { type: Number},
            KD2: { type: Number},
            time: { type: Number},
        }
    }] 
});

const Splits = mongoose.model("Splits", splitsSchema);

module.exports = Splits;