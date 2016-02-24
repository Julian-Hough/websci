Name: Julian Hough
Course: Web Science Systems Development

	Started off with finding a boostrap template to creatively display the 
Twitter Ticker in a responsive and clean way. Used an AJAX get request
to pull data from the tweetsFromTwitter.json file and make it scroll
through each one automatically.

	For the stylization of the twitter ticker part itself, the width 
is automatically altered based on the browser resolution. The height is
adjusted based on how much width there is. Thus this website can be
viewed on a mobile platform easily. Also used Gotham light font that
makes the tweets look nicer and match up similarly to tweets from Twitter.
	
	Generally the tweets are relatively short so at most there will be
five shown at a time. Though for certain tweets that are considerably longer
it will cut out the older ones. When you first visit the page the ticker will
stop for some time so that viewers can see all the tweets there.

	Sadly testing a timeout function works so the script doesn't load all
the data at once, but honestly I have no idea why it loads one, then multiple
at the same time in the beginning. Due to time constraints won't be able to solve that.
However this still makes the code efficient for users since it won't overload the page
on startup. 
 
	Besides displaying the data in the same method for each tweet,
the main idea of the scrolling is based on the ticker() function that
checks the height of the old post and the new post and utilizes the
jQuery animate function to scroll through the post in three seconds.

	One thing I noted mainly was that there are pictures that have
incorrect/invalid URL's. There is a lot of data stored in each index
in the json file that holds a lot of information so that each post can
be standalone instead of checking resources elsewhere constantly. 
The user data is in there and shows hashtags, links, etc. 



Resources:

http://stackoverflow.com/questions/24196712/list-item-scrolling-vertically-like-news-sticker
http://www.w3schools.com/jsref/jsref_obj_date.asp
http://www.w3schools.com/css/css3_fonts.asp
https://designsrazzi.com/2015/free-gotham-font-download/
https://blog.udemy.com/jquery-settimeout/