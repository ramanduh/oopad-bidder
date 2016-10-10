var s = document.createElement("script");
s.src = chrome.extension.getURL("autobid.js");
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
