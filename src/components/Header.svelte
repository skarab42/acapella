<script>
  import { name, version } from "../../package";
  import ThemeSwitch from "./ThemeSwitch.svelte";

  let title = `${name} v${version}-alpha`;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="flex p-2">
  <div class="flex-auto">{title}</div>
  <ThemeSwitch />
</header>
