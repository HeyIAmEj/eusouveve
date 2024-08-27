import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    onEdit,
    ...props
}) {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
    const node = getNode(id);
    const getTypeName = () => {
        if (node.type === "userMessageNode") return "Mensagem do usuário"
        else if (node.type === "systemMessageNode") return "Mensagem do sistema"
        else if (node.type === "decisionNode") return "Bloco de decisão"
        else if (node.type === "actionNode") return "Ações"
        return "Bloco"
    };
    const duplicateNode = useCallback(() => {
        const node = getNode(id);
        const randomNumber = Math.floor(Math.random() * (99999999 - 1111111 + 1)) + 1111111;

        node.id = `${node.id}-copy-${randomNumber}`;
        const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
        };

        addNodes({ ...node, id: `${node.id}-copy`, position });
    }, [id, getNode, addNodes]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);

    const editNode = useCallback((e) => {
        onEdit(e, node);
    }, [id, setNodes, setEdges]);

    return (
        <>
            {(node.type !== "startNode" && node.type !== "endNode") && (
                <div
                    style={{ top, left, right, bottom }
                    }
                    className="context-menu"
                    {...props}>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>{getTypeName()} - {node.data.label}</h5>
                            <div className='row'>
                                <div className='col-12 pb-2'>
                                    <button className='btn' onClick={editNode}>
                                        Editar
                                    </button>
                                </div><div className='col-12 pb-2'>
                                    <button className='btn' onClick={duplicateNode}>
                                        Duplicar
                                    </button>
                                </div>
                                <div className='col-12'>
                                    <button className='btn' onClick={deleteNode}>
                                        Apagar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            )}
        </>
    );
}
