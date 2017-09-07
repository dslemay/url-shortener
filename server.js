var express = require('express'),
    validUrl = require('valid-url'),
    app = express();

function isValidUrl(userInput) {
  var regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._]/i;
  return regex.test(userInput);
}

app.use('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

app.get('/new/:urlRequest', function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });
  if (isValidUrl(req.params.urlRequest)) {
    // shorten url
  } else {
    res.send(req.params.urlRequest + " is not a valid url.");
  }
});

app.get('/:shortUrl', function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });
  /*
   * Test if shortUrl parameter is saved. If so, serve up url it is linked to.
   * If shortUrl parameter is not saved return a message that the short url does not exist.
  */
});

app.on('error', function(err) {
  console.log(err);
});

app.listen(app.get('port'), function() {
  console.log('Node is listening on port', app.get('port'));
});
