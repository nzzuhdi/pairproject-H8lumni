const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes');


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));
app.use('/', router);
app.listen(port, () => {
  console.log(`Your app is now running and listening on localhost:${port}.`);
});