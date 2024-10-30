function init() {
  let ticket_creation_date = document.getElementsByClassName("Age");
  // We skip the header
  for (let i = 1; i < ticket_creation_date.length; i++) {
    let current_date = ticket_creation_date[i];
    let ticket_age = dhm(Date.now() - Date.parse(current_date.title));
    let days = ticket_age[0];
    let hours = ticket_age[1];
    // Change color
    if (days < 14) {
      current_date.style.color = "green"; // green
      current_date.innerText = days + "d " + hours + "h 😇";
    } else if (days >= 14 && days < 28) {
      current_date.style.color = "#A66D05"; // yellow
      current_date.innerText = days + "d " + hours + "h 🥹";
    } else if (days >= 28 && days < 56) {
      current_date.style.color = "#F21616"; // orange
      current_date.innerText = days + "d " + hours + "h 😭";
    } else if (days >= 56) {
      current_date.style.color = "#591521"; // red
      current_date.innerText = days + "d " + hours + "h 🫣";
    }
  }
}

// https://stackoverflow.com/questions/8528382/javascript-show-milliseconds-as-dayshoursmins-without-seconds
function dhm(ms) {
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  return [days, hours];
}

init();
