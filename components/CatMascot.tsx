'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import catImg from './cat.png';
import catImgDark from './cat-dark.png';


const MESSAGES = [
  'psst... ask me something 👀',
  'I know everything about Shloka 🐱',
  'click me! ↓',
  'RAG-powered & ready 🤖',
  'open to work btw 👋',
];

interface CatMascotProps {
  onOpen: () => void;
}

export default function CatMascot({ onOpen }: CatMascotProps) {
  const [wanderState, setWanderState] = useState({ left: '10%', duration: 4 });
  const [facingRight, setFacingRight] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [specialMsg, setSpecialMsg] = useState<string | null>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const currentXRef = useRef(10);
  const specialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Wandering
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = (fromX: number) => {
      const maxX = 75;
      const newX = 5 + Math.random() * (maxX - 5);
      const duration = 3 + Math.random() * 3;

      setFacingRight(newX >= fromX);
      currentXRef.current = newX;
      setWanderState({ left: `${newX}%`, duration });

      timeoutId = setTimeout(() => scheduleNext(newX), duration * 1000 + 400);
    };

    timeoutId = setTimeout(() => scheduleNext(currentXRef.current), 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Message cycling
  useEffect(() => {
    if (specialMsg) return;
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [specialMsg]);

  const handleClick = useCallback(() => {
    if (isJumping) return;
    setIsJumping(true);

    if (specialTimerRef.current) clearTimeout(specialTimerRef.current);
    setSpecialMsg('on it! 🐾');
    onOpen();

    specialTimerRef.current = setTimeout(() => {
      setIsJumping(false);
      setSpecialMsg(null);
    }, 2000);
  }, [isJumping, onOpen]);

  return (
    <motion.div
      initial={{ left: '10%' }}
      animate={{ left: wanderState.left }}
      transition={{ duration: wanderState.duration, ease: 'easeInOut' }}
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '0px',
        zIndex: 50,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={specialMsg ?? String(msgIndex)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: '100%',
            ...(parseFloat(wanderState.left) > 70
              ? { right: 0, left: 'auto', transform: 'none' }
              : { left: '50%', transform: 'translateX(-50%)' }),
            marginBottom: 8,
            background: '#F2EFE7',
            border: '1px solid #1224A8',
            borderRadius: 20,
            padding: '4px 12px',
            maxWidth: '900px',
            whiteSpace: 'normal',
            fontFamily: 'var(--font-dm-sans)',
            fontSize: isMobile ? 10 : 11,
            color: '#0F0F0E',
            pointerEvents: 'none',
            lineHeight: 1.4,
          }}
        >
          {specialMsg ?? MESSAGES[msgIndex]}
          {/* Border triangle */}
          <span
            style={{
              position: 'absolute',
              bottom: -7,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '7px solid #1224A8',
              display: 'block',
            }}
          />
          {/* Fill triangle */}
          <span
            style={{
              position: 'absolute',
              bottom: -5,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderTop: '5px solid #F2EFE7',
              display: 'block',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Cat with idle bounce + jump */}
      <motion.div
        animate={isJumping ? { y: [0, -20, 0] } : { y: [0, -3, 0, 3, 0] }}
        transition={
          isJumping
            ? { duration: 0.3, ease: 'easeOut' }
            : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <motion.div
          animate={{ scaleX: facingRight ? 1 : -1 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'block' }}
        >
          <img
            src={catImgDark.src}
            alt="pixel cat mascot"
            width={85}
            height={85}
            style={{
              imageRendering: 'pixelated',
              display: 'block',
              width: '85px !important' as string,
              height: 'auto !important' as string,
              minWidth: '85px',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
