import { useState, useEffect } from "react";
import { Handle, Position, getConnectedEdges, useReactFlow, useUpdateNodeInternals } from "reactflow";
import { ListGroup, Modal, Button, Form, Alert } from "react-bootstrap";
import ConditionBlock from "../decisionNode/ConditionBlock";
import Select from 'react-select';

function ActionNodeModal({ selectedNode, handleCloseModal }) {
    const rf = useReactFlow();
    let nameInitial = selectedNode.data.label;
    const [node, setNode] = useState(selectedNode);
    const [hasMultiple, setHasMultiple] = useState(null);
    const [listActions, setActionsList] = useState([]);
    const [filteredListActions, setFilteredListActions] = useState([]);
    const [editedNodeName, setEditedNodeName] = useState(nameInitial);
    const [selectedAction, setSelectedAction] = useState([]);
    const updateNodeInternals = useUpdateNodeInternals();
    const [inputValueVariable, setInputValueVariable] = useState('');
    const [hasVariable, setHasVariable] = useState(false);
    const [storeResult, setStoreResult] = useState(false);
    const [hasMsgText, setHasMsgText] = useState(false);
    const [hasAlert, setHasAlert] = useState(false);
    const [editedNodeMsg, setEditedNodeMsg] = useState('');
    const [checkParamType, setCheckParamType] = useState('');
    const [flowVariable, setFlowVariable] = useState([]);
    const [selectedFlowVariable, setSelectedFlowVariable] = useState("");
    const [hasCustomVariable, setHasCustomVariable] = useState(false);
    const [listActionVariable, setListActionVariable] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    const nodes = rf.getNodes();
    const edges = rf.getEdges();
    const connectedEdges = getConnectedEdges(nodes, edges);

    useEffect(() => {
        getAvailableActions();
    }, []);

    useEffect(() => {
        if (node) {
            const action = node.data.action;
            setEditedNodeName(node.data.label);
            setInputValueVariable(action.variable.value)
            setStoreResult(action.variable.storeResult)
            setEditedNodeMsg(action.params.msg);
            setCheckParamType(action.params.type);
            setSelectedFlowVariable(node.data.action.flowVariable);
            fillListVariable();
            if (node.type !== "decisionNode") {
                setHasMultipleLinks(null);
            }
        }
    }, [node]);

    useEffect(() => {
        if (selectedAction) {
            const action = node.data.action
            checkOptionInitial(selectedAction);
            const selectedOption = listActions.find((item) => item.action === action.action);

            if (!action.actionParams) {
                const updatedNode = {
                    ...node,
                    data: {
                        ...node.data,
                        action: {
                            ...selectedNode.data.action,
                            actionParams: listActionVariable,
                        }
                    }
                };
                setNode(updatedNode);
            }

            if (selectedOption) {
                setSelectedAction(selectedOption);
                setListActionVariable(node.data.action.actionParams ?? []);
            }
        }
    }, [listActions]);

    const fillListVariable = () => {
        let variables = [];
        nodes.forEach((node) => {
            if (node.data.action.variable) {
                if (node.data.action.variable.hasVariable) {
                    variables.push(node.data.action.variable.value);
                }
            }
        });
        setFlowVariable(variables);
    }

    const groupBy = (array, key) => {
        return array.reduce((result, item) => {
            const group = item[key] || 'Others';
            result[group] = result[group] || [];
            result[group].push(item);
            return result;
        }, {});
    };
    const sortGroupsAlphabetically = (groupedData) => {
        const sortedGroups = Object.keys(groupedData).sort((a, b) => {
            if (a === 'Others') return 1; // 'Others' goes last
            if (b === 'Others') return -1; // 'Others' goes last
            return a.localeCompare(b);
        });

        return sortedGroups.reduce((sorted, key) => {
            sorted[key] = groupedData[key];
            return sorted;
        }, {});
    };
    const sortItemsAlphabetically = (groupedData) => {
        for (const group in groupedData) {
            groupedData[group] = groupedData[group].sort((a, b) =>
                a.actionName.localeCompare(b.actionName)
            );
        }
        return groupedData;
    };
    const fillListAction = (data) => {
        setActionsList(data);
        setFilteredListActions(data.filter((item) => item.actionName !== ""));
        // setHasMultiple(selectedAction);
    };

    const Checkbox = ({ children, ...props }) => (
        <label style={{ marginRight: '1em' }}>
            <input type="checkbox" {...props} />
            {children}
        </label>
    );
    const GroupLabel = (props) => (
        <div style={{ fontWeight: 'bold' }}>{props.label}</div>
    );

    const OptionGroup = (props) => (
        <components.OptionGroup {...props}>
            <GroupLabel {...props} />
            {props.children}
        </components.OptionGroup>
    );

    let groupedActions = groupBy(filteredListActions, 'group');

    // Sort groups alphabetically
    groupedActions = sortGroupsAlphabetically(groupedActions);

    // Sort items within each group alphabetically
    groupedActions = sortItemsAlphabetically(groupedActions);

    const handleSelectActionChange = (event) => {
        const selectedOption = listActions.find((item) => item.action === event.action);
        if (selectedOption) {
            if (selectedOption.useCustomVariable) {
                setHasCustomVariable(true);
            } else {
                setHasCustomVariable(false);
            }

            setSelectedAction(selectedOption || []);
            checkOptionInitial(selectedOption);

            if (node.type === "decisionNode") {
                setHasMultipleLinks(selectedOption);
            } else {
                setHasMultipleLinks(null);
            }
            if (selectedOption.customVariables == 0) {
                setListActionVariable([]);
            }
        }
    };


    const getAvailableActions = async () => {
        try {
            const response = await fetch(`${url_base}/plugins/messengerintegrator/ajax/index.php?action=getAvailableActions`);
            if (!response.ok) {
                console.log('erro');
            }
            const data = await response.json();
            if (data.response) {
                fillListAction(data.response);
            }
        } catch (error) {
            console.error('Erro na requisição:', error.message);
        }
    }

    useEffect(() => {
        if (node.type === "decisionNode") {
            setHasMultipleLinks(selectedAction);
        }
    }, [listActions]);

    useEffect(() => {
        setSelectedValue(selectedAction);
        if (node && node.type === "decisionNode") {
            setHasMultiple(true);
        }
    }, [selectedAction]);


    const editClick = () => {
        editNode(node);
    };

    const editNode = (node) => {
        const updatedNode = {
            ...node,
            data: {
                ...node.data,
                label: editedNodeName,
                action: {
                    ...selectedNode.data.action,
                    action: selectedAction.action,
                    actionName: selectedAction.actionName,
                    actionParams: listActionVariable,
                    flowVariable: selectedFlowVariable,
                    variable:
                    {
                        hasVariable: storeResult,
                        storeResult: storeResult,
                        value: storeResult ? inputValueVariable : ""
                    },
                    params: {
                        ...selectedNode.data.action.params,
                        type: checkParamType,
                        msg: checkParamType === "textType" ? editedNodeMsg : "",
                    }
                }
            }
        };

        const updatedNodes = nodes.map((node) =>
            node.id === selectedNode.id ? updatedNode : node
        );

        rf.setNodes(updatedNodes);
        updateNodeInternals(updatedNode.id);
        handleCloseModal();
        console.log(updatedNode);
    };

    const setHasMultipleLinks = (action) => {
        if (action != null) {
            if (action.hasOwnProperty("hasMultiple")) {
                setHasMultiple(action.hasMultiple);
            } else {
                const matchingObject = listActions.find(obj => obj.action === action.action) ?? null;
                if (matchingObject && matchingObject.hasOwnProperty("hasMultiple")) {
                    setHasMultiple(matchingObject.hasMultiple);
                }
            }
        }
    }

    const checkOptionInitial = (option) => {
        if (option) {
            let hasCustomVariableProperty = "useCustomVariable" in option;
            if (hasCustomVariableProperty) {
                if (option.useCustomVariable) {
                    setHasCustomVariable(true);
                }
            } else {
                let filtered = listActions.filter((item) => {
                    return item.action === option.action;
                })

                for (let filteredItem of filtered) {
                    if (filteredItem.useCustomVariable) {
                        setHasCustomVariable(true);
                    }
                }
            }

            option.action === "setVariable" ? setHasVariable(true) : setHasVariable(false);
            setHasAlert(option.action === "getEntities"
                || option.action === "getGroups"
                || option.action === "getItilCategories");

            //alguns actions vão precisar ser removidos, por não fazer sentido...
            if (option.action === 'sendMessage'
                || option.action === 'sendAndWaitUser'
                || option.action === 'sendWhatsappMessage'
                || option.action === 'sendMessageForChat') {
                setHasMsgText(true);
                setCheckParamType('textType');
            } else {
                setHasMsgText(false);
                setCheckParamType('');
            }

        } else {
            setHasVariable(false);
            setHasMsgText(false);
            setCheckParamType('');
            setHasAlert(false);
        }
    }

    const updateCondition = (node) => {
        setNode(node)
        updateNodeInternals(node.id);
    }

    const actionVariables = (value, item) => {
        const existingVariableIndex = listActionVariable.findIndex(variable => variable.name === item);

        if (existingVariableIndex !== -1) {
            setListActionVariable(prevList => {
                const newList = [...prevList];
                newList[existingVariableIndex] = { name: item, value: value };
                return newList;
            });
        } else {
            setListActionVariable(prevList => [
                ...prevList,
                { name: item, value: value }
            ]);
        }
    }

    return (
        <Modal show={node !== null} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{node.data.label}</Modal.Title>
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
                    <Form.Group className="mb-3" controlId="nodeAlter.data.action">
                        <Form.Label>Selecione uma ação</Form.Label>
                        <Select
                            defaultValue={selectedValue}
                            value={selectedAction}
                            onChange={handleSelectActionChange}
                            className="basic-single"
                            classNamePrefix="select"
                            isSearchable={true}
                            name="actions"
                            isLoading={filteredListActions && filteredListActions.length == 0}
                            components={{
                                OptionGroup,
                            }}
                            options={Object.entries(groupedActions).map(([label, options]) => ({
                                label,
                                options,
                            }))}
                            getOptionValue={(option) => option.action}
                            getOptionLabel={(option) => option.actionName}
                        />

                        <div
                            style={{
                                color: 'hsl(0, 0%, 40%)',
                                display: 'inline-block',
                                fontSize: 12,
                                fontStyle: 'italic',
                                marginTop: '1em',
                            }}
                        >

                        </div>

                    </Form.Group>

                    {/*storeResult*/}
                    {(node.type == 'actionNode') &&
                        <Form.Group className="mb-3" controlId="nodeAlter.data.label">
                            <Form.Check
                                type="switch"
                                label="Salvar retorno de uma ação"
                                id="variableType"
                                checked={storeResult}
                                onChange={(e) => setStoreResult(e.target.checked)}
                            />
                            {storeResult == true && (
                                <>
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do retorno de uma ação"
                                        value={inputValueVariable}
                                        onChange={(e) => setInputValueVariable(e.target.value)} />
                                </>
                            )}
                        </Form.Group>
                    }

                    {(selectedAction.action && node.data.action.actionParams) && (
                        <>
                            <ListGroup className="mb-3">
                                {(selectedAction.customVariables.length > 0) && (
                                    selectedAction.customVariables.map((item) => {
                                        const matchingParam = node.data.action.actionParams.find(param => param.name === item);
                                        return <ListGroup.Item key={item} className="d-flex flex-row">
                                            <Form.Control
                                                type="text"
                                                placeholder="Chave"
                                                id={`keyValue-${item}`}
                                                defaultValue={item}
                                                readOnly
                                            />
                                            <Form.Control
                                                type="text"
                                                placeholder="Variável"
                                                id="variableValueAction"
                                                defaultValue={matchingParam ? matchingParam.value : ""}
                                                onChange={(e) => { actionVariables(e.target.value, item) }}
                                            />
                                        </ListGroup.Item>
                                    })
                                )}
                            </ListGroup>
                        </>
                    )}
                    {/*hasMultiple*/}
                    {(hasMultiple) && (
                        <ConditionBlock selectedNode={node} onChangeNode={updateCondition} />
                    )}

                    {/*sendMessage*/}
                    {hasMsgText == true && (
                        <Form.Group className="mb-3" controlId="nodeAlter.data">
                            <Form.Label>Mensagem:</Form.Label>
                            <Form.Control
                                placeholder="Definir uma mensagem"
                                value={editedNodeMsg}
                                as="textarea" rows={3}
                                onChange={(e) => setEditedNodeMsg(e.target.value)} />
                        </Form.Group>
                    )}

                    {/*hasAlert*/}
                    {hasAlert == true && (
                        <Form.Group className="mb-3" controlId="nodeAlter.data">
                            <Alert variant="info">
                                <Alert.Heading>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill mx-1" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                    </svg>
                                    Uma mensagem será enviada de acordo com a ação escolhida.
                                </Alert.Heading>
                            </Alert>
                        </Form.Group>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={editClick}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default ActionNodeModal;
