/*
 * All personnal function should be prefixed by "_" to avoid confusion
 * with oopad function
 */

// Variables declation
var BID_TRIGGER_COUNT_DOWN = 5;
var ACHECK_LIMIT = 10;			// If the countdown is under this limit, do an active check
var ACHECK_PERIOD = 1000;		// In ms
var max_countdown = 45;       // TODO How to get the max time
var max_try = 80;

function _getAuctionIdFromUrl() {
	// Get Auction ID from url 
	var query = window.location.search.substring(1);
	var pair = query.split("=");
	return pair[1];
}

function _getCountDownValue(b) {
	var f = jQuery("#Auction_" + b + " .Timer");
	var g = f.countdown().getCountdownValue();
	return g
}

var i=0;
var intervalID = null
function _bid(b) {
	++i;
	var count_down = _getCountDownValue(auctionId);
	console.log(count_down);
	if (count_down <= ACHECK_LIMIT ) {
		if (intervalID == null) {
            intervalID = setInterval(function(){ _bid(auctionId) }, ACHECK_PERIOD);
		}
		if (count_down <= BID_TRIGGER_COUNT_DOWN) {
		    console.log("Let us bid " + b);
		}
	} else {
		setTimeout(function(){ console.log("New Check"); }, (count_down - ACHECK_LIMIT) * 1000 );
		clearInterval(intervalID);
		intervalID = null
	}
	if(i === max_try) clearInterval(intervalID);
}

auctionId = parseInt(_getAuctionIdFromUrl());
_bid(auctionId)

if (count_down >= active_check_limit) {
   // Wait some times
// Actualise page : window.location.reload()
} else {
	// Perform the active check
	var intervalID = setInterval(function(){ myTimer() }, ACHECK_PERIOD);
	clearInterval(myVar);
}	

// END
var end = false;
var BID_LIMIT = 1

// sleep time expects milliseconds
function sleep (time) {
   return new Promise((resolve) => setTimeout(resolve, time));
}

var max = 100;
var i=0;
var wait = 8000;

while (i < max) {
    sleep(wait).then(() => {
		var timer = document.getElementsByClassName("Value timerSec")[1].innerText;
		console.log(timer);
		if (parseInt(timer) <= BID_LIMIT ) {
			placeBid(_auctionId);
		}
	});
	i+=1;
	console.log(i)
}

// Place bid :placeBid(58237)
