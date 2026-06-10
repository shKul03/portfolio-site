'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// ── Mock response engine ──────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResponse(input: string, personality: Personality): BotResponse {
  const q = input.toLowerCase();

  if (q.match(/\b(hi|hello|hey|sup|yo)\b/)) {
    return {
      content: "Hey! 👋 I'm Shloka's AI assistant. Ask me about her experience, projects, tech stack, or how to get in touch!",
      follow_ups: ['What has she built?', 'Is she open to work?', "What's her tech stack?"],
    };
  }
  if (q.match(/\b(experience|work|job|career|role|company)\b/)) {
    return {
      content:
        'Shloka is currently an AI Engineer at Technossus AI Studio (Jan 2026–Present) building production RAG systems and AI-first products. Before that she was a Malware Research Engineer at CrowdStrike (Jun 2024–Jun 2025) and a Backend Developer at Kashnate Solutions.',
      follow_ups: ['Tell me about CrowdStrike', 'What did she build at Technossus?', 'How can I contact her?'],
    };
  }
  if (q.match(/\b(project|build|built|made|create|created|livemind)\b/)) {
    return {
      content:
        'Her standout projects include LiveMind (zero-storage RAG chatbot), Knowledge Engine (enterprise RAG pipeline), SentiCore (WhatsApp AI for appointments), OnBoardIQ (KYC document pipeline), and Smart Revenue Collector (AI debt-collection). 8 projects total — check the Projects section!',
      follow_ups: ['Tell me about LiveMind', 'Tell me about SentiCore', "What's her RAG experience?"],
    };
  }
  if (q.match(/\b(skill|tech|stack|language|tool|python|rag|llm)\b/)) {
    return {
      content:
        "Shloka's core stack: Python, FastAPI, LLMs, RAG (pgvector, re-rankers), Ollama, React, TypeScript, Next.js, Docker, Kubernetes, PostgreSQL, MongoDB. She specialises in AI/ML backends and production RAG pipelines.",
      follow_ups: ['What RAG projects has she built?', 'Has she used Kubernetes in production?'],
    };
  }
  if (q.match(/\b(contact|hire|email|reach|available|open to work|looking|open to hire)\b/)) {
    return {
      content:
        "Reach Shloka at kulkarni.shloka03@gmail.com, LinkedIn: linkedin.com/in/shlokakulkarni, or GitHub: github.com/shKul03. She's actively open to full-time AI/ML roles and freelance projects!",
      follow_ups: ['Download her resume', 'What roles is she looking for?'],
    };
  }
  if (q.match(/\b(rag|retrieval|vector|embedding|pgvector)\b/)) {
    return {
      content:
        "RAG is Shloka's speciality! She's built production RAG pipelines with pgvector, re-rankers, document chunking, and LLM response generation. LiveMind (live web scraping + RAG) and Knowledge Engine (enterprise RAG with full doc lifecycle) are her showcase projects.",
      follow_ups: ['Tell me about Knowledge Engine', 'Tell me about LiveMind'],
    };
  }
  if (q.match(/\b(crowdstrike|security|malware)\b/)) {
    return {
      content:
        'At CrowdStrike, Shloka built production services in Python, TypeScript, and React for distributed security infrastructure. She built a fault-tolerant scheduling microservice that cut processing delays by 30%, working across Docker, Kubernetes, OpenSearch, and S3.',
      follow_ups: ["What's she building now?", 'How can I contact her?'],
    };
  }
  if (q.match(/\b(technossus|ai studio)\b/)) {
    return {
      content:
        "Technossus AI Studio is Shloka's current team — a dedicated AI unit shipping AI-first products. She has end-to-end ownership from architecture to deployment.",
      follow_ups: ['What projects did she build there?', 'How can I contact her?'],
    };
  }
  if (q.match(/\b(location|city|india|pune|based|where|remote)\b/)) {
    return {
      content: "Shloka is based in Pune, India and is open to remote roles globally.",
      follow_ups: ['Is she open to work?', 'How can I contact her?'],
    };
  }
  if (q.match(/\b(resume|cv|download)\b/)) {
    return {
      content: "You can download Shloka's resume directly from the nav bar — just click 'Download Resume'!",
      follow_ups: ['How can I contact her?', 'What roles is she looking for?'],
    };
  }
  if (q.match(/\b(voice|voicebot|speech|stt|tts)\b/)) {
    return {
      content:
        'Shloka built VoiceBot PoC — a multi-service voice assistant with a Python STT/TTS microservice paired with a C#/.NET orchestrator using Clean Architecture. Production-grade multi-service architecture.',
      follow_ups: ['What other AI projects has she built?', 'How can I contact her?'],
    };
  }
  if (q.match(/\b(whatsapp|senticore|appointment|patient)\b/)) {
    return {
      content:
        'SentiCore is an AI-powered patient appointment system over WhatsApp — patients chat with an AI that takes symptoms, suggests the right specialist, checks availability, manages queues, and sends live updates. No app needed!',
      follow_ups: ['What other projects has she built?', 'Is she open to work?'],
    };
  }
  if (q.match(/\b(open to work|available|hire|hiring|job|role)\b/)) {
    return {
      content: "Yes! Shloka is actively open to work — full-time AI/ML engineering roles, freelance projects, and interesting conversations. Get in touch!",
      follow_ups: ['How can I contact her?', "What's her tech stack?"],
    };
  }
  return {
    content:
      "I'm best at answering questions about Shloka's experience, projects, tech stack, or how to reach her. Try asking 'what projects has she built?' or 'what's her tech stack?'",
    follow_ups: ['What has she built?', "What's her tech stack?", 'How can I contact her?'],
  };
}

// ── Mini cat loaf icon (local version for header/avatars) ─────────────────────

function CatLoafIcon({
  size,
  bodyColor = '#0F0F0E',
  eyeColor = '#F2EFE7',
  collarColor = '#1224A8',
}: {
  size: number;
  bodyColor?: string;
  eyeColor?: string;
  collarColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', imageRendering: 'pixelated', flexShrink: 0 }}
    >
      <rect x="5" y="5" width="3" height="2" fill={bodyColor} />
      <rect x="22" y="5" width="3" height="2" fill={bodyColor} />
      <rect x="3" y="7" width="26" height="1" fill={bodyColor} />
      <rect x="2" y="8" width="28" height="20" fill={bodyColor} />
      <rect x="8" y="10" width="2" height="2" fill={eyeColor} />
      <rect x="9" y="11" width="1" height="1" fill={bodyColor} />
      <rect x="20" y="10" width="2" height="2" fill={eyeColor} />
      <rect x="20" y="11" width="1" height="1" fill={bodyColor} />
      <rect x="3" y="14" width="26" height="1" fill={collarColor} />
      <rect x="30" y="17" width="1" height="3" fill={bodyColor} />
      <rect x="29" y="20" width="1" height="1" fill={bodyColor} />
      <rect x="28" y="21" width="1" height="1" fill={bodyColor} />
    </svg>
  );
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sessionId = useRef<string>(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2)
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

      const delay = 700 + Math.random() * 600;
      await new Promise((r) => setTimeout(r, delay));

      if (pawTimerRef.current) clearTimeout(pawTimerRef.current);
      setShowPaws(false);
      setIsTyping(false);

      const response = getResponse(trimmed, personality);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.content, follow_ups: response.follow_ups },
      ]);
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
            bottom: 24,
            right: 24,
            zIndex: 200,
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
              <CatLoafIcon size={24} bodyColor="#F2EFE7" eyeColor="#1224A8" collarColor="#FFFFFF" />
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
                          <CatLoafIcon
                            size={16}
                            bodyColor="#1224A8"
                            eyeColor="#F2EFE7"
                            collarColor="#F2EFE7"
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
