const session = require('express-session');
const EXTREMESENSITVITY = require('../EXTREMESENSITVITY.json');

const ownerSessionMiddleware = session({
  secret: EXTREMESENSITVITY.Server.ownerSecret, // This secret is for OWNER access with no expiration
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 0 // No expiration
  }
});

const adminSessionMiddleware = session({
  secret: EXTREMESENSITVITY.Server.adminSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 12 * 60 * 60 * 1000 // 12 hours
  }
});

const sessionMiddleware = session({
  secret: '1234567890',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
  }
});

module.exports = {
  sessionMiddleware,
  adminSessionMiddleware,
  ownerSessionMiddleware
};
