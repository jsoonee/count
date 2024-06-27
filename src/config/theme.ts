(() => {
  const currentTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const theme = currentTheme || (prefersDark.matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  function changePrefersTheme() {
    document.documentElement.setAttribute("data-theme", prefersDark.matches ? "dark" : "light");
  }
  prefersDark.addEventListener("change", changePrefersTheme)
})();