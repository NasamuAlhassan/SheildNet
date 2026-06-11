'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border bg-card-alt animate-pulse" />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 rounded-lg border border-border bg-card hover:bg-background-alt hover:border-border-strong flex items-center justify-center transition-all duration-200 text-foreground-secondary hover:text-foreground"
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200 rotate-0" />
      )}
    </button>
  );
}
