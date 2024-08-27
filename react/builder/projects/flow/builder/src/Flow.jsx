import { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NavbarActions from './components/NavbarActions';


const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
];

const initialEdges = [];

function Flow() {
    const id = useState(1);
    const nameFlow = "Gerador de fluxos"
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    const onSave = () => { alert('Salvando...') };
    const onAdd = () => { alert('Adicionando...') };
    const onSaveSketch = () => { alert('Salvando rascunho...') };
    const onLayout1 = () => { alert('Trocando para layout 1...') };
    const onLayout2 = () => { alert('Trocando para layout 2...') };
    const onFlowChange = () => { alert('Mudando layout...') };
    const onDeleteFlow = () => { alert('Deletando fluxo...') };
    const showNewFlow = () => { alert('Novo fluxo...') };

    return (
        <>
            <NavbarActions
                flowId={id}
                flowName={nameFlow}
                onSave={onSave}
                onAdd={onAdd}
                onSaveSketch={onSaveSketch}
                onLayout1={onLayout1}
                onLayout2={onLayout2}
                onFlowChange={onFlowChange}
                onDeleteFlow={onDeleteFlow}
                showNewFlow={showNewFlow}
            />
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </ >
    );
}

export default Flow;
