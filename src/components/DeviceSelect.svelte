<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let items = [];
  export let value = null;

  function onChange() {
    dispatch("select", value);
  }
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select bind:value on:change="{onChange}" class="p-2 bg-gray-300 text-gray-800">
  {#each items as item}
    <option
      value="{item}"
      class="p-2 {value &&
        value.label === item.label &&
        'bg-pink-600 text-gray-300'}">{item.label}</option
    >
  {/each}
</select>
