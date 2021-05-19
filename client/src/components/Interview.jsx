import { useState, useRef, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import useWebcam from '../hooks/useWebcam';
import io from 'socket.io-client';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/material-ocean.css';
import 'codemirror/theme/material-palenight.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js';

const Interview = props => {
  const webcamFeed = useRef({})
  const {  authorized, webcamList, stream, chooseStream } = useWebcam()

  useEffect(() => {
    if (!stream) { return }
    navigator.mediaDevices.getUserMedia({ video: { width: 200 }})
      .then(stream => {
        webcamFeed.current.srcObject = stream
      })
  }, [stream])

  const [code, setCode] = useState('const bob = () => console.log("hello world")')
  const [options, setOptions] = useState({
    theme: 'material',
    mode: 'javascript',
    tabSize: 2,
    readOnly: false
  })

  // connect to the server
  const socket = useRef()

  useEffect(() => {
    socket.current = io()
    socket.current.on('message', (data) => console.log(data))
  }, [])


  const themeChange = (themeName) => {
    console.log(themeName, {...options, theme: themeName})
    setOptions({...options, theme: themeName})
  }

  // show all available webcam
  const streams = webcamList.map(streamItem => {
    return <li onClick={() => chooseStream(streamItem)}>
      {(stream && stream.label === streamItem.lable) ? "X" : ""} - {streamItem.label}
      </li>
  })

  return (
    <main className="Interview">
      <section>
      <CodeMirror
        className= {`code-container ${options.readOnly ? "read-only" : ""}`}
        value={code}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
        }}
      />
      </section>

      <section>available camera: {streams}</section>

      <aside>
        <section className="webcam">
          <video ref={webcamFeed} onLoadedData={() => webcamFeed.current.play()}></video>
          <div className='candidate'>candidate</div>
        </section>
        <section className="buttons">
          <div>
            <button onClick={() => setOptions({...options, readOnly: !options.readOnly})}>
              {options.readOnly ? "take over" : "read only"}
            </button>
          </div>
          <div className='theme-selection'>
            <button onClick={() => themeChange('material-darker')}>darker theme</button>
            <button onClick={() => themeChange('material-ocean')}>ocean theme</button>
            <button onClick={() => themeChange('material-palenight')}>palenight theme</button>
          </div>
        </section>
      </aside>

    </main>
  )
}

export default Interview