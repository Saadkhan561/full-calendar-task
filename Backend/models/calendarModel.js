const mongoose =require('mongoose')

const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("calendar-events", calendarSchema)