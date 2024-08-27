import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import reactLogo from './../assets/react.svg'


function NavbarResponsible() {
  return (
    <Navbar bg="secondary" data-bs-theme="dark" collapseOnSelect expand="lg">
        <Navbar.Brand href="http://eusouveve.com.br">
            <a href="https://react.dev" >
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Inicio</Nav.Link>
            <Nav.Link href="#pricing">Sobre mim</Nav.Link>
            <NavDropdown title="Projetos" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="../../projects/flow/index.html">Criador de Fluxo</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Projeto B
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Projeto C</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Projeto D - (Deprecated)
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="Contatos" id="basic-nav-dropdown" align="end" variant="light">
              <NavDropdown.Item href="#">Whatsapp</NavDropdown.Item>
              <NavDropdown.Item href="#">Telegram</NavDropdown.Item>
              <NavDropdown.Item href="#">LinkedIn</NavDropdown.Item>
              <NavDropdown.Item href="#">Instagram</NavDropdown.Item>
              <NavDropdown.Item href="#">Twitter</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarResponsible;