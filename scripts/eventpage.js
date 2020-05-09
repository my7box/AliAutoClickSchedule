chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request)
      sendResponse(true);
  });

const applyClass=()=>{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {target: true});
  });
}

  chrome.contextMenus.create({
      "id":"scheduleClick",
    "title": "Schedule Click",
    "contexts": ["page", "selection", "image", "link"]
  });
  
  // Must be synchronously called on event page load,
  //   for instance in the top level code
  chrome.contextMenus.onClicked.addListener(applyClass);
