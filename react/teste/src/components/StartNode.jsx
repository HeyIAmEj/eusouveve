import React from 'react';
import { Handle, Position, useReactFlow, useUpdateNodeInternals } from 'reactflow';

function StartNode(props) {
    const updateNodeInternals = useUpdateNodeInternals();
    props.data.isDeletable = false;
    updateNodeInternals(props.id);

    const circleStyle = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#D5E8D4',
        border: `1px solid #82B366`
    };
    return (
        <div style={circleStyle} className='d-flex'>
            <Handle id={props.id} type="source" position={Position.Bottom} />
            <span className='m-auto'>{props.data.label}</span>
        </div>
    );
}

export default StartNode;
