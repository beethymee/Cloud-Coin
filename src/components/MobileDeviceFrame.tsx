import React from 'react';
import {
  Wifi,
  Battery,
  Signal,
  Activity,
  Layers,
  Calendar,
  MessageSquare,
  Plus,
} from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickAdd?: () => void;
  isMobileFrameActive: boolean;
  onToggleMobileFrame: () => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  activeTab,
  setActiveTab,
  onOpenQuickAdd,
  isMobileFrameActive,
}) => {
  // If desktop mode is active, render regular full width container
  if (!isMobileFrameActive) {
    return <>{children}</>;
  }

  return (
    <div className="py-6 px-2 sm:px-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] animate-fadeIn">
      {/* Phone Shell with realistic smartphone bezel */}
      <div
        className="relative w-full max-w-[430px] rounded-[52px] border-[12px] border-slate-800 dark:border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col h-[880px] transition-colors"
        style={{ backgroundColor: 'var(--app-bg)' }}
      >
        {/* Phone Speaker & Dynamic Island Status Bar */}
        <div
          className="relative z-30 pt-3.5 pb-2 px-6 flex items-center justify-between text-[11px] font-medium shrink-0 select-none border-b transition-colors"
          style={{
            backgroundColor: 'var(--header-bg)',
            borderColor: 'var(--header-border)',
            color: 'var(--app-text)',
          }}
        >
          {/* Time */}
          <span className="font-bold tracking-tight">9:41</span>

          {/* Dynamic Island Pill */}
          <div className="h-6 px-3.5 rounded-full bg-slate-900 text-white border border-white/20 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-semibold tracking-wide text-emerald-400">FinTrack Live</span>
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 opacity-80">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        {/* Scrollable Mobile App Viewport */}
        <div
          className="flex-1 overflow-y-auto scrollbar-none p-3 pb-24 transition-colors"
          style={{ backgroundColor: 'var(--app-bg)', color: 'var(--app-text)' }}
        >
          {children}
        </div>

        {/* Mobile Bottom Navigation Dock */}
        <div
          className="absolute bottom-0 inset-x-0 backdrop-blur-xl border-t px-3 pt-2 pb-6 flex items-center justify-around z-30 select-none transition-colors"
          style={{
            backgroundColor: 'var(--header-bg)',
            borderColor: 'var(--header-border)',
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'overview'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('budgeting')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'budgeting'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Budgets</span>
          </button>

          {/* Floating Action Button */}
          {onOpenQuickAdd && (
            <button
              onClick={onOpenQuickAdd}
              className="-mt-5 w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold flex items-center justify-center shadow-lg shadow-emerald-600/30 border-2 border-white dark:border-slate-900 active:scale-95 transition cursor-pointer"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
            </button>
          )}

          <button
            onClick={() => setActiveTab('bills')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'bills'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Bills</span>
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition cursor-pointer ${
              activeTab === 'copilot'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Copilot</span>
          </button>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-40 pointer-events-none">
          <div className="w-32 h-1 bg-slate-400/40 dark:bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
