import React from 'react';

import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const NewFlowModal = ({
    NewFlowModal,
    handleCloseNewFlowModal,
    onFlowNameChange,
    saveNewFlow
}) => {
    return (
        <>
            <Modal show={NewFlowModal} onHide={handleCloseNewFlowModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Criar novo fluxo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="nameFlow">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome do fluxo"
                                onChange={onFlowNameChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseNewFlowModal}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={saveNewFlow}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default NewFlowModal;
