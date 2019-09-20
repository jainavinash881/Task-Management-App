const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let cryptr = require('cryptr');
cryptr = new cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');
var dir = path.join(__dirname, 'public');
const app = express();
app.use(express.static(dir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));
var cookieParser = require('cookie-parser');
app.use(cookieParser());


var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'trello',
    password: 'trello',
    database: 'trello'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

app.post('/signup', (req, res) => {
    let encryptedString = cryptr.encrypt(req.body.password);
    let sql = 'insert into users(name, email, password) values (?, ?, ?)';
    let values = [req.body.name, req.body.email, encryptedString];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        return res.redirect('/login.html');
    });
});

app.post('/Authenticate', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let sql = 'select * from users where email = ?';
    let values = [[email]];

    connection.query(sql, [values], function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            decryptedString = cryptr.decrypt(result[0].password);
            if (password == decryptedString) {
                console.log('user is logged in: ');

                let token = jwt.sign({ result }, 'secretkey', (err, token) => {
                    console.log('token = ' + token);
                    res.cookie('jwt', token);
                    res.cookie('Auth', "true");
                    res.cookie('email', email);
                });

                return res.redirect('/home.html');
            } else {
                res.redirect('/login.html');
            }
        }
    });
});

app.post('/tasks', (req, res) => {
    let sql = 'insert into tasks(card_name,id) values (?, ?)';
    let values = [req.body.card_name, 18];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.redirect('/home.html');
    });
});



app.get('/tasks/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', function (err, result) {
        if (err) throw err;
        res.status(200).send({ success: true, results: result });
    });
});


app.post('/completed', (req, res) => {
    let sql = 'insert into  completed_task(card_name,id) values (?, ?)';
    let values = [req.body.card_name, 18];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.redirect('/home.html');
    });
});

app.get('/completed/completed', (req, res) => {
    connection.query('SELECT * FROM completed_task', function (err, result) {
        if (err) throw err;
        res.status(200).send({ success: true, results: result });
    });
});

app.post('/pending_tasks', (req, res) => {
    let sql = 'insert into pending_tasks(card_name,id) values (?, ?)';
    let values = [req.body.card_name, 18];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        res.redirect('/home.html');
    });
});

app.get('/pending_tasks/pending_tasks', (req, res) => {
    connection.query('SELECT * FROM pending_tasks', function (err, result) {
        if (err) throw err;
        res.status(200).send({ success: true, results: result });
    });
});

app.delete('/tasks_delete', (req, res) => {
    connection.query('delete from tasks where ')
    if (err) throw err;
    res.status(200).send({ sucess: true, result: result });

});

app.listen(3000);