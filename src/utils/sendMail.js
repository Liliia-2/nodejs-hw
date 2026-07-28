import dotenv from 'dotenv';

dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...options,
  });
};



// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// console.log('Transport options:', transporter.options);

// export const sendEmail = async (options) => {
//   await transporter.verify();
//   console.log('SMTP connection successful');

//   return transporter.sendMail({
//     from: process.env.SMTP_FROM,
//     ...options,
//   });
// };
