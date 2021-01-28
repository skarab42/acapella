<script>
  import Icon from "./Icon.svelte";
  import MdInfo from "svelte-icons/md/MdInfo.svelte";
  import MdError from "svelte-icons/md/MdError.svelte";
  import MdCheckCircle from "svelte-icons/md/MdCheckCircle.svelte";

  export let message = null;
  export let type = "info";
  export let hasIcon = true;

  const icons = {
    info: MdInfo,
    error: MdError,
    success: MdCheckCircle,
  };

  const colors = {
    info: "bg-blue-600",
    error: "bg-red-600",
    success: "bg-green-600",
  };

  let icon = icons[type] || icons.error;
  let color = colors[type] || colors.error;
</script>

<div class="flex items-center p-2 gap-2 {color} text-gray-300 fill-current">
  {#if hasIcon}
    <Icon icon="{icon}" class="w-6 h-6 flex-shrink-0" />
  {/if}
  <div>
    {#if message}
      {message}
    {:else}
      <slot />
    {/if}
  </div>
</div>
