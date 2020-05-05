const db = require('./models/database');

sql = 'UPDATE user SET access_token = ? WHERE id = ?';
db.query(sql, ['nmp', 3], (err, response) => {
  if (err) throw err;
  console.log(response);
});





