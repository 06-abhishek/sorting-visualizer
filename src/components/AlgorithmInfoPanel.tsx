import type { AlgorithmInfo } from "../types/AlgorithmInfo";

type Props = {
  info: AlgorithmInfo;
  language: string;
  setLanguage: (lang: string) => void;
};

export default function AlgorithmInfoPanel({
  info,
  language,
  setLanguage,
}: Props) {
  const cardStyle: React.CSSProperties = {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "clamp(16px, 4vw, 24px)",
    marginTop: "32px",
    color: "#e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  };

  const headerStyle: React.CSSProperties = {
    color: "#f8fafc",
    borderBottom: "1px solid #334155",
    paddingBottom: "12px",
    marginBottom: "16px",
    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
    fontWeight: 600,
  };

  const tableHeaderStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "10px",
    color: "#94a3b8",
    borderBottom: "1px solid #334155",
    fontSize: "0.75rem",
    textTransform: "uppercase",
  };

  const tableCellStyle: React.CSSProperties = {
    padding: "10px",
    borderBottom: "1px solid #334155",
    fontFamily: "monospace",
    fontSize: "0.9rem",
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>{info.name}</h2>

        <p style={{ lineHeight: 1.6, color: "#cbd5e1" }}>{info.description}</p>

        <h3 style={{ color: "#38bdf8", margin: "20px 0 10px" }}>
          Complexity Analysis
        </h3>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Best</th>
                <th style={tableHeaderStyle}>Average</th>
                <th style={tableHeaderStyle}>Worst</th>
                <th style={tableHeaderStyle}>Space</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ ...tableCellStyle, color: "#4ade80" }}>
                  {info.complexity.best}
                </td>
                <td style={{ ...tableCellStyle, color: "#fbbf24" }}>
                  {info.complexity.average}
                </td>
                <td style={{ ...tableCellStyle, color: "#f87171" }}>
                  {info.complexity.worst}
                </td>
                <td style={{ ...tableCellStyle, color: "#c084fc" }}>
                  {info.complexity.space}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0 10px",
          }}
        >
          <h3 style={{ color: "#38bdf8", margin: 0 }}>Implementation</h3>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              background: "#0f172a",
              color: "#e2e8f0",
              border: "1px solid #475569",
              padding: "6px 12px",
              borderRadius: "6px",
            }}
          >
            {Object.keys(info.implementations).map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "8px",
            padding: "16px",
            overflowX: "auto",
            fontFamily: "monospace",
            fontSize: "clamp(12px, 2.5vw, 14px)",
            color: "#a5b4fc",
          }}
        >
          <pre style={{ margin: 0 }}>
            <code>{info.implementations.typescript}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// import type { AlgorithmInfo } from "../types/AlgorithmInfo";

// type Props = {
//   info: AlgorithmInfo;
//   language: string;
//   setLanguage: (lang: string) => void;
// };

// export default function AlgorithmInfoPanel({
//   info,
//   language,
//   setLanguage,
// }: Props) {
//   // Shared styles for the clean dark theme
//   const cardStyle: React.CSSProperties = {
//     background: "#1e293b",
//     border: "1px solid #334155",
//     borderRadius: "12px",
//     padding: "24px",
//     marginTop: "24px",
//     color: "#e2e8f0",
//     boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//   };

//   const headerStyle: React.CSSProperties = {
//     color: "#f8fafc",
//     borderBottom: "1px solid #334155",
//     paddingBottom: "12px",
//     marginBottom: "16px",
//     fontSize: "1.5rem",
//     fontWeight: 600,
//   };

//   const tableHeaderStyle: React.CSSProperties = {
//     textAlign: "left",
//     padding: "12px",
//     color: "#94a3b8",
//     borderBottom: "1px solid #334155",
//     fontSize: "0.875rem",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//   };

//   const tableCellStyle: React.CSSProperties = {
//     padding: "12px",
//     borderBottom: "1px solid #334155",
//     fontFamily: "monospace",
//     fontSize: "0.95rem",
//   };

//   return (
//     <div
//       style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "50px" }}
//     >
//       <div style={cardStyle}>
//         <h2 style={headerStyle}>{info.name}</h2>
//         <p
//           style={{ lineHeight: "1.6", color: "#cbd5e1", marginBottom: "24px" }}
//         >
//           {info.description}
//         </p>

//         <h3 style={{ color: "#38bdf8", marginBottom: "12px" }}>
//           Complexity Analysis
//         </h3>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             marginBottom: "30px",
//           }}
//         >
//           <thead>
//             <tr>
//               <th style={tableHeaderStyle}>Best Case</th>
//               <th style={tableHeaderStyle}>Average Case</th>
//               <th style={tableHeaderStyle}>Worst Case</th>
//               <th style={tableHeaderStyle}>Space Complexity</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td style={{ ...tableCellStyle, color: "#4ade80" }}>
//                 {info.complexity.best}
//               </td>
//               <td style={{ ...tableCellStyle, color: "#fbbf24" }}>
//                 {info.complexity.average}
//               </td>
//               <td style={{ ...tableCellStyle, color: "#f87171" }}>
//                 {info.complexity.worst}
//               </td>
//               <td style={{ ...tableCellStyle, color: "#c084fc" }}>
//                 {info.complexity.space}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <h3 style={{ color: "#38bdf8", margin: 0 }}>Implementation</h3>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             style={{
//               background: "#0f172a",
//               color: "#e2e8f0",
//               border: "1px solid #475569",
//               padding: "6px 12px",
//               borderRadius: "6px",
//               cursor: "pointer",
//               outline: "none",
//             }}
//           >
//             {Object.keys(info.implementations).map((lang) => (
//               <option key={lang} value={lang}>
//                 {lang.toUpperCase()}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div
//           style={{
//             background: "#0f172a",
//             border: "1px solid #334155",
//             borderRadius: "8px",
//             padding: "20px",
//             overflowX: "auto",
//             fontFamily: '"Fira Code", "Consolas", monospace',
//             fontSize: "14px",
//             lineHeight: "1.5",
//             color: "#a5b4fc", // Soft indigo text for code
//           }}
//         >
//           <pre style={{ margin: 0 }}>
//             <code>{info.implementations[language]}</code>
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
