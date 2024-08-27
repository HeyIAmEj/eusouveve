import React, { useState, useRef, useEffect, useCallback } from "react";
import { Handle, useEdges, isEdge, getOutgoers, getConnectedEdges, Position, useEdgesState, useNodes, useStore, useReactFlow, handleParentExpand, addEdge, updateEdge, useUpdateNodeInternals, useNodesState, applyNodeChanges, getIncomers } from "reactflow";

function DecisionNode(props) {
  const rf = useReactFlow();
  const node = rf.getNode(props.id);

  const [edgeCount, incrEdge] = React.useState(0);
  const updateNodeInternals = useUpdateNodeInternals();

  const edges = useStore((s) => {
    const t = rf.getEdges()
    const edgs = t.filter((e) => e.source === props.id);
    if (edgs.length !== edgeCount) {
      incrEdge(() => {
        node.data.links = edgs;
        updateNodeInternals(props.id);
        return edgs.length;
      });
    }
    return edgs;
  });

  const nid = `in-${edges.length + 1}`;

  const listWithSourceOnly = (edges) => {
    return edges.filter((edge) => edge.source === node.id);
  }

  const listWithTargetOnly = (edges) => {
    return edges.filter((edge) => edge.target === node.id);
  }

  const updateEdgesSpacing = (nodeWidth, edges) => {
    let width = nodeWidth;
    let nodeHandles = listWithSourceOnly(edges);
    let targetHandles = listWithTargetOnly(edges);

    let tamanhoArray = nodeHandles.length;
    if (tamanhoArray === 0) {
      return [];
    }

    let espacoEntreElementos = width / tamanhoArray;
    let pontoInicial = (width - espacoEntreElementos * (tamanhoArray)) / 2;
    let elementosCentralizados = nodeHandles.map((item, index) => ({
      ...item,
      position: {
        ...item.position,
        x: (pontoInicial + index * espacoEntreElementos - 5) + `px`, // Adicionei esse 5 porque aparentemente não fica centralizado, talvez devido ao tamanho do ponto então tiro um offset de width do ponto.
        y: `100%`
      },
    }));

    if (elementosCentralizados && elementosCentralizados.length > 0) {
      elementosCentralizados.push(targetHandles);
    } else {
      elementosCentralizados = [targetHandles];
    }
    return elementosCentralizados;
  };

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
    <div className="userMessageNode row border bg-white col-2 text-truncate">
      <div className='col-12 border-bottom py-1 bg-warning'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-diagram-3 pe-2" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
        </svg>
        <span>Bloco de Decisão</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill float-end cursor-pointer" onClick={removeNode} viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </div>
      <div className='col-12 py-1 bg-light'>
        <div className='text-body'>{node.data.label}</div>
      </div>
      <div>
        {edges.map((edge, i) => (
          <Handle
            id={edge.sourceHandle}
            key={edge.id + edge.sourceHandle}
            type="source"
            position={Position.Bottom}
            style={{ top: "100%", left: i * 20, background: "#555" }}
            isConnectable={false}
          />
        ))}
        <Handle
          id={nid}
          key={nid}
          type="source"
          position={Position.Bottom}
          style={{ top: "100%", left: edges.length * 20, background: "#555" }}
          isConnectable={true}
        />
        <Handle
          type="target"
          position={Position.Top}
          id="input"
          style={{ top: "-5px", background: "#555" }}
          isConnectable={true}
        />
      </div>

    </div>
  );
}

export default DecisionNode;
