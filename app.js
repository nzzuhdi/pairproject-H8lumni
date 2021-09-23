const express = require('express');
const app = express();
const port = 3005;
const router = require('./routes');


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/', router);
app.listen(port, () => {
  console.log(`Your app is now running and listening on localhost:${port}.`);
});