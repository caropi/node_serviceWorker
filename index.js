const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey =
  "BPsVJMmM5EIpqEJ395ihO8oyg0mEqwlTu1qRWleaq03ddkOUU18KPqWkuLa-UVcVIikK-g5eTrSirayHL7qOHzk";

const privateVapidKey = "d1JcEIvgwD7avau92-4UyqQA_J26M-tUgIqdYjdj57A";

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// Subscribe route (responsible for sending notification to service worker)
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // send 201 status to say resource was created successfully
    res.status(201).json({});

    // create payload 
    const payload = JSON.stringify({ title: 'Push Test' });

    // Pass object into sendNotification (this is synchronous)
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))