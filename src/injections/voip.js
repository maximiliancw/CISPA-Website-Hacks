// Listen for clicks on the "Mehr anzeigen" (More options) button within each contact tile
document.addEventListener("click", (event) => {
  const showMoreButton = event.target.closest("#showMoreBtnTile");
  if (showMoreButton) {
    const contactTile = showMoreButton.closest("people-tile");
    console.log(contactTile);
    if (contactTile) {
      // Check if the "Auto Calling" button is already present to avoid duplication
      if (!contactTile.querySelector(".autoCallButton")) {
        // Insert the "Auto Calling" button into the context menu
        const autoCallButton = document.createElement("button");
        autoCallButton.className = "btn btn-plain-sm px-1 autoCallButton";
        autoCallButton.textContent = "Auto Calling";

        // Add event listener to set up auto-calling when clicked
        autoCallButton.addEventListener("click", () => {
          const contactName = contactTile
            .querySelector("[data-id='extName']")
            .textContent.trim();
          setupAutoCalling(contactName, contactTile);
        });

        // Insert the button into the context menu
        contactTile.querySelector(".wcToolbar").appendChild(autoCallButton);
      }
    }
  }
});

// Function to set up auto-calling for the contact
function setupAutoCalling(contactName, contactTile) {
  console.log(`Setting up auto-calling for ${contactName}...`);

  const availabilityIndicator = contactTile.querySelector(
    "[data-qa='status-indicator']"
  );

  // Function to check if contact is available
  function checkAvailability() {
    const isAvailable =
      availabilityIndicator &&
      availabilityIndicator.classList.contains("available");

    if (isAvailable) {
      // Simulate a click on the call button for the contact
      contactTile.querySelector("[data-qa='do-call']").click();
      console.log(`Calling ${contactName}...`);

      // Show a system notification
      chrome.runtime.sendMessage({
        action: "showNotification",
        title: "Contact Available",
        message: `Calling ${contactName} now.`,
      });
    } else {
      // Contact is not available, check again after a delay
      console.log(
        `${contactName} is not available. Checking again in 5 seconds...`
      );
      setTimeout(checkAvailability, 5000); // Retry after 5 seconds
    }
  }

  // Start checking availability
  checkAvailability();
}
