/*
 * All personnal function should be prefixed by "_" to avoid confusion
 * with oopad function
 */

/* Constants */
var BIDING_ZONE = 5;            // If countdown if <= this limit then place a bid
var MONITORING_ZONE = 10;		// If countdown is <= this limit then check each MONITORING_PERIOD if placing a bid is necessary
var MONITORING_PERIOD = 1000;	// Time in ms, (cf MONITORING_ZONE desc)

/*  Variable Global */
var intervalID = null

/*
 * @Desc: Get Auction ID from url
 */
function _getAuctionIdFromUrl() {
	var query = window.location.search.substring(1);
	var pair = query.split("=");
	return pair[1];
}

/*
 * @Desc: Get countdown value
 *        Thanks to oopad for getCountdownValue func
 */
function _getCountDownValue(b) {
	var f = jQuery("#Auction_" + b + " .Timer");
	var g = f.countdown().getCountdownValue();
	return g
}

/*
 * @Desc Place a bid automatically
 */
function _autoBid(b) {
	var count_down = _getCountDownValue(auctionId);
	console.log(count_down);
	if (count_down == null)
	{
		// Case: Bid is paused
		console.log("Not implemented yet");
	}
	else if (count_down <= MONITORING_ZONE)
	{
		// Case: Watch carefully (check each MONITORING_ZONE)
		if (intervalID == null) {
            intervalID = setInterval(function(){ _autoBid(auctionId) }, MONITORING_PERIOD);
		}
		if (count_down <= BIDING_ZONE) {
		    console.log("Place a bid " + b);
			// Place bid :placeBid(58237)
		}
	}
	else
	{
		// Case: Wait until the Watch carefully timezone
		setTimeout(function(){ console.log("New Check"); }, (count_down - MONITORING_ZONE) * 1000 );
		clearInterval(intervalID);
		intervalID = null
		// Refresh page : window.location.reload()
	}
}

auctionId = parseInt(_getAuctionIdFromUrl());
_autoBid(auctionId)
