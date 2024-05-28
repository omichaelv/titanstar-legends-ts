import React, { useRef, useState } from 'react';
import RuneItem from '../RuneItem/RuneItem';
import { Rune } from '../../interfaces/Rune';
import './RuneTree.css';
import addPointSound from '../../assets/sounds/activate.wav';
import subtractPointSound from '../../assets/sounds/cancel.wav';
import HoverBox from '../HoverBox/HoverBox';



const MAX_POINTS = 6;

const initialRunes: Rune[] = [
  { id: 1, name: 'Chevron', points: 0, required: [], iconX: 0, iconY: 0, title: 'Chevron', description: 'You can now dress tables, yay.' },
  { id: 2, name: 'Silverware', points: 0, required: [1], iconX: 50, iconY: 0, title: 'Silverware', description: 'So many kinds of forks.' },
  { id: 3, name: 'Cake', points: 0, required: [1, 2], iconX: 100, iconY: 0, title: 'Cake', description: 'Happy Birthday.' },
  { id: 4, name: 'Crown', points: 0, required: [1, 2, 3], iconX: 150, iconY: 0, title: 'Crown', description: 'You are the party king now, +5 cooking.' },
  { id: 5, name: 'Helmet', points: 0, required: [], iconX: 200, iconY: 0, title: 'Helmet', description: 'This is the Helmet rune,  we love more defense.' },
  { id: 6, name: 'Goggles', points: 0, required: [5], iconX: 250, iconY: 0, title: 'Snorkel', description: 'Time to explore the ocean.' },
  { id: 7, name: 'Lightning', points: 0, required: [5, 6], iconX: 300, iconY: 0, title: 'Lightning', description: 'You are inmune to electricty.' },
  { id: 8, name: 'Skull', points: 0, required: [5, 6, 7], iconX: 350, iconY: 0, title: 'Skull', description: 'Congrats you are now Skeletor.' },
];


const RuneTree: React.FC = () => {
  const [runes, setRunes] = useState<Rune[]>(initialRunes);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [hoveredRune, setHoveredRune] = useState<Rune | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const addSoundRef = useRef<HTMLAudioElement>(null);
  const subtractSoundRef = useRef<HTMLAudioElement>(null);

  const handleLeftClick = (id: number) => {
    setRunes((prevRunes) => {
      const rune = prevRunes.find((r) => r.id === id);
      if (rune && rune.points === 0 && canAddPoint(rune) && totalPoints < MAX_POINTS) {
        rune.points = 1;
        setTotalPoints(totalPoints + 1);
        if (addSoundRef.current) {
          addSoundRef.current.play();
        }
      }
      return [...prevRunes];
    });
  };

  const handleRightClick = (id: number) => {
    setRunes((prevRunes) => {
      const rune = prevRunes.find((r) => r.id === id);
      if (rune && rune.points === 1 && canRemovePoint(rune)) {
        rune.points = 0;
        setTotalPoints(totalPoints - 1);
        if (subtractSoundRef.current) {
          subtractSoundRef.current.play();
        }
      }
      return [...prevRunes];
    });
  };

  const handleMouseEnter = (rune: Rune, event: React.MouseEvent) => {
    setHoveredRune(rune);
    setHoverPosition({ top: event.clientY, left: event.clientX });
  };

  const handleMouseLeave = () => {
    setHoveredRune(null);
  };

  const canAddPoint = (rune: Rune): boolean => {
    return rune.required.every((reqId) => runes.find((r) => r.id === reqId && r.points > 0));
  };

  const canRemovePoint = (rune: Rune): boolean => {
    return runes.every((r) => !r.required.includes(rune.id) || r.points === 0);
  };

  const isActive = (id: number): boolean => {
    return (runes.find(rune => rune.id === id)?.points ?? 0) > 0;
  };

  return (
    <div className="rune-tree-container">
      <audio ref={addSoundRef} src={addPointSound} preload="auto" />
      <audio ref={subtractSoundRef} src={subtractPointSound} preload="auto" />
      <div className="rune-tree">
        <div className="talent-path">
          <div className="talent-path-title">TALENT PATH 1</div>
          {runes.slice(0, 4).map((rune, index) => (
            <div
              key={rune.id}
              className="horizontal-container"
              onMouseEnter={(event) => handleMouseEnter(rune, event)}
              onMouseLeave={handleMouseLeave}
            >
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
          <div className="talent-path-title">TALENT PATH 2</div>
          {runes.slice(4).map((rune, index) => (
            <div
              key={rune.id}
              className="horizontal-container"
              onMouseEnter={(event) => handleMouseEnter(rune, event)}
              onMouseLeave={handleMouseLeave}
            >
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
      {hoveredRune && <HoverBox title={hoveredRune.title} description={hoveredRune.description} position={hoverPosition} />}
    </div>
  );
}

export default RuneTree;