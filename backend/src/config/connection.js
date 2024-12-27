import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamboo_db',
});

const dbPromise = db.promise();

export { dbPromise, db };
