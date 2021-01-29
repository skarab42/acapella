<script>
  import { getAudioDevices, getStream } from "../libs/audio";
  import MicroPermission from "./MicroPermission.svelte";
  import DeviceSelect from "./DeviceSelect.svelte";
  import RecordButton from "./RecordButton.svelte";

  let microState = "idle";
  let audioDevices = null;
  let inputStream = null;
  let recordedTrack = null;
  let selectedInputDevice = null;

  $: microStateGranted = microState === "granted";
  $: if (microStateGranted) onMicroStateGranted();

  function onMicroStateGranted() {
    getAudioDevices().then((devices) => {
      audioDevices = devices;
      let id = localStorage.getItem("selectedInputDeviceId");
      selectedInputDevice = devices.inputs.find(
        (input) => input.deviceId === id
      );
      selectedInputDevice && selectInput(selectedInputDevice);
    });
  }

  function selectInput(input) {
    localStorage.setItem("selectedInputDeviceId", input.deviceId);
    selectedInputDevice = input;
    getStream(input.deviceId).then((stream) => {
      inputStream = stream;
    });
  }

  function onMicroState({ detail: state }) {
    microState = state;
  }

  function onInputSelect({ detail: input }) {
    selectInput(input);
  }

  function onRecordStart() {
    console.log("start");
  }

  function onRecordStop() {
    console.log("stop");
  }

  function onRecordBlob({ detail: blob }) {
    const reader = new FileReader();
    reader.onload = function (e) {
      console.log({ blob });
      recordedTrack = e.target.result;
    };
    reader.readAsDataURL(blob);
  }
</script>

<MicroPermission on:state="{onMicroState}" />

{#if microStateGranted}
  {#if audioDevices}
    <DeviceSelect
      value="{selectedInputDevice}"
      items="{audioDevices.inputs}"
      on:select="{onInputSelect}"
    />
  {/if}

  {#if inputStream}
    <div class="p-2">
      <RecordButton
        on:start="{onRecordStart}"
        on:stop="{onRecordStop}"
        on:blob="{onRecordBlob}"
        stream="{inputStream}"
      />
    </div>
  {/if}

  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-media-has-caption -->
  <audio controls src="{recordedTrack}"></audio>
{/if}
