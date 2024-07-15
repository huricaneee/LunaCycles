const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Date: {
        type: Date,
        required: true
    },
    emoji: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Mood', MoodSchema);