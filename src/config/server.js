const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// middlewares
app.use(morgan('dev'));
app.use(myconnection(mysql, {
    host: 'btb75txot79gpnvzheed-mysql.services.clever-cloud.com',
    user: 'u35m5t1uvwarirqg',
    password: '4uwRWy11tJ6dF2eIlY5O',
    port: 3306,
    database: 'btb75txot79gpnvzheed'
}, 'single'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static files
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;