<script>
  import {
    getUserAudio,
    getMicroState,
    onMicroStateChange,
  } from "../libs/audio";
  import Notice from "./Notice.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let microState = "denied";

  function setMicroState(state) {
    microState = state;
    dispatch("state", state);
  }

  getMicroState().then(setMicroState);
  onMicroStateChange(setMicroState);

  $: if (["prompt", "denied"].includes(microState)) {
    getUserAudio();
  }
</script>

{#if microState === "prompt"}
  <Notice type="info" message="Please allow access to your microphone." />
{/if}

{#if microState === "denied"}
  <Notice type="error" message="Access denied to your microphone!" />
  <Notice type="info">
    Open "<span class="italic">chrome://settings/content/microphone</span>" in
    your browser and allow the microphone.
  </Notice>
{/if}

{#if microState === "granted"}
  <Notice type="success" message="Access granted to microphone!" />
{/if}
