import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        :root {
          --color-background: #ffffff;
          --color-primary: #333;
          --color-secondary: #888;
          --color-tint: #0099ff;
          --font-size-body: 12px;
          --font-size-title: 12px;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --color-background: #000000;
            --color-primary: #fff;
            --color-secondary: #888;
          }
        }
        html, body {
          padding: 0;
          margin: 0;
          width: 100%;
          min-height: 100vh;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: var(--font-size-body);
          background: var(--color-background);
        }
        main {
          box-sizing: border-box;
          font-family: "Inter", sans-serif;
          font-weight: 500;
          max-width: 240px;
          width: 100%;
          display: flex;
          align-items: center;
          flex-direction: column;
          padding: 0 20px;
          text-wrap: balance;
        }
        .framer-logo { color: var(--color-primary); margin-bottom: 20px; }
        .title { margin: 0 0 10px 0; font-size: var(--font-size-title); color: var(--color-primary); text-align: center; }
        .description { color: var(--color-secondary); margin-bottom: 20px; line-height: 1.5em; text-align: center; }
        .btn--back {
          background-color: var(--color-tint);
          color: #ffffff;
          padding-left: 8px;
          padding-right: 8px;
          border-radius: 8px;
          line-height: 30px;
          height: 30px;
          text-decoration: none;
        }
        .btn--back:hover { opacity: 0.75; transition: all 0.2s; }
      `}</style>
      <main>
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="21"
            fill="currentColor"
            className="framer-logo"
          >
            <path d="M 14 0 L 14 7 L 7 7 L 0 0 Z M 14 14 L 7 14 L 7 21 L 0 14 L 0 7 L 7 7 Z" />
          </svg>
        </div>
        <h1 className="title">Page Not Found</h1>
        <div className="description">
          The page you are looking for does not exist or may have been moved.
        </div>
        <Link href="/" role="button" className="btn--back">
          Back to Home
        </Link>
      </main>
    </>
  );
}
