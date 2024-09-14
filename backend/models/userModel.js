const db = require('../config/db');

const createUser = (userData, callback) => {
    const sql = `INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, userData, callback);
};

const verifyUserEmail = (email, callback) => {
    const sql = `UPDATE users SET is_verified = true WHERE email = ?`;
    db.query(sql, [email], callback);
};

const findUserByEmail = (email, role, callback) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email, role], callback);
};

module.exports = {
    createUser,
    verifyUserEmail,
    findUserByEmail
};
