import React, { useState } from 'react';
import RuneItem from '../RuneItem/RuneItem';
import { Rune } from '../../interfaces/Rune';
import './RuneTree.css';



const MAX_POINTS = 6;

const initialRunes: Rune[] = [
  { id: 1, name: 'Chevron', points: 0, required: [], iconX: 0, iconY: 0 },
  { id: 2, name: 'Silverware', points: 0, required: [1], iconX: 50, iconY: 0 },
  { id: 3, name: 'Cake', points: 0, required: [1, 2], iconX: 100, iconY: 0 },
  { id: 4, name: 'Crown', points: 0, required: [1, 2, 3], iconX: 150, iconY: 0 },
  { id: 5, name: 'Helmet', points: 0, required: [], iconX: 200, iconY: 0 },
  { id: 6, name: 'Goggles', points: 0, required: [5], iconX: 250, iconY: 0 },
  { id: 7, name: 'Lightning', points: 0, required: [5, 6], iconX: 300, iconY: 0 },
  { id: 8, name: 'Skull', points: 0, required: [5, 6, 7], iconX: 350, iconY: 0 },
];


const RuneTree: React.FC = () => {
  const [runes, setRunes] = useState<Rune[]>(initialRunes);
  const [totalPoints, setTotalPoints] = useState<number>(0);

  const handleLeftClick = (id: number) => {
    if (totalPoints < MAX_POINTS) {
      setRunes((prevRunes) =>
        prevRunes.map((rune) =>
          rune.id === id && canAddPoint(rune)
            ? { ...rune, points: rune.points + 1 }
            : rune
        )
      );
      setTotalPoints(totalPoints + 1);
    }
  };

  const handleRightClick = (id: number) => {
    setRunes((prevRunes) =>
      prevRunes.map((rune) =>
        rune.id === id && rune.points > 0
          ? { ...rune, points: rune.points - 1 }
          : rune
      )
    );
    setTotalPoints(totalPoints - 1);
  };

  const canAddPoint = (rune: Rune): boolean => {
    return rune.required.every((reqId) => runes.find((r) => r.id === reqId && r.points > 0));
  };

  const isActive = (id: number): boolean => {
    return (runes.find(rune => rune.id === id)?.points ?? 0) > 0;
  };

  return (
    <div className="rune-tree-container">
      <div className="rune-tree">
        <div className="talent-path">
          {runes.slice(0, 4).map((rune, index) => (
            <div key={rune.id} className="horizontal-container">
              <RuneItem
                rune={rune}
                onLeftClick={() => handleLeftClick(rune.id)}
                onRightClick={() => handleRightClick(rune.id)}
                isActive={isActive(rune.id)}
              />
              {index < 3 && (
                <div
                  className={`connection-bar ${isActive(rune.id) && isActive(runes[index + 1].id) ? 'active' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="talent-path">
          {runes.slice(4).map((rune, index) => (
            <div key={rune.id} className="horizontal-container">
              <RuneItem
                rune={rune}
                onLeftClick={() => handleLeftClick(rune.id)}
                onRightClick={() => handleRightClick(rune.id)}
                isActive={isActive(rune.id)}
              />
              {index < 3 && (
                <div
                  className={`connection-bar ${isActive(rune.id) && isActive(runes[index + 5].id) ? 'active' : ''}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="points-spent-container">
        <div className="points-spent-box">
          <div className="points-spent-number">{totalPoints} / {MAX_POINTS}</div>
          <div className="points-spent-label">Points Spent</div>
        </div>
      </div>
    </div>
  );
}

export default RuneTree;