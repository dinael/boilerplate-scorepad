import { FC, lazy, Suspense } from "react";
import "./App.scss";

const PointsCalculator = lazy(() =>
  import("./components/PointsCalculator/PointsCalculator").then((m) => ({
    default: m.default,
  })),
);

const App: FC = () => {
  return (
    <div className="app-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="app-header">
        <h1>Scorepad</h1>
      </header>
      <main id="main-content" className="app-main">
        <Suspense
          fallback={
            <div aria-live="polite" aria-busy="true">
              Loading...
            </div>
          }
        >
          <PointsCalculator />
        </Suspense>
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Point Summer Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
