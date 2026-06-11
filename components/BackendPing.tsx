'use client';

import { useEffect } from 'react';

const BOT_URL =
  process.env.NEXT_PUBLIC_BOT_URL ?? 'https://portfolio-bot-uunf.onrender.com';

export default function BackendPing() {
  useEffect(() => {
    const ping = () => fetch(`${BOT_URL}/ping`, { method: 'GET' }).catch(() => {});

    ping();

    const interval = setInterval(ping, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
