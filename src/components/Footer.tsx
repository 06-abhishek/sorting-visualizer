import { Mail, Github, Linkedin, Code2, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Injecting scoped CSS styles to handle hover states and media queries 
        which inline styles cannot do.
      */}
      <style>{`
        .footer-container {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(148, 163, 184, 0.1);
          padding: 32px 24px;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* A subtle top glow effect */
        .footer-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.5), transparent);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: center;
        }

        /* Desktop Layout: 3 Columns */
        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr auto 1fr;
          }
          .footer-right {
            justify-self: end;
            text-align: right;
          }
        }

        /* Brand Styling */
        .brand-section h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.025em;
        }
        
        .brand-section p {
          margin: 6px 0 0;
          font-size: 0.85rem;
          color: #64748b;
          line-height: 1.5;
        }

        /* Social Links */
        .social-links {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .social-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 99px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(148, 163, 184, 0.1);
          color: #cbd5e1;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-btn:hover {
          background: rgba(56, 189, 248, 0.1); /* Cyan tint */
          border-color: rgba(56, 189, 248, 0.3);
          color: #38bdf8; /* Cyan text */
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .social-btn:active {
            transform: translateY(0);
        }

        /* Copyright Section */
        .footer-right {
          font-size: 0.8rem;
          color: #64748b;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
        }
        
        @media (min-width: 768px) {
            .footer-right {
                align-items: flex-end;
            }
        }

        .heart-icon {
          color: #ef4444;
          display: inline-block;
          animation: beat 1.5s infinite;
        }

        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>

      <footer className="footer-container">
        <div className="footer-content">
          {/* Left: Branding & Vision */}
          <div className="brand-section">
            <h3>
              <Code2 size={20} color="#38bdf8" />
              <span>Sorting Visualizer</span>
            </h3>

            <p>
              Built to help developers visualize algorithms,
              <br />
              not just memorize them.
            </p>
          </div>

          {/* Center: Interactive Social Links */}
          <nav className="social-links" aria-label="Footer Navigation">
            <a
              href="mailto:abhishekp.7841@gmail.com"
              className="social-btn"
              aria-label="Send email"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>

            <a
              href="https://github.com/06-abhishek/sorting-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="View source on GitHub"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/abhishek-patil-27759630b/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </nav>

          {/* Right: Copyright & Credits */}
          <div className="footer-right">
            <span>© {currentYear} Abhishek Patil</span>
            <span>
              Crafted with{" "}
              <Heart size={12} className="heart-icon" fill="currentColor" /> in
              React
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
