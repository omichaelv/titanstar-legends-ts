import React from 'react';
import './ShareButton.css';
import html2canvas from 'html2canvas';

const ShareButton: React.FC = () => {
  const handleShare = async () => {
    const element = document.body;
    const canvas = await html2canvas(element);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'rune_tree_screenshot.png';
    link.click();
  };

  return (
    <button onClick={handleShare} className="share-button">
      Share
    </button>
  );
};

export default ShareButton;