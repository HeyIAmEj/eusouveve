import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { useReactFlow } from 'reactflow';

function NavbarActions({ flowId, flowName, systemVariables, onSystemVariables, onFlowNameChange, onSave, onAdd, onSaveSketch, onLayout1, onLayout2, showNewFlow, onFlowChange, onDeleteFlow }) {
    const [flowList, setFlowList] = useState([]);
    const [modal, setModal] = useState({ title: "", content: "" });
    const [offcanva, setOffcanva] = useState({ title: "", content: "" });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [offcanvaState, setOffcanvaState] = useState(false);
    const offcanvaClose = () => setOffcanvaState(false);
    const offcanvaShow = () => setOffcanvaState(true);

    const [listSystemVars, setListSystemVars] = useState(systemVariables);
    const [inputVarId, setIdSystemVars] = useState('');
    const [inputVarValue, setValueSystemVars] = useState('');

    const changeConfirmation = (flow) => {
        const title = "Trocar de fluxo?"
        const content = <>
            <p>Você selecionou o fluxo: <i><u>{flow.name}</u></i></p>
            <p className='fw-bold'>Aviso: Alteração de Fluxo Não Ativada</p>
            <p>Ao trocar de fluxo, você irá visualizar o fluxo escolhido, no entanto, essa mudança não ativará o fluxo imediatamente. Para ativar o fluxo, vá para 'Ações' e selecione 'Publicar'. Isso garantirá que o fluxo <i><u>{flow.name}</u></i> seja publicado em produção.</p>
        </>;
        setModal({ title: title, content: content, action: (() => onFlowChange(flow)) });
        handleShow();
    }


    const deleteConfirmation = () => {
        const title = "Deletar fluxo?"
        const content = <>
            <p>Você tem certeza que deseja deletar esse fluxo?</p>
        </>;

        setModal({ title: title, content: content, action: (() => onDeleteFlow()) });
        handleShow();
    }

    const removeItemListBtn = (itemToRemove) => {
        setListSystemVars((prevList) => {
            const updatedList = prevList.filter((item) => item.name !== itemToRemove.name);
            return updatedList;
        });
    }

    return (
        <Navbar expand="lg" className='px-3 py-0'>
            <Navbar.Brand className='me-4 cursor-pointer'>
                <img
                    alt=""
                    src="/assets/react.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top me-1 me-2" />
                Gerador de fluxos
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '200px' }}
                >
                    <NavDropdown title="Ações" id="actionsDropdown">
                        <NavDropdown.Item onClick={showNewFlow}>Novo</NavDropdown.Item>
                        <NavDropdown.Item onClick={onSave}>Salvar</NavDropdown.Item>
                        <NavDropdown.Item onClick={onSaveSketch}>Salvar Rascunho</NavDropdown.Item>
                        {/* <NavDropdown.Item onClick={deleteConfirmation}>Deletar Fluxo</NavDropdown.Item> */}
                        {/* <NavDropdown.Item >Restaurar</NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Fluxos" id="flowsDropdown">
                        <Dropdown.Header>Seus fluxos</Dropdown.Header>
                        <div style={flowList.length > 10 ? { maxHeight: '250px', overflowY: 'scroll' } : {}}>
                            {(flowList && flowList != []) && (
                                flowList.map((flow) => (
                                    <Dropdown.Item key={flow.id} onClick={() => onClickFlow(flow)}>
                                        {flow.name} - {flow.version}
                                        {flow.is_active ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill ms-2 text-success" viewBox="0 0 16 16">
                                                <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                            </svg>
                                        ) : (
                                            null
                                        )}
                                    </Dropdown.Item>
                                ))
                            )}
                        </div>
                        {(flowList && flowList.length === 0) && (
                            <NavDropdown.ItemText className='text-nowrap'>
                                Não há fluxos cadastrados!
                            </NavDropdown.ItemText>
                        )}

                        {/* <NavDropdown.Divider></NavDropdown.Divider> */}
                        {/* <Dropdown.Header>Outros fluxos</Dropdown.Header>
                        <NavDropdown.Item>
                            Exemplo 1
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            Exemplo 2
                        </NavDropdown.Item> */}
                    </NavDropdown>
                    <NavDropdown title="Layout" id="layoutDropdown">
                        <NavDropdown.Item onClick={onLayout1} >
                            Layout 1
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={onLayout2}>
                            Layout 2
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Novo Bloco" id="newBlockDropdown">
                        <NavDropdown.Item onClick={() => onAdd({ nodeTypes: 'systemMessageNode', action: 'sendMessage' })}>
                            Mensagem do Sistema
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => onAdd({ nodeTypes: 'userMessageNode', action: '' })}>
                            Mensagem do Usuário
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => onAdd({ nodeTypes: 'decisionNode' })}>
                            Bloco de Decisão
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => onAdd({ nodeTypes: 'actionNode', action: '' })}>
                            Ação
                        </NavDropdown.Item>
                    </NavDropdown>


                </Nav>

            </Navbar.Collapse>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modal.content}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button variant="primary" onClick={modal.action}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Offcanvas className="w-25" show={offcanvaState} onHide={offcanvaClose} placement="end" backdrop="static" keyboard={false}>
                <Offcanvas.Header closeButton>
                    <div className='d-flex flex-column'>
                        <div className='col-12'>
                            <Offcanvas.Title>{offcanva.title}</Offcanvas.Title>
                        </div>
                        <div className='col-12'>
                            <Form.Text>Aqui você pode declarar variáveis globais que serão utilizadas a qualquer momento do fluxo.</Form.Text>
                        </div>
                    </div>
                </Offcanvas.Header>

                <Offcanvas.Body className='d-flex flex-column'>
                    <Form id="systemVars" className='col-12 flex-fill flex-grow-1'>
                        <ListGroup>
                            {listSystemVars && listSystemVars.map((item, index) => (
                                <ListGroup.Item variant="light" key={item.name} className="d-flex flex-row">
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome"
                                        id="idListBtn"
                                        defaultValue={item.name}
                                        readOnly
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor"
                                        id="valueListBtn"
                                        defaultValue={item.value}
                                        readOnly
                                    />
                                    <InputGroup.Text className="btn"
                                        onClick={() => removeItemListBtn(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                        </svg>
                                    </InputGroup.Text>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item variant="light" className="d-flex flex-row">
                                <Form.Control
                                    type="text"
                                    id="inputVarId"
                                    value={inputVarId}
                                    onChange={(e) => setIdSystemVars(e.target.value)}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Valor"
                                    id="valueList"
                                    value={inputVarValue}
                                    onChange={(e) => setValueSystemVars(e.target.value)}
                                />
                                <InputGroup.Text className="btn"
                                    onClick={() => { alert("not implemented") }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>
                                </InputGroup.Text>
                            </ListGroup.Item>
                        </ListGroup>
                    </Form>
                    <div className="d-grid gap-2">
                        <Button variant="primary" onClick={() => { alert('not implemented') }}>
                            Salvar
                        </Button>
                    </div>
                </Offcanvas.Body>

            </Offcanvas>

        </Navbar >

    );
}

export default NavbarActions;