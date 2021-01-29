<script>
  import { createEventDispatcher } from "svelte";

  export let stream;

  let isRecording = false;
  let mediaRecorder = null;

  const dispatch = createEventDispatcher();

  $: recordButtonlabel = isRecording ? "stop" : "start";

  let chunks = [];

  function getBlob() {
    console.log({ chunks });
    return new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  }

  function startRecording() {
    chunks = [];

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      chunks.push(e.data);
      console.log("push:", e.data);
      dispatch("chunk", e.data);
    });

    mediaRecorder.addEventListener("stop", (e) => {
      dispatch("blob", getBlob());
    });

    mediaRecorder.start();
    dispatch("start");
  }

  function stopRecording() {
    mediaRecorder.stop();
    dispatch("stop");
  }

  function toggleRecording() {
    isRecording ? stopRecording() : startRecording();
    isRecording = mediaRecorder.state === "recording";
  }
</script>

<button
  on:click="{toggleRecording}"
  class="p-2 bg-green-600 uppercase rounded-full">{recordButtonlabel}</button
>
