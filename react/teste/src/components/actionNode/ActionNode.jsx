import React from 'react';
import { Handle, Position, MarkerType, useReactFlow, getConnectedEdges, useUpdateNodeInternals } from 'reactflow';
import './ActionNode.css';

function ActionNode(props) {
    const rf = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();
    props.data.isDeletable = true;
    updateNodeInternals(props.id);
    const node = rf.getNode(props.id);
    const data = props.data;
    const nodeType = data.nodeType ?? "both";

    const inputHandles = (nodeType === 'input' || nodeType === 'both') ?
        [{ type: "target", position: Position.Top, id: "input", isConnectable: data.isConnectable }]
        : [];

    const outputHandles = (nodeType === 'output' || nodeType === 'both') ?
        [
            { type: "source", position: Position.Bottom, id: "output", isConnectable: data.isConnectable },
        ]
        : [];
    const removeNode = (() => {
        const nodes = rf.getNodes();
        const newNodes = nodes.filter((n) => n.id !== props.id);
        const edges = rf.getEdges();
        const connectedEdges = getConnectedEdges([node], edges);
        const newEdges = edges.filter((edge) => !connectedEdges.some((ed) => ed.id === edge.id));
        rf.setEdges(newEdges);
        rf.setNodes(newNodes);
    });

    return (
        <div className="actionNode row border bg-white col-2">
            <div className='col-12 border-bottom py-1 bg-secondary'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layers pe-2" viewBox="0 0 16 16">
                    <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0zM8 9.433 1.562 6 8 2.567 14.438 6z" />
                </svg>
                <span>Ações</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill float-end cursor-pointer" onClick={removeNode} viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </div>
            <div className='col-12 py-1 bg-light'>
                <div className='text-body'>{data.label}</div>
            </div>
            <div className='col-12'>
                {inputHandles.map(handle => (
                    <Handle key={handle.id} {...handle} />
                ))}
                {outputHandles.map(handle => (
                    <Handle key={handle.id} {...handle} />
                ))}
            </div>
        </div>
    );
}

export default ActionNode;
