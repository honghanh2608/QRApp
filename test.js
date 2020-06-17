const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});
// db.each('SELECT * FROM category', (err, row) => {
//     console.log(row)
// });



db.serialize(function () {
    db.run('INSERT INTO category(name) VALUES ("Đồ hộp")', [], function(err, row) {
        console.log(err);
        console.log(row);
        console.log(this);
    });
});

