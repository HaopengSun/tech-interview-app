import React, { useEffect, useState } from 'react'

export default function useWebcam() {
  const [authorized, setAuthorized] = useState(null)
  const [webcamList, setWebcamList] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [stream, setStream] = useState(null)
  
  const chooseStream = (stream) => {
    setSelectedDevice(stream)
  }
  
  useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
    // if the webcam is not supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
      return;
    }

    // enumerateDevices() outputs a list of the device IDs
    navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          console.log(device)
          if (device.kind === 'videoinput') {
            console.log(device.kind + ": " + device.label + " id = " + device.groupId);
            setWebcamList(prev => [...prev, { kind: device.kind, label: device.label, id: device.groupId }])
          }
        });
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
        setAuthorized(false)
      });
  }, [])

  useEffect(() => {
    if (selectedDevice) {
      const constraint = { video: { deviceId: selectedDevice.id } }

      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      navigator.mediaDevices.getUserMedia(constraint).then(function (stream) {
        setStream(stream)
        setAuthorized(true)
      }).catch(function (err) {
        setAuthorized(false)
      });
    }
  }, [selectedDevice])

  return { authorized, webcamList, stream, chooseStream }

}