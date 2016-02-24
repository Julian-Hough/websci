//ticker function that scrolls through after each tweet is posted
function ticker() {
	$("#feeds").animate({
	scrollTop:$("#feeds")[0].scrollHeight - $("#feeds").height()
	},3000)
}

//AJAX get request to pull data from json file
$.getJSON("tweetsFromTwitter.json", function(data) {
	$.each(data, function( count, eh ) {
		//timeout function so that there can be faster load of data on html file
		setTimeout( function() {
		//variables to store important information
		var tweet;
		var name;
		var screen_name;
		var time;
		var profile_image;
		var retweet_count;
		var favorite_count;
				  
		//goes through each index getting data
		$.each( data[count], function( key, val ) {
			if (key == "created_at") {
				time = new Date(val);
			}
			if (key == "text") {
				tweet = val;
			}
			if (key == "retweet_count") {
				retweet_count = val;
			}
			if (key == "favorite_count") {
				favorite_count = val;
			}
			if (key == "user" || key == "entities") {
				$.each( val, function( key2, val2) {
					if (key2 == "name") {
						name = val2;
					}
					if (key2 == "screen_name") {
						screen_name = val2;
					}
					if (key2 == "profile_image_url") {
						profile_image = val2;
					}
							
							
				});
			}
					
		});
	
	//for date class to get month name
	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";
	var n = month[time.getMonth()];
				  
				  
	//temp variable to pull together all the data in one place			  
	var bleh = "<li><ul class=\"tweets\">";
	bleh += "<li class=\"profileImage\"><img class=\"images\" src=\"" + profile_image + "\"></li>";
	bleh += "<li><ul class=\"user\">";
	bleh += "<li class=\"name\">" + name + "</li>";
	bleh += "<li class=\"screenName\">@" + screen_name + "</li></ul></li>";
	
	bleh += "<li class=\"tweet\">" + tweet + "</li>";
	bleh += "<li><ul class=\"tweetFooter\"><li class=\"time\">" + n + " " + time.getDay() + "</li>";
					
	bleh += "<li> " + retweet_count + " <img class=\"icons\" src=\"retweet-action.png\"></li>";
	bleh += "<li> " + favorite_count + " <img class=\"icons\" src=\"Favorite.png\"></li></ul></li>";
	bleh += "</ul></li>";
				  
	//append to #feeds tag in html file
	$("#feeds").append(bleh);
	//calls ticker function to scroll down
	ticker();
	
	}, 3000);
	
	});
});