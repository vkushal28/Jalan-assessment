var express = require('express');
require('./utils/connection');
const dotenv = require('dotenv');
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

const ticketRoutes = require('./routes/ticketRoutes');

var cors = require('cors')
var app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/ticket', ticketRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log("Error")
    res.send(404)
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// app.listen(3004);
module.exports = app;