import { sounds } from "../audio/soundEngine";

const legendSoundMap: Record<string, () => void> = {
  Sorted: sounds.markSorted,
  Swapping: sounds.swap,
  Comparing: sounds.compare,
  Overwrite: sounds.overwrite,
  Processing: sounds.active,
  // Idle: sounds.active,
};

type LegendItemProps = {
  label: string;
  color: string;
};

function LegendItem({ label, color }: LegendItemProps) {
  return (
    <div
      onClick={() => {
        legendSoundMap[label]?.();
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          background: color,
          borderRadius: "50%",
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{label}</span>
    </div>
  );
}

export default function ColorLegend() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        padding: "12px 20px",
        background: "#1e293b",
        borderRadius: "999px",
        justifyContent: "center",
      }}
    >
      <LegendItem label="Sorted" color="#10b981" />
      <LegendItem label="Swapping" color="#ef4444" />
      <LegendItem label="Comparing" color="#f59e0b" />
      <LegendItem label="Overwrite" color="#a6ff00ff" />
      <LegendItem label="Processing" color="#64748b" />
      <LegendItem label="Idle" color="#38bdf8" />
    </div>
  );
}

// type LegendItemProps = {
//   label: string;
//   color: string;
// };

// function LegendItem({ label, color }: LegendItemProps) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//       <div
//         style={{
//           width: "12px",
//           height: "12px",
//           background: color,
//           borderRadius: "50%",
//           boxShadow: `0 0 8px ${color}`, // Glow effect
//         }}
//       />
//       <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{label}</span>
//     </div>
//   );
// }

// export default function ColorLegend() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "16px",
//         padding: "12px 20px",
//         background: "#1e293b",
//         borderRadius: "999px",
//         justifyContent: "center",
//       }}
//     >
//       <LegendItem label="Sorted" color="#10b981" />
//       <LegendItem label="Swapping" color="#ef4444" />
//       <LegendItem label="Comparing" color="#f59e0b" />
//       <LegendItem label="Overwrite" color="#a6ff00ff" />
//       <LegendItem label="Processing" color="#64748b" />
//       <LegendItem label="Idle" color="#38bdf8" />
//     </div>
//   );
// }
