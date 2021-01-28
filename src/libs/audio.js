function isSupported(api) {
  return navigator.mediaDevices && navigator.mediaDevices[api];
}

export function onPermissionChange(name, callback) {
  navigator.permissions.query({ name }).then((permission) => {
    permission.addEventListener("change", () => callback(permission));
  });
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

export function getUserAudio() {
  if (!isSupported("getUserMedia")) {
    throw new Error("Unsupported getUserMedia method");
  }

  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export function getAudioDevices() {
  return getUserAudio().then(async () => {
    const devices = await enumerateDevices();
    return { inputs: devices.audioinput, outputs: devices.audiooutput };
  });
}
