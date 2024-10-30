function init() {
    // Get all rows with the class "MasterAction"
    let ticket_rows = document.getElementsByClassName("MasterAction");
    
    // Loop through each row (skipping the header if necessary)
    for (let i = 0; i < ticket_rows.length; i++) {
        let row = ticket_rows[i];

        // Extract the ticket ID from the "Ticket" column's link
        let ticketLink = row.querySelector(".Ticket a");
        if (!ticketLink) continue; // Skip if no ticket link found
        
        let ticketId = ticketLink.textContent.trim();
        let year = parseInt(ticketId.slice(0, 4));
        let month = parseInt(ticketId.slice(4, 6)) - 1; // JavaScript months are 0-indexed
        let day = parseInt(ticketId.slice(6, 8));

        // Create a Date object from the ticket ID
        let ticketDate = new Date(year, month, day);
        if (isNaN(ticketDate.getTime())) {
            console.error(`Invalid date extracted from ticket ID for row ${i}:`, ticketId);
            continue;  // Skip this row if the date is invalid
        }

        // Calculate the ticket age in days and hours
        let ticket_age = dhm(Date.now() - ticketDate.getTime());
        let days = ticket_age[0];
        let hours = ticket_age[1];
        
        // Find the "Age" column and update its content based on the ticket age
        let ageCell = row.querySelector(".Age");
        if (!ageCell) continue;

        // Apply colors and emojis based on age
        if (days < 14) {
            ageCell.style.color = "green"; // green
            ageCell.innerText = `${days}d ${hours}h 😇`;
        } else if (days >= 14 && days < 28) {
            ageCell.style.color = "#A66D05"; // yellow
            ageCell.innerText = `${days}d ${hours}h 🥹`;
        } else if (days >= 28 && days < 56) {
            ageCell.style.color = "#FF9900"; // orange
            ageCell.innerText = `${days}d ${hours}h 😭`;
        } else if (days >= 56) {
            ageCell.style.color = "#FF0000"; // red
            ageCell.innerText = `${days}d ${hours}h 😵`;
        }
    }
}

// Function to calculate days and hours from milliseconds
function dhm(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    return [days, hours];
}

init();
