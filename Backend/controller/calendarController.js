import calendarEvents from '../models/calendarModel.js';

export const getEvents = async (req, res) => {
    try {
        const events = await calendarEvents.find({});
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const postEvent = async (req, res) => {
    const { title, start, end } = req.body;
    try {
        const event = await calendarEvents.create({
            title,
            start,
            end
        });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateEvent = async (req, res) => {
    console.log(req.body)
    const { id, newStart, newEnd } = req.body;
    try {
        const event = await calendarEvents.updateOne(
            { _id: id },
            {
                start: new Date(newStart),
                end: new Date(newEnd)
            }
        );
        res.status(200).json({ message: "Event updated!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.query;
    try {
        await calendarEvents.deleteOne({ _id: id });
        res.status(200).json({ message: "Event deleted!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
