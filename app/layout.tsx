import type { Metadata } from 'next';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import './globals.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  weight: ['700', '800'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Shloka Kulkarni — AI Engineer | RAG Systems | LLM Engineering',
  description:
    'Shloka Kulkarni is an AI Engineer at Technossus AI Studio specialising in RAG pipelines, LLM-powered backends, voice bots, and intelligent document processing. Ex-CrowdStrike. Based in Pune, India.',
  keywords: [
    'Shloka Kulkarni',
    'AI Engineer Pune',
    'RAG engineer India',
    'LLM engineering',
    'pgvector developer',
    'Python AI developer',
    'Technossus',
    'CrowdStrike engineer',
    'retrieval augmented generation',
    'voice bot developer',
    'FastAPI developer',
    'full stack AI engineer India',
  ],
  openGraph: {
    title: 'Shloka Kulkarni — AI Engineer',
    description:
      'Building RAG systems, voice bots, and intelligent AI pipelines in production.',
    url: 'https://shlokakulkarni.vercel.app',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shloka Kulkarni — AI Engineer',
    description:
      'Building RAG systems, voice bots, and intelligent AI pipelines in production.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
