import { useState } from 'react'
import './App.css'
import Flow from './Flow'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ height: '100vh', width: '100vw' }}>
        <Flow></Flow>
      </div >
    </>
  )
}

export default App
