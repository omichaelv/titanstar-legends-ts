import React from 'react';
import RuneTree from './components/RuneTree/RuneTree';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>TitanStar Legends Rune Mastery Loadout Talent Calculator 9000</h1>
      <RuneTree />
    </div>
  );
}

export default App;