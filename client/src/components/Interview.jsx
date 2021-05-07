import { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const Interview = props => {
  const [code, setCode] = useState('<h1>')
  return (
    <main>
      <section>
      <CodeMirror
        value={code}
        // options={options}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
        }}
      />
      </section>
    </main>
  )
}

export default Interview