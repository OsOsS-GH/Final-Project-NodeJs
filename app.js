// Grap App Dependencies
const express = require('express'),
    app = express(),
    expressLayout = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    cors = require('cors');


// Database Connection
(() => {
    mongoose.connect(process.env.DB_URI);
    mongoose.set('strictQuery', true);
    const db = mongoose.connection;
    db.once('open', () => console.log("Db Connected Successfully"))
    db.on('error', () => console.error("Connection Failed"));
})();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = ["http://localhost:3000" , "http://127.0.0.1:5501"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);

// Static Middlewares
app.use(express.static(__dirname + "/public"));
app.use('/node_modules' , express.static(__dirname + "/node_modules"));

// View Engine
app.set('view engine', 'ejs');
app.use(expressLayout);

// Routes Middleware
app.use(require('./routes/router'));

// Handle Request Error
app.use((req, res, next) => {
    const error = new Error("Request not found .. something wrong .. Try Again Later")
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        errorMessage: {
            message: error.message,
            status: error.status
        }
    })
})
// ensure server works successfully
app.use((req, res, next) => {
    res.status(200).json({
        message: "Server Running Successfully "
    })
    next();
})

module.exports = app;