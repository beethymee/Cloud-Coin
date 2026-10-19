import { useState, useEffect } from 'react';

export type AppTheme =
  | 'holo-reference'
  | 'light-reference'
  | 'emerald-mint'
  | 'indigo-neo'
  | 'wallet-rose'
  | 'dark-obsidian';

export interface ThemeMeta {
  id: AppTheme;
  name: string;
  category: 'light' | 'dark';
  description: string;
  badge: string;
  primaryColor: string;
  surfaceColor: string;
}

export const THEME_OPTIONS: ThemeMeta[] = [
  {
    id: 'holo-reference',
    name: 'Reference Holo-Scenario',
    category: 'dark',
    description: 'Futuristic command center matching the reference scenario with holographic neon-cyan HUD & cyber-vault glow',
    badge: 'Scenario Match',
    primaryColor: '#00F2FE',
    surfaceColor: '#050811',
  },
  {
    id: 'light-reference',
    name: 'Reference Light',
    category: 'light',
    description: 'Clean modern mobile banking with crisp white surfaces & emerald accents',
    badge: 'Light Banking',
    primaryColor: '#10B981',
    surfaceColor: '#FFFFFF',
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    category: 'light',
    description: 'Fresh fintech mint palette with high-contrast emerald cards & pastel badges',
    badge: 'Fintech Fresh',
    primaryColor: '#059669',
    surfaceColor: '#F0FDF4',
  },
  {
    id: 'indigo-neo',
    name: 'Neo-Bank Indigo',
    category: 'light',
    description: 'Modern European digital banking look (Revolut / Monzo style with indigo & violet)',
    badge: 'Pro Banking',
    primaryColor: '#4F46E5',
    surfaceColor: '#EEF2FF',
  },
  {
    id: 'wallet-rose',
    name: 'Consumer Wallet',
    category: 'light',
    description: 'Vibrant mobile wallet aesthetic with rose & coral accents',
    badge: 'Mobile Wallet',
    primaryColor: '#E11D48',
    surfaceColor: '#FFF1F2',
  },
  {
    id: 'dark-obsidian',
    name: 'Obsidian Dark',
    category: 'dark',
    description: 'Deep cybersecurity slate & dark vault aesthetic with subtle ambient glow',
    badge: 'Night Vault',
    primaryColor: '#10B981',
    surfaceColor: '#07090E',
  },
];

const THEME_STORAGE_KEY = 'fintrack_active_theme';

export function useTheme() {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme;
      if (stored && THEME_OPTIONS.some((t) => t.id === stored)) {
        return stored;
      }
    } catch {
      // fallback
    }
    // Default to the user's requested Reference Holographic Scenario theme!
    return 'holo-reference';
  });

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const isDark = theme === 'holo-reference' || theme === 'dark-obsidian';

  const toggleLightDark = () => {
    if (isDark) {
      setTheme('light-reference');
    } else {
      setTheme('holo-reference');
    }
  };

  // Sync with document element for CSS attribute selectors and tailwind dark mode
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme, isDark]);

  const currentThemeMeta = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return {
    theme,
    setTheme,
    toggleLightDark,
    isDark,
    currentThemeMeta,
    availableThemes: THEME_OPTIONS,
  };
}
