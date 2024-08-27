import React from 'react';
import { useStore } from 'reactflow';
import '../App.css';


export default ({ fromX, fromY, toX, toY }) => {
    const { connectionHandleId } = useStore();

    return (
        <g>
            <path
                fill="none"
                stroke={connectionHandleId}
                strokeWidth={1.5}
                className="connectionLine_animated"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                className="connectionLine"
                stroke={connectionHandleId}
                strokeWidth={1.5}
            />
        </g>
    );
};