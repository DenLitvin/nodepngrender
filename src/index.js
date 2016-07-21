'use strict';
var timerTasks = require('./timertasks');
var request = require('request');

exports.home = function (req, res) {
    res.render('index',{
        variable1:"hello world",
        variable2:timerTasks.getCounter()
    });
};






