<script>
  export let device;
  export let selectedDevice;

  $: selected = selectedDevice && selectedDevice.deviceId !== device.deviceId;
</script>

<option value="{device.deviceId}" selected="{selected}">{device.label}</option>
