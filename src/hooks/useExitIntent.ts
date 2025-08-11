import { useEffect, useState } from 'react';

export const useExitIntent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown this session
    const hasShownPopup = sessionStorage.getItem('discount-popup-shown');
    if (hasShownPopup) {
      setHasTriggered(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        setShowPopup(true);
        setHasTriggered(true);
        sessionStorage.setItem('discount-popup-shown', 'true');
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(timeoutId);
    };

    // Add small delay before enabling exit intent to avoid immediate triggers
    timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
      }
    }, 3000); // Wait 3 seconds before enabling

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [hasTriggered]);

  const hidePopup = () => {
    setShowPopup(false);
  };

  return { showPopup, hidePopup };
};