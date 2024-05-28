import React from 'react';
import RuneTree from './components/RuneTree/RuneTree';
import './App.css';
import ShareButton from './components/ShareButton/ShareButton';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="background">
        <h1>TitanStar Legends Rune Mastery Loadout Talent Calculator 9000</h1>
        <RuneTree />
        <ShareButton />
      </div>
    </div>
  );
}

export default App;