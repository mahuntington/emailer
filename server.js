const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('works');
});

app.listen(process.env.PORT, function(){
    console.log('listening');
});
