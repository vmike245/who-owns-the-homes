import './App.css';
import { Home } from './pages/home/Home';

function App() {
  return (
    <div
      className="flex-column justify-content-center align-items-center"
      style={{ height: '100vh', width: '100vw' }}
    >
      <Home />
    </div>
  );
}

export default App;
