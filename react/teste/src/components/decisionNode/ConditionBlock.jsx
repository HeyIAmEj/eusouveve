import { useState, useEffect, useRef } from "react";
import { Handle, Position, getConnectedEdges, useReactFlow, useUpdateNodeInternals, getOutgoers } from "reactflow";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

function ConditionBlock({ selectedNode, onHandleCloseModal, onChangeNode }) {
    const rf = useReactFlow();
    let nameInitial = selectedNode.data.label;

    const node = rf.getNode(selectedNode.id);
    const listGroupRef = useRef(null);

    const [formControls, setFormControls] = useState(node.data.links ?? []);


    const removeItemListCustom = (itemToRemove) => {
        setFormControls((prevLinks) =>
            prevLinks.filter((item) => item !== itemToRemove)
        );
    }

    const handleInputChange = (item, newValue) => {
        setFormControls(prevState => {
            item.condition = newValue;
            return prevState;
        });
        onChangeNode(node);
    };

    const getNodeName = (item) => {
        let label = "Sem descrição";
        const nodeFind = rf.getNode(item.target);
        if (nodeFind) {
            label = nodeFind.data.label;
            label = label !== "" ? label : "Sem descrição"
        }
        return label;
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label>Condições</Form.Label>
            <ListGroup ref={listGroupRef}>
                <ListGroup.Item className="d-flex flex-row">
                    <div className="col-sm-5">Destino</div>
                    <div className="col-sm-7">Condição</div>
                    {/* <div className="col-sm-2"></div> */}
                </ListGroup.Item>
                {formControls.map((item, index) => (
                    // Verifica se item.source é diferente de node.id
                    item.source === node.id && (
                        <ListGroup.Item key={index} className="d-flex flex-row">
                            <Form.Label column sm="5">
                                <a href="#">{getNodeName(item)}</a>
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    plaintext
                                    placeholder="Valor da condição"
                                    key={item.id}
                                    defaultValue={item.condition}
                                    onChange={(e) => handleInputChange(item, e.target.value)}
                                />
                            </Col>
                        </ListGroup.Item>
                    )
                ))}
            </ListGroup>
        </Form.Group >
    );
}

export default ConditionBlock;
