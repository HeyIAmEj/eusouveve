import React, { useCallback, useEffect, FC } from 'react';
import EdgeMarker, { getBezierPath, BaseEdge, useStore, MarkerType, applyEdgeChanges, useUpdateNodeInternals, updateEdge, useEdges } from 'reactflow';
import {
    getMarkerEnd,
    EdgeLabelRenderer,
    useReactFlow
} from 'reactflow';



function EdgeLabel({ transform, label, onEditClick, onRemoveClick }) {

    const handleEditClick = () => {
        console.log('Edit button clicked!');
        onEditClick();
    };

    const handleRemoveClick = () => {
        console.log('Remove button clicked!');
        onRemoveClick();
    };


    return (
        <div
            style={{
                position: 'absolute',
                background: 'transparent',
                padding: 10,
                color: '#ff5050',
                fontSize: 12,
                fontWeight: 700,
                transform,
            }}
            className="nodrag nopan"
        >
            <div className="btn-group" role="group">
                <button type="button" className="btn px-2" onClick={handleRemoveClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                    <span className="visually-hidden">Remover</span>
                </button>
                <button type="button" className="btn text-info px-2" onClick={handleRemoveClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                    <span className="visually-hidden">Editar</span>
                </button>
            </div>

        </div>

    );
}

const ArrowEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerStart,
    markerEnd,
}) => {

    const edges = useEdges();
    const { setEdges } = useReactFlow();
    const updateNodeInternals = useUpdateNodeInternals();


    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const centerX = (sourceX + targetX) / 2;
    const centerY = (sourceY + targetY) / 2;

    const onRemoveClick = (evt) => {
        console.log("Removing " + id);
        let edge = (edges) => edges.filter((edge) => edge.id !== id)
        setEdges(edge);
        updateNodeInternals(node.id);
    };

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                markerStart={markerStart}
            />
            <foreignObject
                width={150}
                height={50}
                x={centerX}
                y={centerY}
                className="edgebutton-foreignobject"
            >
                <EdgeLabel
                    onRemoveClick={(event) => onRemoveClick(event)}
                />
            </foreignObject>
        </>

    );
}

export default ArrowEdge;