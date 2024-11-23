import { FC } from 'react';
import PointsCalculator from './components/PointsCalculator/PointsCalculator';

const App: FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Scorepad</h1>
      </header>
      <main className="app-main">
        <PointsCalculator />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Point Summer Game. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;