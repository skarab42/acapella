function isSupported(api) {
  return navigator.mediaDevices && navigator.mediaDevices[api];
}

export function getMicroState() {
  return navigator.permissions
    .query({ name: "microphone" })
    .then((permission) => {
      return permission.state;
    });
}

export function onMicroStateChange(callback) {
  navigator.permissions.query({ name: "microphone" }).then((permission) => {
    permission.addEventListener("change", () => callback(permission.state));
  });
}

export function getUserAudio() {
  if (!isSupported("getUserMedia")) {
    throw new Error("Unsupported getUserMedia method");
  }

  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export function enumerateDevices() {
  const results = { audioinput: [], audiooutput: [] };

  if (!isSupported("enumerateDevices")) {
    throw new Error("Unsupported enumerateDevices method");
  }

  return navigator.mediaDevices.enumerateDevices().then((devices) => {
    devices.forEach((device) => {
      results[device.kind] && results[device.kind].push(device);
    });
    return results;
  });
}

export function getAudioDevices() {
  return enumerateDevices().then((devices) => {
    return { inputs: devices.audioinput, outputs: devices.audiooutput };
  });
}

export function getStream(deviceId) {
  return navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
}
