const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fullSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    game: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
    category: { type: String },
    splits: [{ 
        fighter: [{ type: Schema.Types.ObjectId, ref: 'Fighter' }],
        PB:{ 
            KD1: { type: Number},
            KD2: { type: Number},
            Time: { type: Number},
        },
        gold:{ 
            KD1: { type: Number},
            KD2: { type: Number},
            Time: { type: Number},
        }
    }] 
});

const Full = mongoose.model("Full", fullSchema);

module.exports = Full;