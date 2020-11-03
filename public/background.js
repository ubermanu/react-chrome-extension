/* eslint-disable no-undef */
console.log("Extension loaded");

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {
    file: "inject.js"
  });
});
