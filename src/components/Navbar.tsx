import React from 'react';
import {
  Sparkles,
  RotateCcw,
  BookOpen,
  PieChart,
  MessageSquare,
  Calendar,
  Layers,
  Activity,
  Smartphone,
  Globe,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Monitor,
} from 'lucide-react';
import { FinancialHealthScore } from '../types/finance';
import { ThemeSelector } from './ThemeSelector';
import { AppTheme, THEME_OPTIONS } from '../hooks/useTheme';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  healthScore: FinancialHealthScore;
  onResetData: () => void;
  onOpenCompetitionModal: () => void;
  onOpenApkModal: () => void;
  pendingProposalsCount: number;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isMobileFrameActive?: boolean;
  onToggleMobileFrame?: () => void;
  currentTheme?: AppTheme;
  onSelectTheme?: (theme: AppTheme) => void;
  isDark?: boolean;
  onToggleLightDark?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  healthScore,
  onResetData,
  onOpenCompetitionModal,
  pendingProposalsCount,
  onOpenApkModal,
  soundEnabled = true,
  onToggleSound,
  isMobileFrameActive = false,
  onToggleMobileFrame,
  currentTheme = 'light-reference',
  onSelectTheme = () => {},
  isDark = false,
  onToggleLightDark = () => {},
}) => {
  const navTabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'copilot', label: 'AI Copilot', icon: MessageSquare, badge: pendingProposalsCount > 0 ? pendingProposalsCount : null },
    { id: 'budgeting', label: 'Budgets', icon: Layers },
    { id: 'bills', label: 'Bills & Subs', icon: Calendar },
    { id: 'insights', label: 'Analytics', icon: PieChart },
    { id: 'security', label: 'Security & Audit', icon: ShieldCheck },
    { id: 'landing', label: 'Public Web', icon: Globe },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 70) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-colors duration-200" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
      {/* Top Competition Bar */}
      <div className="top-comp-bar border-b px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2" style={{ borderColor: 'var(--header-border)' }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] tracking-wide">
            <Zap className="w-3 h-3 text-emerald-500" />
            <span>FinTechathon 2026</span>
          </div>
          <span className="text-xs hidden md:inline text-slate-500 dark:text-slate-400">
            Topic A: Autonomous Personal Finance Assistant
          </span>
          {/* Active Theme Chip */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-xs">
            Theme: {THEME_OPTIONS.find((t) => t.id === currentTheme)?.name || 'Holo Scenario'}
          </span>
          <span className="text-[11px] font-mono text-cyan-400 hidden xl:inline">
            ▲ DJIA 39,215 • NASDAQ 18,310 • BTC $69,420
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Sandbox Environment</span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">·</span>
          <button
            onClick={onOpenCompetitionModal}
            className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-medium transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rubric (40% Task · 30% Security · 30% Innovation)</span>
          </button>
        </div>
      </div>

      {/* Main 3-Zone Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        {/* Zone 1: Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none shrink-0"
          onClick={() => setActiveTab('overview')}
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1px] shadow-sm">
            <div className="w-full h-full rounded-[7px] flex items-center justify-center transition-colors" style={{ backgroundColor: isDark ? '#07090E' : '#FFFFFF' }}>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight" style={{ color: 'var(--app-text)' }}>
                FinTrack<span className="text-emerald-500">AI</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 rounded">
                v2.6
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
              Smart Financial Participant
            </span>
          </div>
        </div>

        {/* Zone 2: Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.08] rounded-xl">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-slate-200 dark:border-emerald-500/30 shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-400 text-slate-950">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Quick Indicators */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Active Theme Selector & Quick Toggle */}
          <ThemeSelector
            currentTheme={currentTheme}
            onSelectTheme={onSelectTheme}
            isDark={isDark}
            onToggleLightDark={onToggleLightDark}
          />

          {/* Health Score Badge */}
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition hover:opacity-90 cursor-pointer ${getScoreColor(
              healthScore.overall
            )}`}
            title="Click to view detailed Health Score analysis"
          >
            <Activity className="w-3.5 h-3.5" />
            <div className="flex items-baseline gap-1">
              <span className="font-mono tabular-nums font-bold">{healthScore.overall}</span>
              <span className="text-[10px] text-slate-400 font-normal">/100</span>
              <span className="text-[10px] font-bold ml-0.5">({healthScore.grade})</span>
            </div>
          </button>

          {/* Sound Toggle (if provided) */}
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute feedback sounds' : 'Enable feedback sounds'}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition cursor-pointer"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Mobile Phone Mockup Frame Toggle */}
          {onToggleMobileFrame && (
            <button
              onClick={onToggleMobileFrame}
              title={isMobileFrameActive ? 'Switch to Full Desktop View' : 'Preview in Mobile Smartphone Frame'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isMobileFrameActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border-white/[0.08]'
              }`}
            >
              {isMobileFrameActive ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden xl:inline">Phone Frame</span>
                </>
              )}
            </button>
          )}

          {/* Install APK / Mobile PWA Modal Button */}
          <button
            onClick={onOpenApkModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm border border-emerald-400/30 transition cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Install APK</span>
            <span className="sm:hidden">APK</span>
          </button>

          {/* Reset Sandbox */}
          <button
            onClick={onResetData}
            title="Reset sandbox state to pristine baseline"
            className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Sub-Navbar */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-1 px-4 py-2 border-t scrollbar-none transition-colors" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-400 text-slate-950">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
