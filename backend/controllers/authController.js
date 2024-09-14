const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, verifyUserEmail, findUserByEmail } = require('../models/userModel');
const { sendVerificationEmail } = require('./emailController');

const registerUser = (req, res) => {
    console.log('req: ', req.body);
    const { first_name, last_name, email, password, role } = req.body;
    if (!['admin', 'customer'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const userData = [first_name, last_name, email, hashedPassword, role];
        
        createUser(userData, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Email already exists' });
                throw err;
            }

            sendVerificationEmail(email, token);
            res.json({ message: 'User registered, please verify your email' });
        });
    });
};

const verifyEmail = (req, res) => {
    const { token } = req.params;
    console.log('token: ', token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(400).json({ message: 'Invalid or expired token' });

        verifyUserEmail(decoded.email, (err, result) => {
            if (err) throw err;
            res.json({ message: 'Email verified' });
        });
    });
};

const loginAdmin = (req, res) => {
    console.log('req: ', req.body);
    const { email, password } = req.body;

    findUserByEmail(email, 'admin', (err, result) => {
        if (err) throw err;

        if (result.length === 0) return res.status(400).json({ message: 'User with this email id does not exist' });

        const user = result[0];
        if(user.role === 'customer') return res.status(400).json({ message: 'You are not allowed to login from here' });
        if (!user.is_verified) return res.status(400).json({ message: 'Please verify your email first' });

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        });
    });
};

module.exports = { registerUser, verifyEmail, loginAdmin };
