import mongoose from "mongoose"

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
const calendarEvents = mongoose.model("calendar-events", calendarSchema)
export default calendarEvents