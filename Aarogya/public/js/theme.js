(function () {
    const storageKey = "healthlink-theme";
    const savedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

    document.documentElement.setAttribute("data-theme", initialTheme);

    function addThemeToggle() {
        if (document.querySelector("[data-theme-toggle]")) return;

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "theme-toggle";
        toggle.setAttribute("data-theme-toggle", "true");
        toggle.addEventListener("click", function () {
            const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", nextTheme);
            localStorage.setItem(storageKey, nextTheme);
            updateToggle(toggle, nextTheme);
        });

        const container = document.querySelector(".navbar, header");
        if (container) {
            container.appendChild(toggle);
        } else {
            document.body.classList.add("theme-toggle-floating");
            document.body.appendChild(toggle);
        }

        updateToggle(toggle, initialTheme);
    }

    function updateToggle(toggle, theme) {
        const nextTheme = theme === "dark" ? "light" : "dark";
        toggle.textContent = theme === "dark" ? "☀ Light" : "☾ Dark";
        toggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
        toggle.title = `Switch to ${nextTheme} mode`;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", addThemeToggle);
    } else {
        addThemeToggle();
    }
})();
