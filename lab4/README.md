Name: Julian Hough
Course: Web Science Systems Development

The API call needed some editing in the TwitterAPIExchange.php to allow the data to 
pass through successfully. From there get request via AngularJS was utilized to pull
the data into $scope.feed and made the application through the web browser to make
the presentation of data easier than with jQuery as in lab 1. From there I formatted
and parsed the data with different tags and stylized it with CSS and bootstrap. Since
my overall design was simple, media queries didn't really play as big of a role in this
lab than I had hoped for. Maybe if I had been dealing with different kind of data, a 
different presentation could have been seen rather than something simple like tweets.

Though there are differences from mobile and desktop, but only negligible slight differences
that many would probably not notice at all unless looking at the CSS code. To make this
twitter feed be more dynamic an automatic call on the get request for new tweets is made
every 12 seconds through $interval. Since the new tweets are generally random and having
a lot on one page would just create clutter, I limited the number of tweets shown to five
like in the first lab. 

Since the data being dealt with is recent, there wasn't a need for date and retweet and 
favorites. Instead user data is posted showing number of followers and friends. To make
each tweet more personalized the user background is used instead of a generic one
for each tweet. 



References:

https://docs.angularjs.org/api/ng/service/$http#get
http://www.9lessons.info/2013/08/angularjs-tutorial-restful.html
