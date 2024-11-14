import { useState, useEffect } from 'react';

function useResponsiveTextSize() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [textSize, setTextSize] = useState(getTextSize(window.innerWidth));

  function getTextSize(width) {
    if (width <= 640) return `${width / 15}px`;
    if (width <= 1024) return `${width / 12}px`;
    if (width <= 1250) return `${width / 15}px`;
    return `${width / 10}px`;
  }

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setTextSize(getTextSize(width));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return textSize;
}

export default useResponsiveTextSize;
