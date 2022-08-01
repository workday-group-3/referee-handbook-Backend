const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")



class EmailService {
    constructor(config) {
        // initialize
        const { isActive, apiKey } = config

        const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey}))



        this.transport = transport
        this.isActive = isActive
    }



    async sendEmail(email) {
        try {
            const res = await this.transport.sendMail(email)
            const status = res?.[0]?.statusCode
            if (status === 202) return { status, email, error: null}

            return { status, email, error: res?.[0]?.body }

        } catch (error) {
            console.error(`Errors with email occured: ${String(error)}`)
            
            const errors = err?.response?.body?.errors

            return { status: 400, email, error: errors || [err] }
        }
    }
}



module.exports = EmailService