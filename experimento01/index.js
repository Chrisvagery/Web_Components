class ThemeSwitcher extends HTMLElement {
  constructor() {
    super();

    const button = document.createElement("button");
    button.innerText = "Alternar Tema";
    button.addEventListener("click", this.toggleTheme.bind(this));

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(button);
  }

  connectedCallback() {
    const currentTheme = localStorage.getItem("theme") || "light";
    this.setTheme(currentTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    this.setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

customElements.define("theme-switcher", ThemeSwitcher);
