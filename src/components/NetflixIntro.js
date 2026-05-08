import React, { useEffect, useState } from 'react';

export default function NetflixIntro({ onComplete }) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const steps = [
      { delay: 500, action: () => setAnimationStep(1) }, // Start N
      { delay: 1000, action: () => setAnimationStep(2) }, // E
      { delay: 1500, action: () => setAnimationStep(3) }, // T
      { delay: 2000, action: () => setAnimationStep(4) }, // F
      { delay: 2500, action: () => setAnimationStep(5) }, // L
      { delay: 3000, action: () => setAnimationStep(6) }, // I
      { delay: 3500, action: () => setAnimationStep(7) }, // X
      { delay: 4000, action: () => setAnimationStep(8) }, // Complete
      { delay: 4500, action: () => onComplete() } // Finish
    ];

    steps.forEach(({ delay, action }) => {
      setTimeout(action, delay);
    });
  }, [onComplete]);

  return (
    <div className="netflix-intro">
      <div className="intro-bg">
        <div className="netflix-logo">
          <span className={`letter n ${animationStep >= 1 ? 'visible' : ''}`}>N</span>
          <span className={`letter e ${animationStep >= 2 ? 'visible' : ''}`}>E</span>
          <span className={`letter t ${animationStep >= 3 ? 'visible' : ''}`}>T</span>
          <span className={`letter f ${animationStep >= 4 ? 'visible' : ''}`}>F</span>
          <span className={`letter l ${animationStep >= 5 ? 'visible' : ''}`}>L</span>
          <span className={`letter i ${animationStep >= 6 ? 'visible' : ''}`}>I</span>
          <span className={`letter x ${animationStep >= 7 ? 'visible' : ''}`}>X</span>
        </div>
        <div className={`tagline ${animationStep >= 8 ? 'visible' : ''}`}>
          See what's next.
        </div>
      </div>
    </div>
  );
}