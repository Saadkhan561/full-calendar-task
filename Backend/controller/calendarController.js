import calendarEvents from '../models/calendarModel.js'

export const getEvents = async (req, res) => {
    try {
        const events = await calendarEvents.find({})
        res.status(200).json(events)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const postEvent = async (req, res) => {
    const { title, date } = req.body
    try {
        const event = await calendarEvents.create({ title, date })
        res.status(200).json(event)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateEvent = async (req, res) => {
    const { id, newDate } = req.body
    try {
        const event = await calendarEvents.updateOne(
            { _id: id },
            { date: newDate }
        )
        res.status(200).json({message: "Event updated!"})

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteEvent = async(req, res) => {
    const {id} = req.query
    console.log(id)
    try {
        const event  = await calendarEvents.deleteOne({_id: id})
        res.status(200).json({message: "Event deleted!"})
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}