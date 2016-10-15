/*
 * This code will be append to oopad code on document loading
 * Functions defined here would be prefixed by "_" to avoid confusion
 * with oopad function
 *
 * http://fr.oopad.com/WebServices/BiddingWebService.asmx
 */

/* Constants */
var BIDING_ZONE = -2;       // If countdown <= BIDING_ZONE then place a bid
var CHECKING_ZONE = 4;		// If BIDING_ZONE < countdown <= CHECKING_ZONE
                            // then check each CHECKING_PERIOD if placing a bid is necessary
var CHECKING_PERIOD = 300;	// Time in ms, (cf CHECKING_ZONE desc)

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
 */
function _getCountDownValue(b) {
	var f = jQuery("#Auction_" + b + " .Timer");
	var g = f.countdown().getCountdownValue();
	return g
}

function _log(b, msg) {
	var d = new Date();
	var n = d.toLocaleString();
	console.log(n + " bid[" + b + "]: " + msg);
}

function _getBidHolder(b) {
	var winner = jQuery("#Auction_" + b).find(".CurrentWinnerPublicName").html();
	return winner;
}

/*
 * @Desc Place a bid automatically
 */
function _autoBid(b) {
	var count_down = _getCountDownValue(auctionId);
	var winner = _getBidHolder(b);
	_log(b, winner + " holds the bid at " + count_down );
	if (count_down == null)
	{
        if (winner == "--")
        {
            _log(b, "Auction closed, won by " + winner);
        }
        else
        {
            // Auction is paused at midnight
            _log(b, "Auction paused");
        }
	}
	else if (count_down <= CHECKING_ZONE)
	{
		// In the checking zone
		if (intervalID == null)
        {
            intervalID = setInterval(function(){ _autoBid(auctionId) }, CHECKING_PERIOD);
		}
		if (count_down <= BIDING_ZONE && winner != PublicName) {
            if (winner == "--")
            {
                //Bid hasn't begun
                var reload_countdown = 15 * 1000;
                _log(b, "Reload windows in " + reload_countdown + " ms");
                setTimeout(function(){ window.location.reload(); }, reload_countdown );
                clearInterval(intervalID);
                intervalID = null;
            }
            else
            {
			    placeBid(b);
		        _log(b, "A bid was placed");
			    window.location.reload();
            }
		}
	}
	else
	{
        if (winner == "--") {
            //Bid hasn't begun
		    var reload_countdown = 30 * 1000;
        } else {
		    // Case: Wait until the check actively zone
		    var reload_countdown = (count_down - CHECKING_ZONE) * 1000;
		    clearInterval(intervalID);
		    intervalID = null;
        }
        _log(b, "Reload windows in " + reload_countdown + " ms");
        setTimeout(function(){ window.location.reload(); }, reload_countdown );
	}
}

auctionId = parseInt(_getAuctionIdFromUrl());
_autoBid(auctionId)
