import React from 'react';
import { Rune } from '../../interfaces/Rune';
import './RuneItem.css';

interface RuneItemProps {
  rune: Rune;
  onLeftClick: () => void;
  onRightClick: () => void;
  isActive: boolean;
}

const RuneItem: React.FC<RuneItemProps> = ({ rune, onLeftClick, onRightClick, isActive }) => {
  const backgroundPosition = rune.points > 0 
    ? `-${rune.iconX}px -${rune.iconY}px`
    : `-${rune.iconX}px -${rune.iconY + 50}px`;

  return (
    <div
      className={`rune-item ${isActive ? 'active' : ''}`}
      onClick={(e) => e.type === 'click' && onLeftClick()}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
      style={{
        backgroundPosition,
      }}
    />
  );
}

export default RuneItem;
