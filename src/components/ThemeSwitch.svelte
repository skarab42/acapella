<script>
  import Icon from "./Icon.svelte";
  import FaSun from "svelte-icons/fa/FaSun.svelte";
  import FaMoon from "svelte-icons/fa/FaMoon.svelte";

  function getOSTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getTheme() {
    const userTheme = localStorage.getItem("theme");
    return ["dark", "light"].includes(userTheme) ? userTheme : getOSTheme();
  }

  function setTheme(newTheme) {
    theme = ["dark", "light"].includes(newTheme) ? newTheme : "light";
    document.body.classList[theme === "dark" ? "add" : "remove"]("dark");
    localStorage.setItem("theme", theme);
  }

  function toggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  let theme = getTheme();
  let size = "p-1 w-8 h-8";
  let selected = "bg-gray-500 bg-opacity-50 rounded-full";

  $: isDark = theme === "dark";

  setTheme(theme);
</script>

<label
  class="inline-block bg-gray-500 bg-opacity-50 shadow-inner rounded-full cursor-pointer"
>
  <div class="flex items-center text-gray-200 fill-current">
    <div class="{size} {theme === 'dark' ? '' : selected}">
      <Icon icon="{FaSun}" />
    </div>
    <div class="{size} {theme === 'dark' ? selected : ''}">
      <Icon icon="{FaMoon}" />
    </div>
  </div>
  <input
    class="hidden"
    type="checkbox"
    checked="{isDark}"
    on:change="{toggle}"
  />
</label>
