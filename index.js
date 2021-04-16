//Import the express module
const express = require('express');

//Import the path module
const path = require('path');

//Declare a variable to use Express
const app = express();

//Import body parser to read json body request. 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Use Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'css')));

//Declare a variable to hold your port and run your server. 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Import Articles model. 
const articles = require('./models/Articles');

//Import assert to get MaxId in array. 
const assert = require("assert");







/*===================
     Page Routes
====================*/
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.get('/ex1', (req, res) => {  
    res.sendFile(`${__dirname}/views/ex1.html`);
});

app.get('/ex2', (req, res) => {
    res.sendFile(`${__dirname}/views/ex2.html`);
});

app.get('/ex3', (req, res) => {
    res.sendFile(`${__dirname}/views/ex3.html`);
});




/*===================
     HTTP Requests
====================*/
app.get('/getdata', (req, res) => {  
    let data = {
            name : 'David',
            email: 'david@email.com',
            payType: 'GooglePay',
            promotion: 'checked',
            location: 'OC'
    }
    res.json(data);
});


app.post('/postdata', (req, resp) => {
    const name = req.body.name;
    const email = req.body.email;
    resp.send(`Hello ${name}, Thank you for your order. We will keep you posted on delivery status at: ${email}`);
});


app.post('/api/countries', (req, resp) => {
    const name = req.body.name;
    const count = req.body.countries.length;
    resp.send(`Your name is ${name}, and you have visited ${count} countries.`);
});


app.post('/api/articles', (req, resp) => {
    const title = req.body.title;
    const content = req.body.content;
    const max = Math.max.apply(null, articles.map(item => item.id)) + 1;
    articles.push({"id":max, "title":title, "content":content})
    resp.send(`New article has been added successfully with the title "${title}", and the id of ${max}.`);
});


