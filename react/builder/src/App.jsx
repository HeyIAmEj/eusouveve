import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarResponsible from './components/NavbarResponsible.jsx'
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
        <NavbarResponsible />
        <Container className='d-flex justify-content-center'>
          <h1>This is React :)</h1>
        </Container>
    </>
  )
}

export default App
