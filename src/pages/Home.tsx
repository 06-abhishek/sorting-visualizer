import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ================= Shuffling Logo ================= */
const ShufflingLogo = () => {
  const finalText = "Sorting Visualizer";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [text, setText] = useState(finalText);

  useEffect(() => {
    let iteration = 0;

    const interval = setInterval(() => {
      setText(
        finalText
          .split("")
          .map((char, idx) =>
            idx < iteration
              ? char
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );

      iteration += 0.4;
      if (iteration > finalText.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return <h1 style={styles.logo}>{text}</h1>;
};

/* ================= Home Page ================= */
export default function Home() {
  return (
    <div style={styles.container}>
      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <ShufflingLogo />

        <p style={styles.heroSubtext}>
          Sorting isn’t just about arranging numbers.
          <br />
          It’s about understanding how computers think.
        </p>

        <Link to="/visualizer">
          <button style={styles.primaryButton}>
            Start Visualizing
            <span style={{ marginLeft: 10 }}>→</span>
          </button>
        </Link>
      </section>

      <hr style={styles.divider} />

      {/* ================= CONTENT ================= */}
      <section style={styles.contentSection}>
        <h2 style={styles.sectionTitle}>What are Sorting Algorithms?</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>In Simple Words</h3>
            <p style={styles.text}>
              Sorting algorithms are step-by-step methods used to arrange data
              in a specific order — like smallest to largest or A to Z.
              Computers use them constantly to make searching and processing
              faster.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Why They Matter</h3>
            <p style={styles.text}>
              Imagine finding a name in a shuffled phone book. Sorting makes
              data predictable, which helps programs run quicker, scale better,
              and feel smoother to users.
            </p>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Different Approaches</h3>
            <p style={styles.text}>
              Some algorithms take small careful steps. Others divide the
              problem into parts and solve it smartly. Each method has its own
              strengths and trade-offs.
            </p>
          </div>
        </div>

        {/* ================= DEEPER ================= */}
        <div style={styles.deepSection}>
          <h3 style={styles.deepTitle}>Why Visualization Helps</h3>

          <p style={styles.deepText}>
            Reading code alone can feel abstract. When you see comparisons,
            swaps, and movements, the logic suddenly clicks.
          </p>

          <p style={styles.deepText}>
            This visualizer turns algorithms into motion, showing how order
            slowly emerges from chaos.
          </p>

          <ul style={styles.list}>
            <li>Bubble Sort shows patience and repetition</li>
            <li>Insertion Sort feels natural and intuitive</li>
            <li>Quick Sort reveals clever divide-and-conquer thinking</li>
            <li>Merge Sort shows structure and consistency</li>
          </ul>
        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <footer style={styles.footer}>
        Built with care for learners who want to truly understand algorithms.
      </footer>
    </div>
  );
}

/* ================= STYLES ================= */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#f8fafc",
    fontFamily: "'Inter', system-ui, sans-serif",
    padding: "0 20px",
  },

  hero: {
    padding: "120px 0 90px",
    textAlign: "center",
  },

  logo: {
    fontSize: "clamp(2.8rem, 7vw, 5rem)",
    fontWeight: 900,
    letterSpacing: "-0.04em",
    background: "linear-gradient(135deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: 24,
  },

  heroSubtext: {
    color: "#94a3b8",
    fontSize: "1.15rem",
    maxWidth: 600,
    margin: "0 auto 40px",
    lineHeight: 1.7,
  },

  primaryButton: {
    padding: "16px 42px",
    borderRadius: 999,
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 12px 30px rgba(59,130,246,0.45)",
    transition: "transform 0.2s ease",
  },

  divider: {
    border: "none",
    height: 1,
    background: "linear-gradient(to right, transparent, #1e293b, transparent)",
    margin: "40px 0",
  },

  contentSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "60px 0",
  },

  sectionTitle: {
    fontSize: "2.4rem",
    textAlign: "center",
    marginBottom: 50,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
  },

  card: {
    background: "#020617",
    border: "1px solid #1e293b",
    borderRadius: 22,
    padding: 28,
  },

  cardTitle: {
    marginBottom: 12,
    color: "#e2e8f0",
  },

  text: {
    color: "#cbd5e1",
    lineHeight: 1.7,
    fontSize: "0.95rem",
  },

  deepSection: {
    marginTop: 70,
    padding: 40,
    borderRadius: 24,
    background: "rgba(30,41,59,0.45)",
  },

  deepTitle: {
    marginBottom: 18,
    fontSize: "1.6rem",
  },

  deepText: {
    color: "#cbd5e1",
    lineHeight: 1.8,
    marginBottom: 16,
  },

  list: {
    marginTop: 20,
    paddingLeft: 20,
    color: "#e2e8f0",
    lineHeight: 1.8,
  },

  footer: {
    textAlign: "center",
    padding: "60px 0 40px",
    color: "#64748b",
    fontSize: "0.85rem",
  },
};

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// // Shuffling Logo Component
// const ShufflingLogo = () => {
//   const [text, setText] = useState("Sorting Visualizer");
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//   useEffect(() => {
//     let iteration = 0;
//     const interval = setInterval(() => {
//       setText((prev) =>
//         prev
//           .split("")
//           .map((char, index) => {
//             if (index < iteration) {
//               return "Sorting Visualizer"[index];
//             }
//             return characters[Math.floor(Math.random() * 26)];
//           })
//           .join("")
//       );

//       if (iteration >= "Sorting Visualizer".length) {
//         clearInterval(interval);
//         // Restart after 3 seconds
//         setTimeout(() => {
//           iteration = 0;
//           const newInterval = setInterval(() => {
//             /* repeat logic */
//           }, 30);
//         }, 3000);
//       }
//       iteration += 1 / 3;
//     }, 30);
//     return () => clearInterval(interval);
//   }, []);

//   return <h1 style={styles.logo}>{text}</h1>;
// };

// export default function Home() {
//   return (
//     <div style={styles.container}>
//       {/* Hero Section */}
//       <section style={styles.hero}>
//         <ShufflingLogo />
//         <p style={styles.heroSubtext}>
//           Witness the beauty of computer science. Explore how data rearranges
//           itself through efficient mathematical patterns.
//         </p>
//         <Link to="/visualizer">
//           <button style={styles.primaryButton}>
//             Launch Visualizer
//             <span style={{ marginLeft: "8px" }}>→</span>
//           </button>
//         </Link>
//       </section>

//       <hr style={styles.divider} />

//       {/* Deep Dive Content Section */}
//       <section style={styles.contentSection}>
//         <h2 style={styles.sectionTitle}>What are Sorting Algorithms?</h2>

//         <div style={styles.grid}>
//           <div style={styles.card}>
//             <h3>The Concept</h3>
//             <p>
//               A sorting algorithm is a method used to rearrange a large number
//               of items into a specific order, such as numerical or alphabetical.
//               This process is fundamental to optimizing data efficiency.
//             </p>
//           </div>

//           <div style={styles.card}>
//             <h3>Complexity ($O(n)$)</h3>
//             <p>
//               Efficiency is measured by <strong>Time Complexity</strong>.
//               Algorithms like QuickSort use "Divide and Conquer" to achieve $O(n
//               \log n)$, while simpler ones like Bubble Sort run in $O(n^2)$.
//             </p>
//           </div>

//           <div style={styles.card}>
//             <h3>Why Visualize?</h3>
//             <p>
//               Static code can be abstract. By animating the comparisons and
//               swaps, you can visually track how pointers move and how "sorted"
//               portions of the array grow in real-time.
//             </p>
//           </div>
//         </div>

//         <div style={styles.detailedInfo}>
//           <h3>Common Algorithms You'll Explore</h3>
//           <ul style={styles.list}>
//             <li>
//               <strong>Bubble Sort:</strong> The simplest approach, repeatedly
//               swapping adjacent elements.
//             </li>
//             <li>
//               <strong>Quick Sort:</strong> A highly efficient, recursive
//               algorithm using a pivot element.
//             </li>
//             <li>
//               <strong>Merge Sort:</strong> A stable sort that splits the array
//               into halves and merges them back.
//             </li>
//             <li>
//               <strong>Insertion Sort:</strong> Builds the final sorted array one
//               item at a time.
//             </li>
//           </ul>
//         </div>
//       </section>

//       <footer style={styles.footer}>
//         Built for Developers and Students &copy; 2026
//       </footer>
//     </div>
//   );
// }

// // Styles Object for Clean UI-UX
// const styles: { [key: string]: React.CSSProperties } = {
//   container: {
//     minHeight: "100vh",
//     backgroundColor: "#020617",
//     color: "#f8fafc",
//     fontFamily: "'Inter', system-ui, sans-serif",
//     padding: "0 20px",
//     scrollBehavior: "smooth",
//   },
//   hero: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     padding: "120px 0 80px",
//   },
//   logo: {
//     fontSize: "clamp(2.5rem, 8vw, 5rem)",
//     fontWeight: 900,
//     letterSpacing: "-0.02em",
//     fontFamily: "monospace",
//     background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     marginBottom: "24px",
//     textTransform: "uppercase",
//   },
//   heroSubtext: {
//     color: "#94a3b8",
//     maxWidth: "600px",
//     fontSize: "1.2rem",
//     lineHeight: "1.6",
//     marginBottom: "40px",
//   },
//   primaryButton: {
//     padding: "16px 40px",
//     borderRadius: "50px",
//     border: "none",
//     fontSize: "1.1rem",
//     fontWeight: 600,
//     cursor: "pointer",
//     background: "#3b82f6",
//     color: "#fff",
//     transition: "transform 0.2s, box-shadow 0.2s",
//     boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
//   },
//   divider: {
//     border: "0",
//     height: "1px",
//     background: "linear-gradient(to right, transparent, #1e293b, transparent)",
//     margin: "40px 0",
//   },
//   contentSection: {
//     maxWidth: "1100px",
//     margin: "0 auto",
//     padding: "60px 0",
//   },
//   sectionTitle: {
//     fontSize: "2.5rem",
//     textAlign: "center",
//     marginBottom: "50px",
//     color: "#f1f5f9",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: "30px",
//     marginBottom: "60px",
//   },
//   card: {
//     background: "#0f172a",
//     padding: "30px",
//     borderRadius: "24px",
//     border: "1px solid #1e293b",
//     transition: "border-color 0.3s",
//   },
//   detailedInfo: {
//     background: "rgba(30, 41, 59, 0.5)",
//     padding: "40px",
//     borderRadius: "24px",
//     lineHeight: "1.8",
//   },
//   list: {
//     listStyleType: "none",
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//   },
//   footer: {
//     textAlign: "center",
//     padding: "60px 0 40px",
//     color: "#475569",
//     fontSize: "0.9rem",
//   },
// };
