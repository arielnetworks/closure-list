
var express = require('express');
var app = express();





app.configure(function() {
  app.use(express.static(__dirname));
});



app.get('/', function(req, res) {
  res.redirect('piglovesyou/goog/demos/list.html');
});

var total = 150; // 400;

var createItems = function(offset, size) {
  var items = [];
  // console.log(offset, offset + size);
  for (var i = offset; i < offset + size && i < total; i++) {

    var title = '';
    var count = Math.floor(Math.random() * 50);
    while (count--) title += 'yeah ';

    items.push({
      id: 'id' + i,
      title: title,
      body: 'ohh... '
    });
  }
  return items;
};

var createResponse = function(offset, size) {
  return {
    total: total,
    items: createItems(offset, size)
  };
};

app.get('/api', function(req, res) {
  var s = Math.min(+req.query.count, 50);
  var r = createResponse(+req.query.offset, s);
  res.status(200);
  res.set({ 'content-type': 'application/json' });
  res.end(JSON.stringify(r));
});



var port = 1337;
app.listen(port, function() {
  console.log('Ready on', port);
});

