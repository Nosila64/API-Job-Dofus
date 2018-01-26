/**
 * Created by Alison on 25/01/2018.
 */
var express = require("express");
var mysql = require("mysql");
var bodyParser= require("body-parser");
var rest = require("./REST.js");
var app = express();

function REST(){
    var self = this;
    self.connectMysql();
}

REST.prototype.connectMysql = function() {
    var self = this;
    var pool = mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'angudofus',
        debug: false
    });
    pool.getConnection(function(err,connection) {
        if(err)
        {
            self.stop(err);
        }
        else
        {
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
    var self = this;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new rest(router, connection);
    self.startServer();
};

REST.prototype.startServer = function() {
    app.listen(3000,function() {
        console.log("OK POTO CA MARCHE PORT 3000");
    });
};
REST.prototype.stop = function(err) {
    console.log("POTO CA BUG PANIK PAS " +err);
    process.exit(1);
};

new REST();