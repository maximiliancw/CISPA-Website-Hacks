function init() {
  const darkModeSwitch = document.getElementById("darkmodeSwitch");

  // Function to toggle dark mode based on system preference
  const toggleDarkMode = () => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDarkModeEnabled = document.body.classList.contains("darkmode");

    if (prefersDark && !isDarkModeEnabled) {
      darkModeSwitch.click();
    } else if (!prefersDark && isDarkModeEnabled) {
      darkModeSwitch.click();
    }
  };

  // Initial check on page load
  toggleDarkMode();

  // Listen for changes in system color scheme
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", toggleDarkMode);
}

init();
