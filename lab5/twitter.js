// server init + mods
var express = require('express');
var TwitterStream = require('twitter-stream-api');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var path = require('path');


//allow usage of static files for external css and js
app.use(express.static(path.join(__dirname, 'public')));

//read file needs tweets.json to exist that has at least [] in it
var obj;
fs.readFile('tweets.json', 'utf8', function (err, data) {
  if (err) { 
	console.log('Create a tweets.json file with [] in it!')
	throw err;
  }
  //read file into object for keeping JSON structure
  obj = JSON.parse(data);
});

//Twitter Streaming API Keys 
var keys = {
  consumer_key: 'NAG1Noql3ZqFqXrnCR86FMEk4',
  consumer_secret: 'w1RCNW6QUjixskjjZ6k5QpkIIQknuCf5fMpDrVJhayajoma1rs',
  token: '704380827044585473-YF0dRzrjcPMET0Dmzh34tGcC06iw2q2',
  token_secret: 'b27gMH28anuw6jOnyxKCPD1KUI2hyJ8e5fgIEuHhYzDfG'
};
 
//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets 
var watchList = {
    total: 0,
	count: 0,
    tweets: []
};

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//gets data from the index.html and functions accordingly
io.on('connection', function(socket) {
	socket.emit('data', watchList);
	socket.on('getTweets', function(desc) {
		watchList.total = 0;
		watchList.count = desc[0];
		watchList.tweets = [];
		if (desc[1] == "") {
			location();
		}else {
			track(desc[1]);
		}

	
	});
})

//if the search is blank does by location at RPI
function location() {
//creates new connection
var Twitter = new TwitterStream(keys, true);
//filter
Twitter.stream('statuses/filter', { locations: '-73.68,42.72,-73.67,42.73'});
//connection checker and reports in console
Twitter.on('connection success', function (uri) {
	console.log('connection success', uri);
});
Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});
Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});
Twitter.on('connection error http', function (httpStatusCode) {
    console.log('connection error http', httpStatusCode);
});
Twitter.on('connection error stall', function () {
    console.log('connection error stall');
});
Twitter.on('connection rate limit', function (httpStatusCode) {
    console.log('connection rate limit', httpStatusCode);
});
Twitter.on('connection error unknown', function (error) {
    console.log('connection error unknown', error);
    Twitter.close();
});
Twitter.on('data error', function (error) {
    console.log('data error', error);
});

//gets data from the Streaming API and pushes it back to index.html
Twitter.on('data', function(tweet) {
	
	if (watchList.total < watchList.count) {
		obj.push(tweet);
		watchList.tweets.push(tweet);
		watchList.total++;
		io.emit('data',watchList);
	}else {
		//writes new data into array and prints into tweets.json
		fs.writeFile('tweets.json',JSON.stringify(obj), (err) => {
			if (err) throw err;
		});
		//close connection
		Twitter.close();
		return;	
	}
});
}


//if search isn't blank does based on the key word
function track(search) {
var Twitter = new TwitterStream(keys, true);
Twitter.stream('statuses/filter', { track: search});
Twitter.on('connection success', function (uri) {
	console.log('connection success', uri);
});
Twitter.on('connection aborted', function () {
    console.log('connection aborted');
});
Twitter.on('connection error network', function (error) {
    console.log('connection error network', error);
});
Twitter.on('connection error http', function (httpStatusCode) {
    console.log('connection error http', httpStatusCode);
});
Twitter.on('connection error stall', function () {
    console.log('connection error stall');
});
Twitter.on('connection rate limit', function (httpStatusCode) {
    console.log('connection rate limit', httpStatusCode);
});
Twitter.on('connection error unknown', function (error) {
    console.log('connection error unknown', error);
    Twitter.close();
});
Twitter.on('data error', function (error) {
    console.log('data error', error);
});
Twitter.on('data', function(tweet) {
	
	if (watchList.total < watchList.count) {
		obj.push(tweet);
		watchList.tweets.push(tweet);
		watchList.total++;
		io.emit('data',watchList);
	}else {
		fs.writeFile('tweets.json',JSON.stringify(obj), (err) => {
			if (err) throw err;
		});
		Twitter.close();
		return;
	}
});
}


// start server
http.listen(3000, function(){
  console.log('Server up on *:3000');
});