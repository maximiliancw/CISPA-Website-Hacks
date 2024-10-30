function init() {
  const darkModeSwitch = document.getElementById("darkmodeSwitch");

  // Check system's color scheme preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Toggle dark mode based on preference if not already set
  if (prefersDark && !document.body.classList.contains("darkmode")) {
    darkModeSwitch.click();
  } else if (!prefersDark && document.body.classList.contains("darkmode")) {
    darkModeSwitch.click();
  }
}

init();
