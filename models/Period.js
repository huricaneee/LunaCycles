const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeriodSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Period', PeriodSchema);