'use client';

import { useState } from 'react';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CatMascot from '@/components/CatMascot';
import ChatWidget from '@/components/ChatWidget';
import BackendPing from '@/components/BackendPing';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <CatMascot onOpen={() => setChatOpen(true)} />
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <BackendPing />
    </>
  );
}
