const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

//use template engine
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentyear',  () => {
  return new Date().getFullYear();
});

const myLogger = function (req, res, next) {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '/n', (err) => {
    if (err) console.log('Unabled to append to server.log');
  });
  next();
};

app.use(myLogger);

// maintainence middleware, turn on if needed
// app.use((req, res) => {
//   res.render('maintainence.hbs');
// })

//static file serve
app.use(express.static(__dirname + '/public')); // public static directory app.use

app.get('/json', (req, res) => { // res.send text or json example
  res.send({
    'value1': 1,
    'value2' : 2
  })
});

app.get('/', (req, res) => {
  res.render('home.hbs');
});

app.get('/about', (req, res) => {
  res.render('about.hbs');
});

app.listen(3000, () => {
  console.log('Server is up now');
});
