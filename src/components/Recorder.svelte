<script>
  import { getAudioDevices, onPermissionChange } from "../libs/audio";

  const dismissMessage = "Permission dismissed";
  const waitingMessage = "Waiting for microphone...";

  let input = null;
  let message = waitingMessage;

  getAudioDevices()
    .then((devices) => {
      console.log({ devices });
    })
    .catch((error) => {
      message = error.message;
    });

  onPermissionChange("microphone", (permission) => {
    const granted = ["prompt", "granted"].includes(permission.state);
    message = granted ? waitingMessage : dismissMessage;
    granted && getAudioDevices();
  });

  $: console.log("INPUT:", input);
</script>

{#if !input}
  <div class="p-2 bg-red-700 text-gray-300">{message}</div>
{:else}
  <div class="p-2">
    <span class="p-2 bg-green-800 text-gray-300 rounded-full cursor-pointer">
      Record
    </span>
  </div>
{/if}
