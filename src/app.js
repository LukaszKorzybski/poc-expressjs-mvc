var express = require('express'),
    bodyParser = require('body-parser'),
    kleiDust = require('klei-dust'),
    config = require('./config'),
    routes = require('./routes');

var app = express();

app.use(bodyParser());

kleiDust.setOptions({ extension: 'html' });
app.set('views', __dirname + '/views');
app.engine('html', kleiDust.dust);
app.set('view engine', 'html');
app.set('view options', { layout: false });

routes(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});