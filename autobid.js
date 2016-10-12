/*
 * All personnal function should be prefixed by "_" to avoid confusion
 * with oopad function
 */

/* Constants */
var BIDING_ZONE = 0;            // If countdown if <= this limit then place a bid
var MONITORING_ZONE = 5;		// If countdown is <= this limit then check each MONITORING_PERIOD if placing a bid is necessary
var MONITORING_PERIOD = 300;	// Time in ms, (cf MONITORING_ZONE desc)

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

function _log(b, msg) {
	console.log("bid[" + b + "]: " + msg);
}

/*
 * @Desc Place a bid automatically
 */
function _autoBid(b) {
	var count_down = _getCountDownValue(auctionId);
	var winner = jQuery("#Auction_" + b).find(".CurrentWinnerPublicName").html();
	_log(b, winner + " holds the bid at - " + count_down );
	if (count_down == null)
	{
		// Case: Bid is paused
		_log(b, "Midnight or sold");
	}
	else if (count_down <= MONITORING_ZONE)
	{
		// Case: Watch carefully (check each MONITORING_ZONE)
		if (intervalID == null) {
            intervalID = setInterval(function(){ _autoBid(auctionId) }, MONITORING_PERIOD);
		}
		if (count_down <= BIDING_ZONE && winner != PublicName) {
			// Place bid :placeBid(58237)
		    _log(b, "A bid was placed");
			window.location.reload();
		}
	}
	else
	{
		// Case: Wait until the Watch carefully timezone
		var reload_countdown = (count_down - MONITORING_ZONE) * 1000;
		_log(b, "Reload windows in " + reload_countdown + " ms");
		setTimeout(function(){ window.location.reload(); }, reload_countdown );
		clearInterval(intervalID);
		intervalID = null
	}
}

auctionId = parseInt(_getAuctionIdFromUrl());
_autoBid(auctionId)
