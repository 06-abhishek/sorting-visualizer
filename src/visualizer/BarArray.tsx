import Bar from "./Bar";

type Props = {
  array: number[];
  comparing: number[];
  swapping: number[];
  active: number[];
  sorted: Set<number>;
  overwrite: number[];
};

export default function BarArray({
  array,
  comparing,
  swapping,
  active,
  sorted,
  overwrite,
}: Props) {
  const max = Math.max(...array);

  const getColor = (index: number) => {
    if (comparing.includes(index)) return "#f59e0b"; // Amber
    if (swapping.includes(index)) return "#ef4444"; // Red
    if (active.includes(index)) return "#64748b"; // Cyan (processing)
    if (sorted.has(index)) return "#10b981"; // Green (final)
    if (overwrite.includes(index)) return "#a6ff00ff"; // Green (final)

    return "linear-gradient(180deg, #38bdf8 0%, #3b82f6 100%)";
    // return "linear-gradient(180deg, #64748b, #475569)";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: "clamp(250px, 45vh, 520px)",
        padding: "clamp(12px, 3vw, 24px)",
        background: "#0f172a",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Decorative Grid Lines (Optional visual flair) */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "75%",
          left: 0,
          right: 0,
          height: "1px",
          background: "rgba(255,255,255,0.05)",
        }}
      />

      {array.map((value, i) => (
        <Bar key={i} height={(value / max) * 100} color={getColor(i)} />
      ))}
    </div>
  );
}
