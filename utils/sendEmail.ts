import nodemailer from "nodemailer"

const nodemailerConfig =  {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'cx6fgt4bv63w4nit@ethereal.email',
      pass: '43nxUmakGXzMxznrCN',
    },
};

export const transporter = nodemailer.createTransport(nodemailerConfig);


/* export const sendVerificationEmail = async ({
    name,
    email,
    validateAccountToken,
    origin,
  }) => {
    const verifyLink = `${origin}/user/verify-email?token=${validateAccountToken}&email=${email}`;
  
    const message = `<p>Please confirm your email by clicking on the following link : 
    <a href="${verifyLink}">Verify Email</a> </p>`;
    return sendEmail({
      to: email,
      subject: 'Email Confirmation',
      html: `<h4> Hello, ${name}</h4>
      ${message}
      `,
    });
  }; */