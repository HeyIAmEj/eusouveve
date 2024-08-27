import React, { useCallback, useEffect, FC } from 'react';
import EdgeMarker, { useNodeId, useEdgesState, getBezierPath, BaseEdge, useStore, MarkerType, applyEdgeChanges, useUpdateNodeInternals, updateEdge, useEdges } from 'reactflow';
import {
    getMarkerEnd,
    EdgeLabelRenderer,
    useReactFlow
} from 'reactflow';

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
    source,
}) => {

    const rf = useReactFlow();
    const [edges, setEdges, onChangeEdge] = useEdgesState(rf.getEdges());

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const onRemoveClick = (evt) => {
        rf.setEdges((edges) => {
            return edges.filter((edge) => {
                const isDecision = 'isDecision' in edge;
                if (isDecision && edge.id === id) {
                    removeHandler(edge.id, edges, rf, source);
                    return false;
                }
                return edge.id !== id;
            });
        });
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
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <button type="button" className="btn px-2 text-danger" onClick={onRemoveClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                        <span className="visually-hidden">Remover</span>
                    </button>
                </div>
            </EdgeLabelRenderer>

        </>

    );
}

export default ArrowEdge;