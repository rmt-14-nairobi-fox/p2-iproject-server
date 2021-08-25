const { google } = require('googleapis');
const { OAuth2 } = google.auth

class CalenderController {
    static create(req, res, next) {
        const { summary, description } = req.body
        const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
        const calender = google.calendar({ version: 'v3', auth: oAuth2Client })
        const startEvent = new Date()
        startEvent.setDate(startEvent.getDay() + 2)
        const endEvent = new Date()
        endEvent.setDate(endEvent.getDay() + 2)
        endEvent.setMinutes(endEvent.getMinutes() + 45)

        const event = {
            summary,
            description,
            start: {
                dateTime: startEvent,
                timeZone: 'Asia/Jakarta'
            },
            end: {
                dateTime: endEvent,
                timeZone: 'Asia/Jakarta'
            },
            colorId: 1,
        }


        calender.freebusy.query({
            resource: {
                timeMin: startEvent,
                timeMax: endEvent,
                timeZone: 'Asia/Jakarta',
                items: [{ id: 'primary' }]
            }
        }, (error, response) => {

            console.log(response)
            if (error) {
                res.status(500).json({ message: `Free Busy Query Error :`, error })
            } else {
                const eventArr = response.data.calendars.primary.busy
                if (eventArr.length === 0) {
                    calender.events.insert({
                        calendarId: 'primary',
                        resource: event
                    }, er => {
                        if (er) {
                            res.status(400).json({ message: 'Calender event creation error: ', err })
                        } else {
                            res.status(201).json({ message: 'Success created event' })
                        }
                    })
                }
            }
        })
    }
}

module.exports = CalenderController