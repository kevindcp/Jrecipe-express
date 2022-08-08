import { transporter } from "./nodemailer.config"
import { welcomeEmailData, confirmationEmailData } from "./types"
export const sendWelcomeEmail = async(content : welcomeEmailData ) => {
  await transporter.sendMail({
    to: content.email,
    subject: 'Welcome to Jrecipe',
    html: `<h4> Hello, ${content.username}</h4>
    Welcome to Jrecipe
    `,
  })
}

export const sendConfirmationEmail = async (content : confirmationEmailData) => {
  await transporter.sendMail({
    to: content.email,
    subject: 'Password recovery',
    html: `<h4> Hello, ${content.username}</h4>
    This is your password recovery code ${content.recoveryToken}
    <br>
    <br>
    The code is valid for 30 minutes.
    `,
  })
}
