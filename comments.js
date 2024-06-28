// Create web server
// Run node comments.js
// Open browser and go to http://localhost:3000

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                console.log(err);
                res.end('Something went wrong');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else if (pathname === '/addComment') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comments));
    } else {
        var filename = path.join(__dirname, pathname);
        fs.exists(filename, function(exists) {
            if (!exists) {
                res.end('404 Not Found');
            } else {
                fs.readFile(filename, function(err, data) {
                    if (err) {
                        res.end('500 Server Error');
                    } else {
                        res.end(data);
                    }
                });
            }
        });
    }
}).