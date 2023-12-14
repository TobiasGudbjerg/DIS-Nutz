const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('.src/db/db.sqlite', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run(`ALTER TABLE users ADD COLUMN telefon VARCHAR`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Column "telefon" added to example_table.');
            }
        });
        console.log('Connected to the db.sqlite database.');
    }
});

