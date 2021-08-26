const { google } = require('googleapis');
const { OAuth2 } = google.auth
const oAuth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

class CalenderController {
    static create(req, res, next) {
        const { summary, description, startEvent, endEvent } = req.body
        const calender = google.calendar({ version: 'v3', auth: oAuth2Client })
        const event = {
            summary,
            description,
            start: {
                dateTime: new Date(startEvent),
                timeZone: 'Asia/Jakarta',
            },
            end: {
                dateTime: new Date(endEvent),
                timeZone: 'Asia/Jakarta',
            },
        };
        calender.events.insert({
            auth: oAuth2Client,
            calendarId: 'primary',
            resource: event,
        }, function (err, event) {
            if (err) {
                res.status(500).json({ message: 'There was an error contacting the Calendar service: ' + err })
            } else {
                res.status(201).json({ message: 'Event created' })
            }
        });
    }
}

module.exports = CalenderController