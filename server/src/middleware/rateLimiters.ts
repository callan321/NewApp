import rateLimit from 'express-rate-limit';


export const registerLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5,
    message: {
      status: false,
      message: 'Too many accounts created. Try again in a minute.',
    },
  });

  export const loginLimiter = rateLimit({
    windowMs: 60 * 5000, 
    max: 5,
    message: {
      status: false,
      message: 'Too many Login attemtps. Try again later.',
    },
  });


