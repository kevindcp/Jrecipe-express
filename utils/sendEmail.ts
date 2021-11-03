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
