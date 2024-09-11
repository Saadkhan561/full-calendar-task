const CalendarEvents = require('../models/calendarModel')

export const getEvents = async (req, res) => {
    try {
        const events = await CalendarEvents.find({})
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const postEvent = async (req, res) => {
    const { title, date } = req.body
    try {
        const event = await CalendarEvents.create({ title, date })
        res.json(200).json(event)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}