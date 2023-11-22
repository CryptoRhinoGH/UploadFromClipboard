chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      id: "uploadImage",
      title: "Upload Image",
      contexts: ["all"]
    });
  });

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "uploadImage") {
        chrome.tabs.sendMessage(tab.id, {
            action: "uploadImageFromClipboard",
            targetElementId: info
        });
    }
  });

