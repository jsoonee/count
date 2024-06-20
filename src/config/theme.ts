(() => {
  const currentTheme = localStorage.getItem("theme");
  const prefersTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";
  const theme = currentTheme || prefersTheme;
  console.log(theme);
  document.documentElement.setAttribute("data-theme", theme);
})();