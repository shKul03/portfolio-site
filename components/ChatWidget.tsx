'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.match(/\b(hi|hello|hey|sup|yo)\b/)) {
    return "Hey! 👋 I'm Shloka's AI assistant. Ask me about her experience, projects, tech stack, or how to get in touch!";
  }
  if (q.match(/\b(experience|work|job|career|role|company)\b/)) {
    return "Shloka is currently an AI Engineer at Technossus AI Studio (Jan 2026–Present) building production RAG systems and AI-first products. Before that she was a Malware Research Engineer at CrowdStrike (Jun 2024–Jun 2025) and a Backend Developer at Kashnate Solutions.";
  }
  if (q.match(/\b(project|build|built|made|create|created)\b/)) {
    return "Her standout projects include LiveMind (zero-storage RAG chatbot), Knowledge Engine (enterprise RAG pipeline), SentiCore (WhatsApp AI for patient appointments), OnBoardIQ (KYC document pipeline), and Smart Revenue Collector (AI debt-collection system). Check the Projects section for all 8!";
  }
  if (q.match(/\b(skill|tech|stack|language|tool|python|rag|llm)\b/)) {
    return "Shloka's core stack: Python, FastAPI, LLMs, RAG (pgvector, re-rankers), Ollama, React, TypeScript, Next.js, Docker, Kubernetes, PostgreSQL, MongoDB. She specialises in AI/ML backends and production RAG pipelines.";
  }
  if (q.match(/\b(contact|hire|email|reach|available|open to work|looking)\b/)) {
    return "Reach Shloka at kulkarni.shloka03@gmail.com, LinkedIn: linkedin.com/in/shlokakulkarni, or GitHub: github.com/shKul03. She's actively open to full-time AI/ML roles and freelance projects!";
  }
  if (q.match(/\b(rag|retrieval|vector|embedding|pgvector)\b/)) {
    return "RAG is Shloka's speciality! She's built production RAG pipelines with pgvector, re-rankers, document chunking, and LLM response generation. LiveMind (live web scraping + RAG) and Knowledge Engine (enterprise RAG) are her showcase projects.";
  }
  if (q.match(/\b(crowdstrike|security|malware)\b/)) {
    return "At CrowdStrike, Shloka built production services in Python, TypeScript, and React for distributed security infrastructure. She built a fault-tolerant scheduling microservice that cut processing delays by 30%, working across Docker, Kubernetes, OpenSearch, and S3.";
  }
  if (q.match(/\b(technossus|ai studio)\b/)) {
    return "Technossus AI Studio is Shloka's current employer — a dedicated AI team shipping AI-first products. She has end-to-end ownership from architecture to deployment on all AI-native features.";
  }
  if (q.match(/\b(location|city|india|pune|based|where)\b/)) {
    return "Shloka is based in Pune, India and is open to remote roles globally.";
  }
  if (q.match(/\b(resume|cv|download)\b/)) {
    return "You can download Shloka's resume directly from the nav bar — just click 'Download Resume'!";
  }
  if (q.match(/\b(voice|voicebot|speech|stt|tts)\b/)) {
    return "Shloka built VoiceBot PoC — a multi-service voice assistant with a Python STT/TTS microservice paired with a C#/.NET orchestrator using Clean Architecture. Real production-grade stuff.";
  }
  if (q.match(/\b(whatsapp|senticore|appointment|patient)\b/)) {
    return "SentiCore is an AI-powered patient appointment system over WhatsApp — patients chat with an AI that takes symptoms, suggests the right specialist, checks availability, manages queues, and sends live updates. No app needed!";
  }
  return "I'm best at answering questions about Shloka's experience, projects, tech stack, or how to reach her. Try asking 'what projects has she built?' or 'what's her tech stack?'";
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Shloka's AI assistant 🤖 Ask me anything about her work, skills, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: getResponse(trimmed) },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 200,
            width: 'min(380px, calc(100vw - 48px))',
            height: 500,
            background: '#F2EFE7',
            borderRadius: 16,
            border: '1px solid #D4D0C8',
            boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              borderBottom: '1px solid #D4D0C8',
              background: '#0F0F0E',
              flexShrink: 0,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#F2EFE7',
                }}
              >
                Ask about Shloka 🤖
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: 11,
                  color: 'rgba(242,239,231,0.5)',
                  marginTop: 2,
                }}
              >
                RAG-powered assistant
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                color: '#F2EFE7',
                fontSize: 22,
                cursor: 'pointer',
                padding: '2px 6px',
                lineHeight: 1,
                opacity: 0.7,
                fontFamily: 'system-ui',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '8px 14px',
                    borderRadius:
                      msg.role === 'user'
                        ? '16px 16px 4px 16px'
                        : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#3B47E8' : '#FFFFFF',
                    color: msg.role === 'user' ? '#F2EFE7' : '#0F0F0E',
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: 13,
                    lineHeight: 1.55,
                    border: msg.role === 'assistant' ? '1px solid #E2E0D9' : 'none',
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: '16px 16px 16px 4px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E0D9',
                    display: 'flex',
                    gap: 4,
                    alignItems: 'center',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#5C5A54',
                      }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '12px 14px',
              borderTop: '1px solid #D4D0C8',
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexShrink: 0,
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
                padding: '8px 14px',
                borderRadius: 24,
                border: '1px solid #D4D0C8',
                fontFamily: 'var(--font-dm-sans)',
                fontSize: 13,
                background: '#FFFFFF',
                color: '#0F0F0E',
                outline: 'none',
                minWidth: 0,
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#3B47E8',
                border: 'none',
                color: '#F2EFE7',
                cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                opacity: input.trim() && !isTyping ? 1 : 0.45,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'opacity 0.15s',
              }}
            >
              ↑
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
