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
const key = 'vietnam';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  if (req.url.indexOf('/admin') === -1) {//không có admin
    next();
  }else {
    // let accessToken = req.headers['access_token'];
    // if (!accessToken) {
    //   res.status(401).json({message: 'access token not found !'});
    // } else {
    //   let decode = jwt.verify(accessToken, key);
    //   let exp = decode.exp;
    //   if (exp < (Date.now() / 1000)) {
    //     res.status(401).json({message: 'Access token has expired !'});
    //   } else {
    //     next();
    //   }
    // }
      next();
  }
});

//
app.use('/api/v1', product);
app.use('/v1/auth', authRouter);
app.use('/v1/staff', staffRouter);
app.use('/v1/user', user);
app.use('/v1/order', orderRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000);
