const express = require('express');
const app = express();
const Mailgun = require('mailgun-js');
const mailgun = new Mailgun({apiKey: process.env.MAILGUNAPIKEY, domain: process.env.MAILGUNDOMAIN});
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function(req, res){

    console.log(req.body);

    mailgun.messages().send(req.body, function (err, body) {
        if (err) {
            res.json({
                status: 500,
                error : err
            });
            console.log("got an error: ", err);
        }
        else {
            res.json({
                status:200,
                body: body
            });
            console.log(body);
        }
    });
});

app.listen(process.env.PORT, function(){
    console.log('listening');
});
