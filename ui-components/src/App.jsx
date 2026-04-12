import { useState } from 'react';
import Home from './pages/Home';
import MoodDiary from './pages/MoodDiary';
import RelationshipAnalysis from './pages/RelationshipAnalysis';
import Practice from './pages/Practice';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navItems = [
    { id: 'home', label: '首页', icon: '🏠' },
    { id: 'diary', label: '日记', icon: '📝' },
    { id: 'analysis', label: '分析', icon: '📊' },
    { id: 'practice', label: '练习', icon: '🧘' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'diary':
        return <MoodDiary />;
      case 'analysis':
        return <RelationshipAnalysis />;
      case 'practice':
        return <Practice />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <main className="app-main">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
