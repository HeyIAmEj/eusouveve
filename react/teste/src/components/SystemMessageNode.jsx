import { useEffect, useCallback } from 'react';
import { Handle, Position, addEdge, useEdgesState, useReactFlow, getConnectedEdges, useUpdateNodeInternals } from 'reactflow';
import './SystemMessageNode.css';


const randomNumber = () => {
    return Math.floor(Math.random() * (99999999 - 1111111 + 1)) + 1111111;
}

function SystemMessageNode(props) {
    const rf = useReactFlow();
    const [edges, setEdges] = useEdgesState(rf.getEdges);
    const data = props.data;
    const nodeType = data.nodeType ?? "both";
    const node = rf.getNode(props.id);
    const updateNodeInternals = useUpdateNodeInternals();
    props.data.isDeletable = true;
    updateNodeInternals(props.id);


    const inputHandles = (nodeType === 'input') ?
        [{ type: "target", position: Position.Top, id: `${node.id}_input`, isConnectable: data.isConnectable }]
        : [];

    const outputHandles = (nodeType === 'output') ?
        [
            { type: "source", position: Position.Bottom, id: `${node.id}_output_${randomNumber()}`, isConnectable: data.isConnectable },
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

    // ON MOUNT
    useEffect(() => {

    }, []);

    return (
        <div className="systemMessageNode row border bg-white col-12">
            <div className='col-12 border-bottom py-1 bg-success'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building pe-2" viewBox="0 0 16 16">
                    <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
                </svg>
                <span>Mensagem do Sistema</span>
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

        </div >

    );
}

export default SystemMessageNode;