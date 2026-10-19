import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  Check,
  Palette,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AppTheme, THEME_OPTIONS } from '../hooks/useTheme';

interface ThemeSelectorProps {
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  isDark: boolean;
  onToggleLightDark: () => void;
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  isDark,
  onToggleLightDark,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeMeta = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-1.5">
        {/* Quick 1-click Light/Dark Toggle */}
        <button
          onClick={onToggleLightDark}
          title={isDark ? 'Switch to Reference Light Mode' : 'Switch to Dark Mode'}
          className={`p-1.5 rounded-lg border transition cursor-pointer flex items-center justify-center ${
            isDark
              ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
              : 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 shadow-sm'
          }`}
        >
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Theme Palette Picker Dropdown Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
            isDark
              ? 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
          }`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20 shrink-0"
            style={{ backgroundColor: activeMeta.primaryColor }}
          />
          {!compact && (
            <span className="hidden sm:inline font-medium">
              Theme: <span className="font-bold">{activeMeta.name}</span>
            </span>
          )}
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-72 rounded-2xl p-2 shadow-2xl border z-50 animate-fadeIn ${
            isDark
              ? 'bg-slate-900 border-slate-700 text-slate-100'
              : 'bg-white border-slate-200 text-slate-800 shadow-xl'
          }`}
        >
          <div className="px-3 py-2 border-b border-inherit mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Palette className="w-3.5 h-3.5 text-emerald-500" />
              <span>Select UI Theme</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              Instant Live
            </span>
          </div>

          <div className="space-y-1">
            {THEME_OPTIONS.map((t) => {
              const isSelected = t.id === currentTheme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelectTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-xs ${
                    isSelected
                      ? isDark
                        ? 'bg-slate-800 border border-emerald-500/40 text-white'
                        : 'bg-emerald-50/80 border border-emerald-300 text-slate-900 shadow-sm'
                      : isDark
                      ? 'hover:bg-slate-800/60 text-slate-300'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {/* Swatch */}
                  <div
                    className="w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center border border-black/10"
                    style={{ backgroundColor: t.primaryColor }}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold truncate">{t.name}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                          t.id === 'light-reference'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isDark
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.badge}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] mt-0.5 line-clamp-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {t.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reference Notice */}
          <div
            className={`mt-2 p-2 rounded-xl text-[11px] flex items-center gap-2 ${
              isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              <strong>Reference Match:</strong> Crisp light surfaces & modern mobile banking layout as in the reference image.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
