# Oopad-bidder

Oopad-bidder is a chrome plugin that allows to place automatically a bid on the auction website [oopad](http://oopad.com/). Please note that oopad have already their own automatic bidder on the server side. This one is on the client side and allows you to configure at what time of the countdown do you want to place the bid.

### Installation
1. Download the source code:
```
$git clone https://github.com/ramanduh/oopad-bidder.git
```
2. Go to [chrome://extensions/](chrome://extensions/), ensure that the ***Developer mode*** checkbox in the top right-hand corner is checked and click ***Load unpacked extension***

3. Navigate to the directory in which the code source was cloned, and select it.

### Usage

To watch an auction, just go to oopad home and select an article. Oopad-bidder is activate when the urls matches `http://en.oopad.com/Y/Bid/Details/?DId=<id_article>` with `<id_article>` the article identifier.

To customize ***oopad-autobid***, edit the following lines in `autobid.js` and reload the extension:
```
/* Constants */
var BIDING_ZONE = -2;       // If countdown <= BIDING_ZONE then place a bid
var CHECKING_ZONE = 4;      // If BIDING_ZONE < countdown <= CHECKING_ZONE
                            // then check each CHECKING_PERIOD if placing a bid is necessary
var CHECKING_PERIOD = 300;  // Time in ms, (cf CHECKING_ZONE desc)
```
