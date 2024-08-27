import React from 'react';
import { Handle, Position, MarkerType, useReactFlow, getConnectedEdges, useUpdateNodeInternals } from 'reactflow';
import './UserMessageNode.css';

function UserMessageNode(props) {
    const rf = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();
    props.data.isDeletable = true;
    updateNodeInternals(props.id);
    const node = rf.getNode(props.id);
    const data = props.data;
    const nodeType = data.nodeType ?? "both";

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
        <div className="userMessageNode row border bg-white col-2">
            <div className='col-12 border-bottom py-1 bg-info'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person pe-2" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                <span>Mensagem do Usuário</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill float-end cursor-pointer" onClick={removeNode} viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </div>
            <div className='col-12 py-1 bg-light'>
                <div className='text-body'>{data.label}</div>
            </div>
            <div className='col-12'>
                <Handle
                    key={`${props.id}_input`}
                    style={{ top: `-5px`, left: `50%`, background: "#555" }}
                    type="target"
                    position={Position.Top}
                />
                <Handle
                    key={`${props.id}_output`}
                    style={{ top: `100%`, left: `50%`, background: "#555" }}
                    type="source"
                    position={Position.Bottom}
                />
            </div>
        </div>
    );
}

export default UserMessageNode;
