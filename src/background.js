chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setContextMenu") {
        const title = request.canAutoCall ? "Enable Auto-Calling" : "Already Available - Use Left Click to Call";
        
        chrome.contextMenus.removeAll(); // Clear previous context menu items
        chrome.contextMenus.create({
            id: "autoCall",
            title: title,
            contexts: ["all"]
        });
    }

    if (request.action === "showNotification") {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "assets/icon48.png", // Adjust path to your icon
            title: request.title,
            message: request.message
        });
    }
});

// Respond to clicks on the auto-call option
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "autoCall") {
        chrome.tabs.sendMessage(tab.id, { action: "setupAutoCall", contactName: info.contactName });
    }
});
