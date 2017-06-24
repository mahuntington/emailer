const express = require('express');
const app = express();
var Mailgun = require('mailgun-js');

app.get('/', function(req, res){
    var mailgun = new Mailgun({apiKey: process.env.MAILGUNAPIKEY, domain: process.env.MAILGUNDOMAIN});

    var data = {
        //Specify email data
        from: 'matt.huntington@gmail.com',
        //The email to contact
        to: 'matt.huntington@gmail.com',
        //Subject and text data
        subject: 'Hello from Mailgun',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
    }

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.send('submitted');
            console.log(body);
        }
    });
});

app.listen(process.env.PORT, function(){
    console.log('listening');
});
