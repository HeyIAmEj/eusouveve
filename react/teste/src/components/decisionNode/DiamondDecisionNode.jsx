import { Handle, Position } from "reactflow";

const nodeStyle = {
  width: 100,
  height: 100
};

const diamondStyle = {
  width: 70,
  height: 70,
  transform: "translate(-50%, -50%) rotate(45deg)",
  background: "white",
  position: "absolute",
  left: "50%",
  top: "50%",
  border: "1px solid #222",
  borderRadius: 2
};

const labelStyle = {
  zIndex: 10,
  position: "relative",
  fontSize: 12,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100%"
};

const handleStyle = {
  zIndex: 1
};

function DiamondDecisionNode({ data }) {
  return (
    <div style={nodeStyle}>
      <Handle style={handleStyle} type="target" position={Position.Top} />
      <div style={diamondStyle} />
      <div style={labelStyle}>{data.label}</div>
      <Handle style={handleStyle} id="false" type="source" position={Position.Right} />
      <Handle style={handleStyle} id="true" type="source" position={Position.Left} />
    </div>
  );
}

export default DiamondDecisionNode;
