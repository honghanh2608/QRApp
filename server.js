const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const product = require('./products/product.route');
const user = require('./users/user.route');
const authRouter = require('./auth/auth.route');
const staffRouter = require('./staffs/staff.route');
const orderRouter = require('./orders/order.route');
const productRouter = require('./products/product.route');
const key = 'vietnam';
const indexRouter = require('./index/index.route');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('./public'));
app.use('/static', express.static('static'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function (req, res) {
    res.render('index', {
        title: 'Title'
    })
});

app.use(function (req, res, next) {
    if (req.url.indexOf('/admin') === -1) {//không có admin
        next();
    } else {
        next();
    }
});

//

console.log('port', process.env.port);
app.use('/view/', indexRouter);
app.use('/api/v1', product);
app.use('/v1/auth', authRouter);
app.use('/v1/staff', staffRouter);
app.use('/v1/user', user);
app.use('/v1/order', orderRouter);
app.use('/v1/product', productRouter);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(500);
    res.render('error');
});


app.listen(process.env.PORT || 3000);
