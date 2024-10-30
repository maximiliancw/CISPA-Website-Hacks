// Set up a listener for the context menu event to enable auto-calling
document.addEventListener("contextmenu", (event) => {
    const contactTile = event.target.closest("people-tile"); // Get the closest contact tile

    if (contactTile) {
        event.preventDefault(); // Prevent the default context menu

        const contactName = contactTile.querySelector("[data-id='extName']").textContent.trim(); // Get the contact's name

        // Check if the contact is available
        const availabilityIndicator = contactTile.querySelector("[data-qa='status-indicator']");
        const isAvailable = availabilityIndicator && availabilityIndicator.classList.contains("available");

        // Send message to background to show the context menu with auto-call option if unavailable
        chrome.runtime.sendMessage({
            action: "setContextMenu",
            contactName,
            canAutoCall: !isAvailable
        });
    }
});

// Listen for messages from the background script for auto-call setup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "setupAutoCall") {
        startAutoCalling(request.contactName);
    }
});

// Function to initiate auto-calling by continuously checking availability
function startAutoCalling(contactName) {
    const contactTile = [...document.querySelectorAll("people-tile")].find(tile =>
        tile.querySelector("[data-id='extName']").textContent.trim() === contactName
    );

    if (!contactTile) {
        console.error("Contact not found.");
        return;
    }

    const availabilityIndicator = contactTile.querySelector("[data-qa='status-indicator']");

    // Function to check if contact is available
    function checkAvailability() {
        const isAvailable = availabilityIndicator && availabilityIndicator.classList.contains("available");

        if (isAvailable) {
            // Contact is available, start the call
            contactTile.querySelector("[data-qa='do-call']").click();
            console.log(`Calling ${contactName}...`);
            
            // Show a system notification
            chrome.runtime.sendMessage({
                action: "showNotification",
                title: "Contact Available",
                message: `Calling ${contactName} now.`
            });
        } else {
            // Contact is not available, check again after a delay
            console.log(`${contactName} is not available. Checking again in 5 seconds...`);
            setTimeout(checkAvailability, 5000); // Retry after 5 seconds
        }
    }

    // Start checking availability
    checkAvailability();
}
