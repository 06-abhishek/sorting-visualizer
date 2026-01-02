import { useState, useRef } from "react";
import { algorithms } from "../algorithms/registry";

import BarArray from "../visualizer/BarArray";
import { playEvents } from "../core/EventPlayer";
import { generateSequential, shuffleArray } from "../utils/arrayGenerator";
import AlgorithmInfoPanel from "../components/AlgorithmInfoPanel";
import ColorLegend from "../components/ColorLegend";
import { Link } from "react-router-dom";

const MIN_SPEED = 1;
const MAX_SPEED = 1000;
const DEFAULT_SPEED = 300;

const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = window.innerWidth >= 1024 ? 300 : 100;
const DEFAULT_ELEMENTS = 30;

// --- Custom Button Components for All Buttons ---
const Button = ({ onClick, disabled, variant = "primary", children }: any) => {
  const baseStyle: React.CSSProperties = {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s ease",
    fontSize: "0.9rem",
  };

  const variants: any = {
    primary: {
      background: "#3b82f6",
      color: "white",
      boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)",
    },
    danger: {
      background: "#ef4444",
      color: "white",
      boxShadow: "0 4px 14px 0 rgba(239, 68, 68, 0.39)",
    },
    secondary: { background: "#334155", color: "#e2e8f0" },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...baseStyle, ...variants[variant] }}
    >
      {children}
    </button>
  );
};

const Label = ({ children }: any) => (
  <span
    style={{
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#94a3b8",
      display: "block",
      marginBottom: "4px",
    }}
  >
    {children}
  </span>
);

export default function Visualizer() {
  const [array, setArray] = useState<number[]>(
    shuffleArray(generateSequential(DEFAULT_ELEMENTS))
  );
  // const [tempArray, setTempArray] = useState<number[]>(
  //   new Array(array.length).fill(0)
  // );

  // Visualization states
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<Set<number>>(new Set());
  const [active, setActive] = useState<number[]>([]);
  const [overwrite, setOverwrite] = useState<number[]>([]);

  const [speed, setSpeed] = useState<number>(DEFAULT_SPEED);

  const [selectedAlgo, setSelectedAlgo] = useState(algorithms[0]);
  const [language, setLanguage] = useState("javascript");

  const [isSorting, setIsSorting] = useState(false);
  const cancelRef = useRef(false);

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Start sorting
  const run = async () => {
    const soundAllowed = soundEnabled && speed >= 100;

    setIsSorting(true);
    cancelRef.current = false;

    // reset visual state
    setComparing([]);
    setSwapping([]);
    setActive([]);
    setOverwrite([]);
    setSorted(new Set());

    let events = selectedAlgo.run(array);

    await playEvents(
      events,
      array,
      setArray,
      speed,
      cancelRef,
      setComparing,
      setSwapping,
      setSorted,
      setActive,
      setOverwrite,
      soundAllowed
    );

    setIsSorting(false);
  };

  // Stop sorting safely
  const terminate = () => {
    cancelRef.current = true;
    setComparing([]);
    setSwapping([]);
    setSorted(new Set());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        fontFamily: "'Inter', sans-serif",
        color: "#f8fafc",
        paddingBottom: "40px",
      }}
    >
      {/* HEADER / CONTROLS */}
      <div
        style={{
          background: "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #334155",
          padding: "20px 40px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 700,
                background: "linear-gradient(to right, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sorting
              <br />
              Visualizer
            </h1>
          </div>
        </Link>

        {/* Group: Algorithm Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Label>Algorithm</Label>
          <div style={{ position: "relative", minWidth: "200px" }}>
            {/* Custom Dropdown Arrow SVG */}
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none", // Allows clicks to pass through to the select
                color: isSorting ? "#475569" : "#94a3b8",
                display: "flex",
                alignItems: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            <select
              disabled={isSorting}
              onChange={(e) =>
                setSelectedAlgo(
                  algorithms.find((a) => a.info.id === e.target.value)!
                )
              }
              style={{
                appearance: "none", // Hides default ugly browser arrow
                WebkitAppearance: "none",
                MozAppearance: "none",
                width: "100%",
                background: isSorting ? "#1e293b" : "#1e293b", // Slate-800
                color: isSorting ? "#64748b" : "#f8fafc",
                border: `1px solid ${isSorting ? "#334155" : "#475569"}`,
                padding: "10px 40px 10px 16px", // Extra right padding for the icon
                borderRadius: "8px",
                outline: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                cursor: isSorting ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
              // Adding inline hover/focus logic via class is hard in pure inline styles,
              // so we use simple box-shadow for focus ring simulation here:
              onFocus={(e) => {
                if (!isSorting) {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.2)";
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#475569";
                e.target.style.boxShadow = "none";
              }}
            >
              {/* ================= Comparison-Based Algorithms ================= */}
              <optgroup
                label="Comparison-Based Algorithms"
                style={{
                  color: "#94a3b8",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                {algorithms
                  .filter(
                    (algo) =>
                      !["counting", "radix", "tim"].includes(algo.info.id)
                  )
                  .map((algo) => (
                    <option
                      key={algo.info.id}
                      value={algo.info.id}
                      style={{ color: "#f8fafc", background: "#0f172a" }}
                    >
                      {algo.info.name}
                    </option>
                  ))}
              </optgroup>

              {/* ================= Non-Comparison-Based Algorithms ================= */}
              <optgroup
                label="Non-Comparison-Based Algorithms"
                style={{
                  color: "#94a3b8",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                {algorithms
                  .filter((algo) =>
                    ["counting", "radix"].includes(algo.info.id)
                  )
                  .map((algo) => (
                    <option
                      key={algo.info.id}
                      value={algo.info.id}
                      style={{ color: "#f8fafc", background: "#0f172a" }}
                    >
                      {algo.info.name}
                    </option>
                  ))}
              </optgroup>

              {/* ================= Hybrid Algorithms ================= */}
              <optgroup
                label="Hybrid Algorithms"
                style={{
                  color: "#94a3b8",
                  fontStyle: "normal",
                  fontWeight: 600,
                }}
              >
                {algorithms
                  .filter((algo) => algo.info.id === "tim")
                  .map((algo) => (
                    <option
                      key={algo.info.id}
                      value={algo.info.id}
                      style={{ color: "#f8fafc", background: "#0f172a" }}
                    >
                      {algo.info.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Group: Sliders */}
        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <div>
            <Label>Speed: {speed}ms</Label>
            <input
              type="range"
              min={MIN_SPEED}
              max={MAX_SPEED}
              step={1}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isSorting}
              style={{ cursor: "pointer", accentColor: "#3b82f6" }}
            />
          </div>

          <div>
            <Label>Elements: {array.length}</Label>
            <input
              type="range"
              min={MIN_ELEMENTS}
              max={MAX_ELEMENTS}
              step={1}
              value={array.length}
              onChange={(e) => {
                const n = Number(e.target.value);
                // setArray(generateSequential(n));
                setArray(shuffleArray(generateSequential(n)));
                setSorted(new Set());
              }}
              disabled={isSorting}
              style={{ cursor: "pointer", accentColor: "#3b82f6" }}
            />
          </div>
        </div>

        {/* Group: Toggles & Actions */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled((v) => !v)}
              disabled={isSorting}
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#10b981",
              }}
            />
            <span style={{ fontSize: "0.9rem", color: "#cbd5e1" }}>Audio</span>
          </label>

          <Button
            onClick={() => {
              setArray(shuffleArray(array));
              setSorted(new Set());
            }}
            disabled={isSorting}
            variant="secondary"
          >
            Shuffle
          </Button>

          {isSorting ? (
            <Button onClick={terminate} variant="danger">
              Stop
            </Button>
          ) : (
            <Button onClick={run} variant="primary">
              Start Sorting
            </Button>
          )}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div
        style={{
          padding: "clamp(16px, 4vw, 40px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <ColorLegend />
        </div>

        {/* Visualizer Stage */}
        <BarArray
          array={array}
          comparing={comparing}
          swapping={swapping}
          active={active}
          sorted={sorted}
          overwrite={overwrite}
        />

        {/* Info Panel */}
        <AlgorithmInfoPanel
          info={selectedAlgo.info}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
    </div>
  );
}
