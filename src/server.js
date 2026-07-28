import dns from 'node:dns';

dns.setServers(['8.8.8.8']);

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

// console.log(process.env.MONGO_URL);

// console.log('SMTP_HOST =', process.env.SMTP_HOST);
// console.log('SMTP_PORT =', process.env.SMTP_PORT);
// console.log('SMTP_USER =', process.env.SMTP_USER);

// import { sendEmail } from './utils/sendMail.js';



const app = express();
console.log('SERVER.JS LOADED');

const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
  });
});

// console.log('AUTH ROUTES CONNECTED');

app.use(authRoutes);

app.use(notesRoutes);

app.use(userRoutes);


app.use(errors());

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = async () => {
  await connectMongoDB();


// await sendEmail({
//     to: 'plv-86@ukr.net',
//     subject: 'Test',
//     html: '<h1>Brevo works!</h1>',
//   });



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
