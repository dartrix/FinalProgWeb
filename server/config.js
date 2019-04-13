const path = require('path')

const express = require('express');

const exphbs = require('express-handlebars')

const routes = require('../routes');

const uuid = require('uuid/v4')

var session = require('express-session')

const bodyParser = require('body-parser');


module.exports = app => {


  //setters
    app.set('port', process.env.PORT || 3000);

    app.set('views', path.join(__dirname, '../views'))

    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
      }));
    app.set('view engine', '.hbs');


    //middlewares
    app.use(session({
      genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
      },
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true
    })) 

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    
    //routes
    routes(app);


    //static
    app.use('/public', express.static( path.join(__dirname, '../public')));

    return app;

}