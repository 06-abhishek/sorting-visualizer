type BarProps = {
  height: number;
  color: string;
};

export default function Bar({ height, color }: BarProps) {
  return (
    <div
      style={{
        height: `${height}%`,
        flex: 1,
        margin: "0 1px", // Slight gap between bars for clarity
        background: color,
        borderRadius: "4px 4px 0 0", // Soften the top edges
        boxShadow: "0px 0px 4px rgba(0,0,0,0.3)", // subtle depth
        transition:
          "height 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s ease", // More natural physics ease
      }}
    />
  );
}
