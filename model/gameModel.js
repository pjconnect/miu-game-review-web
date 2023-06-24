const mongoose = require('mongoose');
const gameDetails = mongoose.Schema({

})
const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    platform: {
        type: [String],
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    pictureURL: String,
    description: { type: String },
    year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    price: {
        type: Number,
        default: 0,
    }
});


mongoose.model("Game", gameSchema, "games");
