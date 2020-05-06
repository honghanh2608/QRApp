// const db = require('./models/database');
//
// sql = 'UPDATE user SET access_token = ? WHERE id = ?';
// db.query(sql, ['nmp', 3], (err, response) => {
//   if (err) throw err;
//   console.log(response);
// });
//
//
//
//
//

const jwt = require('jsonwebtoken');
let payload = {
    email: '123@gmail.com',
    id: 3,
    exp: 1588697030
};
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpZCI6MywiZXhwIjoxNTg4Njk3MDMwLCJpYXQiOjE1ODg2OTM0MzB9.Jf9yxRU0OVID3Odr2tXbzCz84LgduLQXL3n8Y_9kjT";
let token = jwt.sign(payload, 'vietnam');
console.log(token);
const decoded = jwt.verify(token, 'vietnam');
console.log(decoded);
