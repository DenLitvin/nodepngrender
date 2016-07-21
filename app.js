
/* Setup Winston logger in global space */
var winston = require('winston');
global.logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'app.log' })
  ]
});

logger.level = 'debug';

var config = require('./config');
var webshot = require('webshot');
var fs      = require('fs');


/* Load express */
var express = require('express');
var app = express();
var swig = require('swig');


logger.info("Starting");
var renderStream = webshot('google.com');
var file = fs.createWriteStream('google.png', {encoding: 'binary'});

renderStream.on('data', function(data) {
  file.write(data.toString('binary'), 'binary');
});
logger.info("Loaded file");


///////////////////////////////////////////////////////////////////////////////////////////////////
// Set up SWIG template enging
// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
///////////////////////////////////////////////////////////////////////////////////////////////////


// Setup URI Routes
app.get('/',require('./src/index.js').home);


///////////////////////////////////////////////////////////////////////////////////////////////////

// Start timers
var timerTasks = require('./src/timertasks.js');
//var tasks = new  TimerTasks();
timerTasks.start();

///////////////////////////////////////////////////////////////////////////////////////////////////

// Start Express server
var server = app.listen(config.port, function () {

  var host = server.address().address;
  var port = server.address().port;

  logger.info('Example app listening at http://%s:%s', host, port);

});
