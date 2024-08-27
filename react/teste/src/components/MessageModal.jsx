import React, { useState } from 'react';
import { Modal, Form, Button, ListGroup, Accordion, InputGroup } from 'react-bootstrap';

const MessageModal = ({
    selectedNode,
    editedNodeName,
    addItemLIstBtn,
    setEditedNodeName,
    checkParamType,
    setCheckParamType,
    editedNodeMsg,
    setEditedNodeMsg,
    sectionsList,
    titleBodyList,
    setTitleBodyList,
    titleShowList,
    setTitleShowList,
    removeItemListCustom,
    idRowList,
    setIdRowList,
    titleRowList,
    setTitleRowList,
    descriptionRowList,
    setDescriptionRowList,
    addItemListRow,
    titleSection,
    setTitleSection,
    addItemLIstSection,
    listBtnCustom,
    titleListBtn,
    setTitleListBtn,
    inputIdListBtn,
    setInputIdListBtn,
    inputValueListBtn,
    setInputValueListBtn,
    removeItemListBtn,
    hasVariable,
    setHasVariable,
    inputValueVariable,
    setInputValueVariable,
    handleCloseModal,
    editNode,
    removeRowListCustom
}) => {
    return (
        <Modal show={selectedNode !== null} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedNode.data.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="nodeAlter">
                    <Form.Group className="mb-3" controlId="nodeAlter.data.label">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Redefinir nome do elemento"
                            value={editedNodeName}
                            onChange={(e) => setEditedNodeName(e.target.value)} />
                    </Form.Group>
                    {selectedNode.type == 'systemMessageNode' && (
                        <Form.Group className="mb-3" controlId="nodeAlter.data.action">
                            <Form.Label>Selecione um tipo:</Form.Label>
                            <Form.Check
                                inline
                                type="radio"
                                label="Texto"
                                name="inlineRadioOptions"
                                id="textType"
                                checked={checkParamType === 'textType'}
                                onChange={(e) => setCheckParamType(e.target.id)}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Lista"
                                name="inlineRadioOptions"
                                id="listType"
                                checked={checkParamType === 'listType'}
                                onChange={(e) => setCheckParamType(e.target.id)}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="Lista de botões"
                                name="inlineRadioOptions"
                                id="listBtnType"
                                checked={checkParamType === 'listBtnType'}
                                onChange={(e) => setCheckParamType(e.target.id)}
                            />
                        </Form.Group>
                    )}
                    {checkParamType == 'textType' && (
                        <Form.Group className="mb-3" controlId="nodeAlter.data">
                            <Form.Label>Mensagem:</Form.Label>
                            <Form.Control
                                placeholder="Definir uma mensagem"
                                value={editedNodeMsg}
                                as="textarea" rows={2}
                                onChange={(e) => setEditedNodeMsg(e.target.value)} />
                        </Form.Group>
                    )}

                    {(checkParamType == 'listType' && sectionsList != null) && (
                        <Form.Group className="mb-3">
                            <Form.Label>Título:</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="text"
                                placeholder="Defina o título da lista"
                                value={titleBodyList}
                                onChange={(e) => setTitleBodyList(e.target.value)} />

                            <Form.Label>Título do botão:</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="text"
                                placeholder="Defina o título do botão"
                                value={titleShowList}
                                maxLength={20}
                                onChange={(e) => setTitleShowList(e.target.value)} />

                            <Form.Label>Seções:</Form.Label>
                            <ListGroup className='mb-3'>

                                {(sectionsList.length > 0 && sectionsList != null) && (
                                    <>
                                        {sectionsList.map((item, index) => {
                                            return (
                                                <Accordion key={item.id} defaultActiveKey="0">
                                                    <Accordion.Item eventKey={index.toString()}>
                                                        <React.Fragment key={index}>
                                                            <Accordion.Header>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Título"
                                                                    id="titleSectionAccordion"
                                                                    readOnly
                                                                    defaultValue={item.title}
                                                                />
                                                                <InputGroup.Text className="btn mx-3" onClick={() => removeItemListCustom(item)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                                    </svg>
                                                                </InputGroup.Text>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                {item.rows.map((value, rowIndex) => (
                                                                    <ListGroup.Item key={value.id} className="d-flex flex-row">
                                                                        <div className='container'>
                                                                            <div className="d-flex flex-row">
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder="Id"
                                                                                    id={`id_${index}_${rowIndex}`}
                                                                                    defaultValue={value.id}
                                                                                    readOnly
                                                                                />
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder="Título"
                                                                                    id={`title_${index}_${rowIndex}`}
                                                                                    defaultValue={value.title}
                                                                                    readOnly
                                                                                />
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    placeholder="Descrição"
                                                                                    id={`section_${index}_${rowIndex}`}
                                                                                    defaultValue={value.description}
                                                                                    readOnly
                                                                                />
                                                                                <InputGroup.Text className="btn" onClick={() => removeRowListCustom(item, value)}>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                                                    </svg>
                                                                                </InputGroup.Text>
                                                                            </div>
                                                                        </div>
                                                                    </ListGroup.Item>
                                                                ))}
                                                                <ListGroup.Item className="d-flex flex-row">
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="ID - Único"
                                                                        id="rowId"
                                                                        value={idRowList}
                                                                        onChange={(e) => { setIdRowList(e.target.value) }}
                                                                    />
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Título"
                                                                        id="rowTitle"
                                                                        value={titleRowList}
                                                                        onChange={(e) => { setTitleRowList(e.target.value) }}
                                                                    />
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder="Descrição"
                                                                        id="rowDescription"
                                                                        value={descriptionRowList}
                                                                        onChange={(e) => { setDescriptionRowList(e.target.value) }}
                                                                    />
                                                                    <InputGroup.Text className="btn" onClick={() => addItemListRow(index)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                                                        </svg>
                                                                    </InputGroup.Text>
                                                                </ListGroup.Item>
                                                            </Accordion.Body>
                                                        </React.Fragment>
                                                    </Accordion.Item>
                                                </Accordion>
                                            )
                                        })}
                                    </>
                                )}

                            </ListGroup>

                            <ListGroup>
                                <ListGroup.Item className="d-flex flex-row">
                                    <Form.Control
                                        type="text"
                                        placeholder="Criar Sessão"
                                        id="titleSectionList"
                                        value={titleSection}
                                        onChange={(e) => setTitleSection(e.target.value)}
                                    />
                                    <InputGroup.Text className="btn"
                                        onClick={addItemLIstSection}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                    </InputGroup.Text>
                                </ListGroup.Item>
                            </ListGroup>

                        </Form.Group>
                    )}

                    {(checkParamType == 'listBtnType' && listBtnCustom != null) && (
                        <Form.Group className="mb-3">

                            <Form.Label>Título da lista:</Form.Label>
                            <Form.Control
                                className='mb-3'
                                type="text"
                                placeholder="Defina o título da lista"
                                value={titleListBtn}
                                onChange={(e) => setTitleListBtn(e.target.value)} />

                            <Form.Label>Lista de botões:</Form.Label>

                            <ListGroup>
                                {listBtnCustom.map((item, index) => (
                                    <ListGroup.Item key={item.id} className="d-flex flex-row">
                                        <Form.Control
                                            type="text"
                                            placeholder="Id"
                                            id="idListBtn"
                                            defaultValue={item.id}
                                            readOnly
                                        />
                                        <Form.Control
                                            type="text"
                                            placeholder="Valor"
                                            id="valueListBtn"
                                            defaultValue={item.title}
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
                                <ListGroup.Item className="d-flex flex-row">
                                    <Form.Control
                                        type="text"
                                        placeholder="ID - Único"
                                        id="iDListBtn"
                                        value={inputIdListBtn}
                                        onChange={(e) => setInputIdListBtn(e.target.value)}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Valor"
                                        id="valueList"
                                        value={inputValueListBtn}
                                        onChange={(e) => setInputValueListBtn(e.target.value)}
                                    />
                                    <InputGroup.Text className="btn"
                                        onClick={addItemLIstBtn}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                        </svg>
                                    </InputGroup.Text>
                                </ListGroup.Item>
                            </ListGroup>
                        </Form.Group>
                    )}

                    {selectedNode.type == 'userMessageNode' && (
                        <Form.Group className="mb-3" controlId="nodeAlter.data.action">
                            <Form.Check
                                type="switch"
                                label="Definir variável"
                                id="variableType"
                                checked={hasVariable}
                                onChange={(e) => setHasVariable(e.target.checked)}
                            />

                            {hasVariable == true && (
                                <>
                                    <Form.Label>Variável</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Definir variável"
                                        value={inputValueVariable}
                                        onChange={(e) => setInputValueVariable(e.target.value)} />
                                </>
                            )}
                        </Form.Group>
                    )}

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={editNode}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MessageModal;
