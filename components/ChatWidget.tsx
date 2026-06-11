'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import catImg from './cat.png';

// ── Types ────────────────────────────────────────────────────────────────────

type Personality = 'Pro' | 'Witty' | 'Hype' | 'ELI5';

interface BotResponse {
  content: string;
  follow_ups: string[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  follow_ups?: string[];
}

// ── API ───────────────────────────────────────────────────────────────────────

const BOT_URL =
  process.env.NEXT_PUBLIC_BOT_URL ?? 'https://portfolio-bot-uunf.onrender.com';

async function getResponse(
  message: string,
  personality: string,
  session_id: string
): Promise<BotResponse> {
  const res = await fetch(`${BOT_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id, message, personality }),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const data = await res.json();
  return {
    content: data.reply,
    follow_ups: data.follow_ups ?? [],
  };
}

// ── Paw print loading indicator ───────────────────────────────────────────────

function PawLoader() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: '10px 14px',
        background: '#FFFFFF',
        borderRadius: '16px 16px 16px 4px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        width: 'fit-content',
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ fontSize: 14, lineHeight: 1, display: 'block' }}
          animate={{ opacity: [0, 1, 1, 0, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            times: [0, 0.01, 0.5, 0.51, 1],
            ease: 'linear',
          }}
        >
          🐾
        </motion.span>
      ))}
    </div>
  );
}

// ── Suggestion chip ───────────────────────────────────────────────────────────

function Chip({ label, onClick }: { label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: 12,
        padding: '6px 12px',
        borderRadius: 20,
        border: '1px solid #1224A8',
        background: hovered ? '#1224A8' : '#F2EFE7',
        color: hovered ? '#FFFFFF' : '#1224A8',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s',
        whiteSpace: 'nowrap',
        lineHeight: 1.4,
      }}
    >
      {label}
    </button>
  );
}

// ── Panel background dot-grid pattern ────────────────────────────────────────

const DOT_BG = {
  backgroundImage: 'radial-gradient(circle, rgba(18,36,168,0.12) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
} as const;

// ── Main component ────────────────────────────────────────────────────────────

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const sessionId = useRef<string>(
    `session-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );

  const [personality, setPersonality] = useState<Personality>('Witty');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hey! 🐾 I'm SK — ask me anything about Shloka's work, projects, or whether she's open to hire (spoiler: yes).",
      follow_ups: [
        'What has she built?',
        'Is she open to work?',
        'Tell me about LiveMind',
        'How can I contact her?',
      ],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPaws, setShowPaws] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pawTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
      fetch(`${BOT_URL}/ping`).catch(() => {});
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showPaws]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setInput('');
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      setIsTyping(true);

      // Show paw animation only if response takes longer than 1 second
      pawTimerRef.current = setTimeout(() => setShowPaws(true), 1000);

      try {
        const response = await getResponse(trimmed, personality, sessionId.current);
        if (pawTimerRef.current) clearTimeout(pawTimerRef.current);
        setShowPaws(false);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: response.content, follow_ups: response.follow_ups },
        ]);
      } catch {
        if (pawTimerRef.current) clearTimeout(pawTimerRef.current);
        setShowPaws(false);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "Hmm, I'm having trouble connecting right now. Try emailing Shloka directly at kulkarni.shloka03@gmail.com 🐾",
            follow_ups: [],
          },
        ]);
      }
    },
    [isTyping, personality]
  );

  const handleSend = () => sendMessage(input);
  const handleChip = (chip: string) => sendMessage(chip);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const personalities: Personality[] = ['Pro', 'Witty', 'Hype', 'ELI5'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '200px',
            right: 24,
            zIndex: 100,
            width: 'min(380px, calc(100vw - 48px))',
            height: 560,
            borderRadius: 20,
            border: '1px solid rgba(18,36,168,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: '#F2EFE7',
            ...DOT_BG,
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              background: '#1224A8',
              padding: '14px 16px 12px',
              borderRadius: '20px 20px 0 0',
              flexShrink: 0,
            }}
          >
            {/* Top row: icon + title + pills + close */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 6,
              }}
            >
              <img
                src={catImg.src}
                alt="cat"
                width={24}
                height={24}
                style={{ imageRendering: 'pixelated', filter: 'brightness(0) invert(1)', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  flex: 1,
                }}
              >
                Ask about Shloka
              </span>
              {/* Personality pills */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {personalities.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPersonality(p)}
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 10,
                      padding: '3px 7px',
                      borderRadius: 20,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s, color 0.15s',
                      background: personality === p ? '#FFFFFF' : 'transparent',
                      color: personality === p ? '#1224A8' : 'rgba(255,255,255,0.6)',
                      fontWeight: personality === p ? 600 : 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close chat"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: 20,
                  cursor: 'pointer',
                  padding: '0 2px',
                  lineHeight: 1,
                  opacity: 0.75,
                  fontFamily: 'system-ui',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>
            {/* Subline */}
            <p
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.6)',
                margin: 0,
                paddingLeft: 34,
                lineHeight: 1.3,
              }}
            >
              RAG-powered · always honest
            </p>
          </div>

          {/* ── Messages ── */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 14px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map((msg, i) => {
              const isLastBot = msg.role === 'assistant' && i === messages.length - 1;
              const prevIsUser = i === 0 || messages[i - 1].role === 'user';

              if (msg.role === 'assistant') {
                return (
                  <div key={i}>
                    {/* Bubble row with avatar */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                      <div style={{ width: 20, flexShrink: 0, paddingBottom: 2 }}>
                        {prevIsUser && (
                          <img
                            src={catImg.src}
                            alt=""
                            width={16}
                            height={16}
                            style={{ imageRendering: 'pixelated' }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          maxWidth: '80%',
                          padding: '12px 16px',
                          borderRadius: '16px 16px 16px 4px',
                          background: '#FFFFFF',
                          color: '#0F0F0E',
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: 14,
                          lineHeight: 1.55,
                          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                    {/* Follow-up chips — only on last bot message */}
                    {isLastBot && !isTyping && msg.follow_ups && msg.follow_ups.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginTop: 8,
                          paddingLeft: 26,
                        }}
                      >
                        {msg.follow_ups.map((chip) => (
                          <Chip key={chip} label={chip} onClick={() => handleChip(chip)} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      maxWidth: '80%',
                      padding: '12px 16px',
                      borderRadius: '16px 16px 4px 16px',
                      background: '#1224A8',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-dm-sans)',
                      fontSize: 14,
                      lineHeight: 1.55,
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {/* Paw loader */}
            {showPaws && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ width: 20, flexShrink: 0 }} />
                <PawLoader />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
          <div
            style={{
              padding: '10px 14px 12px',
              borderTop: '1px solid rgba(18,36,168,0.1)',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexShrink: 0,
              background: '#FFFFFF',
              borderRadius: '0 0 20px 20px',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: 24,
                border: '1px solid rgba(18,36,168,0.2)',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 14,
                background: '#F2EFE7',
                color: '#0F0F0E',
                outline: 'none',
                minWidth: 0,
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#1224A8')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(18,36,168,0.2)')}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#1224A8',
                border: 'none',
                color: '#FFFFFF',
                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                opacity: input.trim() && !isTyping ? 1 : 0.4,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'opacity 0.15s, filter 0.15s',
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isTyping)
                  (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.15)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.filter = '';
              }}
            >
              →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
