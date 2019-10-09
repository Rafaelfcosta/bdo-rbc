const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 8888;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});