import React from 'react';
import './HoverBox.css';

interface HoverBoxProps {
  title: string;
  description: string;
  position: { top: number; left: number };
}

const HoverBox: React.FC<HoverBoxProps> = ({ title, description, position }) => {
  return (
    <div className="hover-box" style={{ top: position.top, left: position.left }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HoverBox;