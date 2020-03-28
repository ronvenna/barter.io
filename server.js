const express = require('express');
const path = require('path');
const passport = require('passport');
const auth = require('./googleAuth');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
auth(passport);
app.use(passport.initialize());

app.use(cookieSession({
  name: 'session',
  keys: ['testKey']
}));
app.use(cookieParser());

// Authentication Call
app.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

// Authntication Call back which is configured on google console
app.get('/auth/google/callback',
passport.authenticate('google', {
    failureRedirect: '/error'
}),
(req, res) => {
    req.session.token = req.user.token;
    res.redirect('/');
}
);

// Redirect to landing page after authentication
app.get('/', (req, res) => {
  if (req.session.token) {
    console.log(JSON.stringify(req.session.passport.user.profile.displayName));
    res.cookie('token', req.session.token);
    app.use(express.static(path.join(__dirname, '/build')));
    res.sendFile(path.join(__dirname + '/build/index.html'));
} else {
    res.cookie('token', '')
    res.json({
        status: 'session cookie not set'
    });
}
});

// get all items
app.get('/api/v1/items', (req, res) => {
  res.json({ hello: "world "});
});

// Post an item
app.get('/api/v1/items', (req, res) => {
  res.json({ hello: "world "});
});

// logout call TO-DO
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`listening on ${port}`);
