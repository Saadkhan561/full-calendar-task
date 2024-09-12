import express from 'express';
import { deleteEvent, getEvents, postEvent, updateEvent } from '../controller/calendarController.js'; 
const router = express.Router();

router.get('/getEvents', getEvents);
router.post('/postEvent', postEvent);
router.put('/updateEvent', updateEvent)
router.delete('/deleteEvent', deleteEvent)

export default router;