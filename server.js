var express = require('express'),
    validUrl = require('valid-url'),
    getUniqueId = require('./getUniqueId'),
    baseUrl = 'https://dslemay-little-url.herokuapp.com/',
    app = express();

function isValidUrl(userInput) {
  if (validUrl.isWebUri(userInput)) {
    return userInput;
  } else {
    return undefined;
  }
}

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));

app.get(/^\/new\/(.+)/, function(req, res) {
  req.on('error', function(err) {
    console.log(err);
  });
  var urlReq = req.params[0],
      urlObj = {};

  if (/^www/.test(urlReq)) {
    urlReq = 'http://' + urlReq;
  }

  if (isValidUrl(urlReq) !== undefined) {
    // shorten url

    urlObj = getUniqueId(urlReq, baseUrl);
    res.send(JSON.stringify(urlObj));
    // res.send(urlReq + " is a valid url.");
  } else {
    urlObj = {
      'original_url': urlReq,
      'short_url': 'ERR: Original url was not a valid url'
    }
  }
  // res.send(urlObj);
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
