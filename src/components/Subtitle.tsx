'use client';

import { useEffect, useState } from 'react';

const STATIC_WORDS  = ['មានសេវាកម្ម'];
const CYCLING_WORDS = ['បង្កើត APP&WEB'];

export default function Subtitle() {
  const [wordIndex,   setWordIndex  ] = useState(0);
  const [displayed,   setDisplayed  ] = useState('');
  const [isDeleting,  setIsDeleting ] = useState(false);

  useEffect(() => {
    const target = CYCLING_WORDS[wordIndex];
    const atFull  = !isDeleting && displayed === target;
    const atEmpty = isDeleting  && displayed === '';

    if (atFull) {
      // Pause then start deleting
      const id = setTimeout(() => setIsDeleting(true), 1600);
      return () => clearTimeout(id);
    }

    if (atEmpty) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
      return;
    }

    const speed = isDeleting ? 55 : 100;
    const id = setTimeout(() => {
      setDisplayed(isDeleting
        ? target.slice(0, displayed.length - 1)
        : target.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(id);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <div
      className="mx-auto max-w-5xl leading-none select-none"
      style={{ fontSize: 'clamp(2.8rem, 9vw, 7rem)', fontWeight: 800, letterSpacing: '-0.025em' }}
    >
      {/* Static words — letter bounce-drop */}
      <span className="block">
        {STATIC_WORDS.map((word, wi) => (
          <span
            key={word}
            style={{ display: 'inline-block', marginRight: '0.22em', verticalAlign: 'bottom' }}
          >
            {word.split('').map((letter, li) => (
              <span
                key={li}
                style={{
                  display: 'inline-block',
                  animation: `letter-drop 0.7s cubic-bezier(0.22,1,0.36,1) ${0.08 + wi * 0.15 + li * 0.05}s both`,
                  background: 'linear-gradient(90deg, rgba(9,10,10,1) 0%, rgba(17,102,53,1) 100%, rgba(237,221,83,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>

      {/* Typewriter cycling word + cursor */}
      <span
        className="block mt-1"
        style={{
          background: 'linear-gradient(90deg, rgba(9, 10, 10, 1) 0%, rgba(17, 102, 53, 1) 100%, rgba(237, 221, 83, 1) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          minHeight: '1.1em',
        }}
      >
        {displayed}
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: '0.06em',
            height: '0.85em',
            background: 'rgba(17, 102, 53, 1)',
            marginLeft: '0.06em',
            verticalAlign: 'middle',
            borderRadius: '2px',
            boxShadow: '0 0 14px rgba(17, 102, 53, 0.95)',
            animation: 'cursor-blink 1.1s step-end infinite',
          }}
        />
      </span>
    </div>
  );
}
