const express = require('express');
const path = require('path');
const passport = require('passport');
const auth = require('./googleAuth');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const db = require('./db');
const sha1 = require('js-sha1');
const bodyParser = require('body-parser');
const fs = require('fs');
auth(passport);
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    // console.log(JSON.stringify(req.session.passport.user.profile, null, 2));
     console.log(JSON.stringify(req.session.passport.user.profile.displayName));
    res.cookie('token', req.session.token);
    res.sendFile(path.join(__dirname + '/build/index.html'));
} else {
    res.cookie('token', '');
    res.redirect('/landing/index.html');
}
});

app.use(express.static(path.join(__dirname, '/build')));


//customerinfo table API's
// Check If user exists with email input email -> output customer details
app.get('/api/v1/user', (req, res) => {
    const items = require('./models/customerinfo');
    var email = req.query.email;
    items.getCustomerDeatailsByEmail(email,function (err, items) {
        if (err)
            res.send(err);
        items[0].customerpicturelocation = Buffer.from(items[0].customerpicturelocation, 'base64').toString('ascii');;
        res.send(items);
    });
});

// create new customer 
app.post('/api/v1/user', (req, res) => {
    const items = require('./models/customerinfo');
    var record={
        customerid: sha1(req.body[0].email),
        email: req.body[0].email,
        phone_number: req.body[0].phone_number,
        address:req.body[0].address,
        address_lat: req.body[0].address_lat,
        address_long:req.body[0].address_long,
        zipcode:req.body[0].zipcode,
        customerpicturelocation:req.body[0].customerpicturelocation
        }
    items.createCustomer(record,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});
// Update Customer image 
app.post('/api/v1/userimage', (req, res) => {
    const items = require('./models/customerinfo');
     var customerid = req.body[0].customerid;
        var customerpicturelocation = req.body[0].customerpicturelocation;
    items.updateCustomerPictureById(customerid,customerpicturelocation,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});
// Update Customer Email by ID
app.post('/api/v1/usermail', (req, res) => {
    const items = require('./models/customerinfo');
     var customerid = req.body[0].customerid;
        var email = req.body[0].email;
    items.updateCustomerPictureById(email,customerid,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});
// Update Customer Address 
app.post('/api/v1/useraddress', (req, res) => {
    const items = require('./models/customerinfo');
    var recrd = {
    customerid:req.body[0].customerid,
    address: req.body[0].address,
    lat:req.body[0].address_lat,
    long:req.body[0].address_long,
    zipcde:req.bdy[0].zipcode
    }
    items.updateCustomerPictureById(record,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});

// Availableitemsinfo table API's
// get all available items
app.get('/api/v1/availableItems', (req, res) => {
    const items = require('./models/availableItems');
    items.getAllavailableItems(function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});

// get availableitems by customerid
app.get('/api/v1/availableitemsbycustomerid', (req, res) => {
    var customerid = req.query.customerid;
    const items = require('./models/availableItems');
    items.getAvailableItemsByCustomer(customerid,function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});
// get availableitems by itemid
app.get('/api/v1/availableitemsbyitemid', (req, res) => {
    var itemid = req.query.itemid;
    const items = require('./models/availableItems');
    items.getAvailableItemsByItemId(itemid,function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});
//create available items
app.post('/api/v1/availableitemsbyid', (req, res) => {
    const items = require('./models/customerinfo');
    var recrd = {
        customerid: req.body[0].customerid,
        itemid: req.body[0].itemid,
        quantity: req.body[0].quantity,
        location_lat: req.body[0].location_lat,
        location_long: req.body[0].location_long,
        zipcode: req.body[0].zipcode
    }
    items.insertAvailableItemsById(record,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});
//update available items by customerid 
app.post('/api/v1/updateitemsbyid', (req, res) => {
    const items = require('./models/customerinfo');
    var recrd = {
        customerid: req.body[0].customerid,
        itemid: req.body[0].itemid,
        quantity: req.body[0].quantity,
        location_lat: req.body[0].location_lat,
        location_long: req.body[0].location_long,
        zipcode: req.body[0].zipcode
    }
    items.updateAvailableItemsById(record,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});


// Items Info table API's
// get all items
app.get('/api/v1/items', (req, res) => {
    const items = require('./models/itemsInfo');
    items.getAllItems(function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});

// get item deatails by itemid
app.get('/api/v1/items', (req, res) => {
    var itemid = req.query.itemid;
    const items = require('./models/itemsInfo');
    items.getItemDetailsById(itemid,function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});

// Post an item
app.post('/api/v1/items', (req, res) => {
    const items = require('./models/itemsInfo');
    var record = {
        itemid:sha1(req.body[0].itemname),
        itemname:req.body[0].itemname,
        itemtype:req.body[0].itemtype,
        itempicturelocation:req.body[0].itemspicturelocation
    }

    items.createItem(record,function (err, items) {
        if (err)
            res.send(err);
        res.send(items);
    });
});

// Update items by item Id 
app.post('/api/v1/itemsupdate', (req, res) => {
    const items = require('./models/itemsInfo');
    var recrd = {
        itemid:req.body[0].itemid,
        itemname:req.body[0].itemname,
        itemtype:req.body[0].itemtype,
        itempicturelocation:req.body[0].itemspicturelocation
    }
    items.updateItemById(record,function (err, items) {
        if (err)
            res.send(err);
        console.log('res', items);
        res.status(200).send(JSON.stringify(items));
    });
});

// logout call TO-DO
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

app.get('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`listening on ${port}`);
