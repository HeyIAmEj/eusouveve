import React from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';

function EndNode(props) {
    const updateNodeInternals = useUpdateNodeInternals();
    props.data.isDeletable = false;
    updateNodeInternals(props.id);

    props.data.action = {
        "action": "finishSession",
        "actionName": "Finalizar",
        "variable": {
            "hasVariable": false,
            "value": ""
        },
        "params": {
            "msg": "",
            "btnMsg": "",
            "type": "",
            "btnList": [],
            "list": []
        }
    }

    const circleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#F8CECC',
        border: `1px solid #B85450`
    };
    return (
        <div style={circleStyle} className='d-flex'>
            <Handle type="target" position={Position.Top} />
            <span className='m-auto'>{props.data.label}</span>
        </div>
    );
}

export default EndNode;
