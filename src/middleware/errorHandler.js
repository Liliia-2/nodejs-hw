// import { HttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   if (err instanceof HttpError) {
//     res.status(err.status).json({
//       message: err.message,
//     });
//     return;
//   }

//   res.status(500).json({
//     message: 'Something went wrong',
//   });
// };



import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.error('❌', err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: err.message || 'Something went wrong',
  });
};



// import createHttpError, { isHttpError } from 'http-errors';

// export const errorHandler = (err, req, res, next) => {
//   console.error('❌', err);

//   if (isHttpError(err)) {
//     return res.status(err.status).json({
//       message: err.message,
//     });
//   }

//   return res.status(500).json({
//     message: err.message || 'Something went wrong',
//   });
// };



// export const errorHandler = (err, req, res, next) => {
//   console.error(err);

//   return res.status(err.status || 500).json({
//     message: err.message,
//     stack: err.stack,
//   });
// };
