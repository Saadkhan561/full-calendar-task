import express from 'express';
import { getEvents, postEvent, updateEvent } from '../controller/calendarController.js'; 
const router = express.Router();

router.get('/getEvents', getEvents);
router.post('/postEvent', postEvent);
router.put('/updateEvent', updateEvent)

export default router;