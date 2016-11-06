    var express = require('express');
    var app = express();                               
    var mongoose = require('mongoose');
    var passport = require('passport');                     
    var morgan = require('morgan');             
    var bodyParser = require('body-parser');
    var hash = require('bcrypt-nodejs');    
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var localStrategy = require('passport-local' ).Strategy;

 
    // connect to mongoDB database 
   
    var dbConfig = require('./db.config')
    mongoose.connect(dbConfig.mLabUrl);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.log("Successfully connected to the database")
    });


    //Cors
    app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });


    // define middleware
    app.use(morgan('dev'));  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

     //user schema/model
    var User = require('./models/login.js');
    
    //configure passport
    passport.use(new localStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    

    //Webpack stuff
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var config = require('./../webpack.config');
    var compiler = webpack(config);

    //Setting webpack development middleware
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  

    //Static frontend files
    app.use(express.static(path.join(__dirname, '../client')));

      
  
      // API Routes
       app.use('/seat', require('./routes/seat'));
       app.use('/person', require('./routes/person'));
       app.use('/', require('./routes/login'));


       app.get('*', function(req, res) {
         res.sendFile(path.join(__dirname, '../index.html'));
    });


          // error hndlers
        app.use(function(req, res, next) {
          var err = new Error('Not Found');
          err.status = 404;
          next(err);
        });

        app.use(function(err, req, res) {
          res.status(err.status || 500);
          res.end(JSON.stringify({
            message: err.message,
            error: {}
          }));
        });
         

    var port = process.env.PORT || 3000; 
    app.listen(port);
    console.log("App listening on port 3000");