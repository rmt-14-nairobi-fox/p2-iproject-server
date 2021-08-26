const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const client_id = process.env.GMAIL_CLIENT_ID
const client_secret = process.env.GMAIL_CLIENT_SECRET
const redirect_uri = process.env.GMAIL_REDIRECT_URI
const refresh_token = process.env.GMAIL_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri)
oAuth2Client.setCredentials({ refresh_token })

const sendMail = async (petition) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'rizal.hacktiv@gmail.com',
                clientId: client_id,
                clientSecret: client_secret,
                refreshToken: refresh_token,
                accessToken
            }
        })

        const mailOptions = {
            from: 'Developer h8-pet-poll <rizal.hacktiv@gmail.com>',
            to: petition.email,
            subject: 'Your petition has meet the sign target',
            text: `Congratulations, your petition '${petition.title}' Has meet its target`,
            html: `<h1>Congratulations, your petition '${petition.title}' Has meet its target</h1>`
        }

        const result = transport.sendMail(mailOptions)

        return result
    } catch (err) {
        return err
    }
}

module.exports = {
    sendMail
}