const express = require('express');
const app = express();
const Mailgun = require('mailgun-js');
const mailgun = new Mailgun({apiKey: process.env.MAILGUNAPIKEY, domain: process.env.MAILGUNDOMAIN});
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(req, res){

    var data = {
        //Specify email data
        from: 'matt.huntington@gmail.com',
        //The email to contact
        to: 'matt.huntington@gmail.com',
        //Subject and text data
        subject: 'Hello from Mailgun',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    console.log(req.body);

    mailgun.messages().send(req.body, function (err, body) {
        if (err) {
            res.json({ error : err});
            console.log("got an error: ", err);
        }
        else {
            res.json({
                success:200
            });
            console.log(body);
        }
    });
});

app.listen(process.env.PORT, function(){
    console.log('listening');
});
