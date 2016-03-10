//socket
var socket = io();
	
//on get tweets button push does function 	
$('#formBox').submit(function(){
      
    // get number of tweets to get and search
	var numTweets = document.getElementById("count").value;
	var searchWut = document.getElementById("search").value;
	  
	//push into array
	var stuff = [];
	stuff.push(numTweets);
	stuff.push(searchWut);
	  
	//emit message
	socket.emit('getTweets',stuff);
      
});
	
//start app
angular.module('app',[]).controller('twitterController', function($scope) {
	
	// on tweet received, append to list
    socket.on('data', function(tweets){
		//bind data to feed
		$scope.$apply(function() {
			$scope.feed = tweets['tweets'];
		});
    });
});