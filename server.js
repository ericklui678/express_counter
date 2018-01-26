const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/views/`));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Session requires secret key
app.use(session({ secret: 'this-is-a-secret-token' }));

app.get('/', (req, res) => {
  // if count exists then increment, otherwise set to 0
  req.session.count = req.session.count + 1 || 0;
  // res.locals creates variable count accessible in ejs
  res.locals.count = req.session.count;
  res.render('index');
});

app.post('/update', (req, res) => {
  if (req.body.plusTwo) req.session.count++;
  else req.session.count = -1;
  res.locals.count = req.session.count;
  res.redirect('/');
})

app.listen(port, () => {
  console.log('listening on port 8000');
});
