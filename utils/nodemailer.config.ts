
import nodemailer from "nodemailer"

const nodemailerConfig =  {
    host: process.env.EMAIL_HOST as string,
    port: parseInt(process.env.EMAIL_PORT as string),
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
}

export const transporter = nodemailer.createTransport(nodemailerConfig)