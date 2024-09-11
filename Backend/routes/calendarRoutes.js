const express = require('express')
const { getEvents, postEvent } = require('../controller/calendarController')

const router = express.Router()

router.get('/getEvents', getEvents)
router.post('/postEvent', postEvent)

module.exports = router