'use client';

import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccentPreset {
  id: string;
  name: string;
  light: string;
  dark: string;
  lightMuted: string;
  darkMuted: string;
  lightDeep: string;
  darkDeep: string;
}

interface AccentColorHook {
  accentColor: string;
  setAccentColor: (id: string) => void;
}

// ---------------------------------------------------------------------------
// Presets
// ---------------------------------------------------------------------------

export const ACCENT_PRESETS: readonly AccentPreset[] = [
  {
    id: 'blue',
    name: 'Blue',
    light: '#3b82f6',
    dark: '#60a5fa',
    lightMuted: '#dbeafe',
    darkMuted: '#1e3a5f',
    lightDeep: '#2563eb',
    darkDeep: '#3b82f6',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    light: '#6366f1',
    dark: '#818cf8',
    lightMuted: '#e0e7ff',
    darkMuted: '#312e81',
    lightDeep: '#4f46e5',
    darkDeep: '#6366f1',
  },
  {
    id: 'violet',
    name: 'Violet',
    light: '#8b5cf6',
    dark: '#a78bfa',
    lightMuted: '#ede9fe',
    darkMuted: '#3b2479',
    lightDeep: '#7c3aed',
    darkDeep: '#8b5cf6',
  },
  {
    id: 'rose',
    name: 'Rose',
    light: '#f43f5e',
    dark: '#fb7185',
    lightMuted: '#ffe4e6',
    darkMuted: '#4c0519',
    lightDeep: '#e11d48',
    darkDeep: '#f43f5e',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    light: '#10b981',
    dark: '#34d399',
    lightMuted: '#d1fae5',
    darkMuted: '#064e3b',
    lightDeep: '#059669',
    darkDeep: '#10b981',
  },
  {
    id: 'amber',
    name: 'Amber',
    light: '#f59e0b',
    dark: '#fbbf24',
    lightMuted: '#fef3c7',
    darkMuted: '#451a03',
    lightDeep: '#d97706',
    darkDeep: '#f59e0b',
  },
  {
    id: 'cyan',
    name: 'Cyan',
    light: '#06b6d4',
    dark: '#22d3ee',
    lightMuted: '#cffafe',
    darkMuted: '#164e63',
    lightDeep: '#0891b2',
    darkDeep: '#06b6d4',
  },
  {
    id: 'orange',
    name: 'Orange',
    light: '#f97316',
    dark: '#fb923c',
    lightMuted: '#ffedd5',
    darkMuted: '#431407',
    lightDeep: '#ea580c',
    darkDeep: '#f97316',
  },
];

const DEFAULT_ACCENT = 'blue';
const STORAGE_KEY = 'accent-color';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleaned = hex.replace('#', '');
  if (cleaned.length !== 6) return null;
  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getPreset(id: string): AccentPreset {
  return (
    ACCENT_PRESETS.find((p) => p.id === id) ??
    ACCENT_PRESETS.find((p) => p.id === DEFAULT_ACCENT)!
  );
}

// ---------------------------------------------------------------------------
// CSS variable application
// ---------------------------------------------------------------------------

function applyAccentVariables(preset: AccentPreset, isDark: boolean): void {
  const root = document.documentElement;
  const accent = isDark ? preset.dark : preset.light;
  const muted = isDark ? preset.darkMuted : preset.lightMuted;
  const deep = isDark ? preset.darkDeep : preset.lightDeep;
  const rgb = hexToRgb(accent);

  if (!rgb) return;

  const { r, g, b } = rgb;

  // Core accent
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--accent-muted', muted);
  root.style.setProperty('--accent-deep', deep);

  // Glow — same opacity for both modes
  root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.15)`);

  // Foreground for text on accent backgrounds (e.g., buttons, selection)
  root.style.setProperty('--accent-foreground', isDark ? '#020617' : '#ffffff');

  // Primary / ring / chart
  root.style.setProperty('--primary', accent);
  root.style.setProperty(
    '--primary-foreground',
    isDark ? '#020617' : '#ffffff',
  );
  root.style.setProperty('--ring', accent);
  root.style.setProperty('--chart-1', accent);

  // Grid colors — different opacity per mode
  if (isDark) {
    root.style.setProperty('--grid-color', `rgba(${r}, ${g}, ${b}, 0.02)`);
    root.style.setProperty('--grid-line', `rgba(${r}, ${g}, ${b}, 0.06)`);
  } else {
    root.style.setProperty('--grid-color', `rgba(${r}, ${g}, ${b}, 0.04)`);
    root.style.setProperty('--grid-line', `rgba(${r}, ${g}, ${b}, 0.08)`);
  }
}

// ---------------------------------------------------------------------------
// useSyncExternalStore plumbing (hydration-safe mounted check)
// ---------------------------------------------------------------------------

function subscribe(callback: () => void): () => void {
  return () => {
    void callback;
  };
}

function getSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAccentColor(): AccentColorHook {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isDark = resolvedTheme === 'dark';

  // Lazy initializer reads from localStorage on the client; on the server it
  // falls back to the default. This avoids an extra effect + setState cycle.
  const [accentId, setAccentId] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_ACCENT;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && ACCENT_PRESETS.some((p) => p.id === stored)
      ? stored
      : DEFAULT_ACCENT;
  });

  // Apply CSS variables whenever color or theme changes
  useEffect(() => {
    if (!mounted) return;
    const preset = getPreset(accentId);
    applyAccentVariables(preset, isDark);
  }, [accentId, isDark, mounted]);

  // Listen for storage events so other tabs stay in sync
  useEffect(() => {
    function handleStorage(event: StorageEvent): void {
      if (event.key === STORAGE_KEY && event.newValue) {
        const isValid = ACCENT_PRESETS.some((p) => p.id === event.newValue);
        setAccentId(isValid ? event.newValue : DEFAULT_ACCENT);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const setAccentColor = useCallback((id: string) => {
    const isValid = ACCENT_PRESETS.some((p) => p.id === id);
    const safeId = isValid ? id : DEFAULT_ACCENT;
    localStorage.setItem(STORAGE_KEY, safeId);
    setAccentId(safeId);
  }, []);

  return {
    accentColor: accentId,
    setAccentColor,
  };
}
