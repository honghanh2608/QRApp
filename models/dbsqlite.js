const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Connected to the chinook database.');
});

exports.query = function(sql, params, cb) {
    db.serialize(function () {
        db.all(sql, params, cb);
    })
};

exports.run = function (sql, params, cb) {
    db.serialize(function () {
        console.log('sql', sql);
        db.run(sql, params, function () {
            cb(this)
        });
    })
};
