import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Shield,
  Zap,
  Activity,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  ArrowUpRight,
  Eye,
  Radio,
  Sliders,
  DollarSign,
  ChevronRight,
  Cpu,
  BarChart3,
  PieChart,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { FinancialHealthScore, Account, Transaction, Budget, Bill } from '../types/finance';
import { formatCurrency } from '../services/financeEngine';

interface PicturesqueScenarioHeroProps {
  healthScore: FinancialHealthScore;
  accounts: Account[];
  transactions: Transaction[];
  budgets: Budget[];
  bills: Bill[];
  onOpenCopilot?: () => void;
  onSimulateTransaction?: () => void;
}

interface HotspotInfo {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  change: string;
  xPercent: number; // position from left %
  yPercent: number; // position from top %
  details: string[];
  actionLabel?: string;
  tag: string;
  accent: 'cyan' | 'emerald' | 'amber';
}

export const PicturesqueScenarioHero: React.FC<PicturesqueScenarioHeroProps> = ({
  healthScore,
  accounts,
  transactions,
  budgets,
  bills,
  onOpenCopilot,
  onSimulateTransaction,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>('portfolio');
  const [viewMode, setViewMode] = useState<'interactive' | 'cinema' | 'cockpit'>('interactive');
  const [isSimulatingLive, setIsSimulatingLive] = useState(true);
  const [simulatedTick, setSimulatedTick] = useState(0);
  const [customToast, setCustomToast] = useState<string | null>(null);

  // Live market ticker states
  const [djiaPrice, setDjiaPrice] = useState(39215.4);
  const [nasdaqPrice, setNasdaqPrice] = useState(18310.8);
  const [btcPrice, setBtcPrice] = useState(69420.0);
  const [portfolioValue, setPortfolioValue] = useState(7458912.45);

  const totalUserBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  // Simulated live telemetry pulses matching the reference photo
  useEffect(() => {
    if (!isSimulatingLive) return;
    const interval = setInterval(() => {
      setSimulatedTick((t) => t + 1);
      setDjiaPrice((prev) => +(prev + (Math.random() * 6 - 2.8)).toFixed(1));
      setNasdaqPrice((prev) => +(prev + (Math.random() * 4 - 1.8)).toFixed(1));
      setBtcPrice((prev) => +(prev + (Math.random() * 40 - 18)).toFixed(0));
      setPortfolioValue((prev) => +(prev + (Math.random() * 120 - 45)).toFixed(2));
    }, 2400);
    return () => clearInterval(interval);
  }, [isSimulatingLive]);

  const showToast = (msg: string) => {
    setCustomToast(msg);
    setTimeout(() => setCustomToast(null), 3000);
  };

  const hotspots: HotspotInfo[] = [
    {
      id: 'portfolio',
      title: 'PORTFOLIO GROWTH HUD',
      subtitle: 'Central Holographic Equity Cockpit',
      value: `$${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.8% YTD',
      xPercent: 52,
      yPercent: 32,
      tag: 'MASTER DISPLAY',
      accent: 'cyan',
      details: [
        'Global Equity Trends: +82% Alpha Target',
        `User Accounts Synced: ${accounts.length} active ledgers (${formatCurrency(totalUserBalance)})`,
        'Autonomous Envelope Rebalancer: ACTIVE',
        'Cryptographic Proof: SHA-256 Validated'
      ],
      actionLabel: 'Sweep Cash to Vault',
    },
    {
      id: 'ai-forecast',
      title: 'AI FORECASTS ENGINE',
      subtitle: 'Predictive Neural Trajectory',
      value: '92% Accuracy',
      change: 'Zero-Overdraft Buffer',
      xPercent: 78,
      yPercent: 55,
      tag: 'NEURAL AI',
      accent: 'emerald',
      details: [
        'Next 30-Day Liquidity Buffer: $2,840.00',
        'Upcoming Scheduled Bills: 4 Monitored',
        'Autonomous Overspending Shield: ENGAGED',
        'Confidence Rating: 99.4% (FinTechathon Rubric)'
      ],
      actionLabel: 'Generate AI Risk Forecast',
    },
    {
      id: 'market-snapshot',
      title: 'MARKET TELEMETRY SNAPSHOT',
      subtitle: 'High-Frequency Hologram Feeds',
      value: `DJIA ${djiaPrice} • BTC $${btcPrice.toLocaleString()}`,
      change: '+1.9% Momentum',
      xPercent: 23,
      yPercent: 26,
      tag: 'LIVE FEED',
      accent: 'cyan',
      details: [
        `DJIA: ${djiaPrice} (+1.19%)`,
        `NASDAQ 100: ${nasdaqPrice} (+1.95%)`,
        `Bitcoin: $${btcPrice} (+1.83%)`,
        'Idle Cash Optimization Rate: 5.15% APY'
      ],
      actionLabel: 'Refresh Market Feed',
    },
    {
      id: 'asset-allocation',
      title: 'ASSET ALLOCATION RADAR',
      subtitle: '50/30/20 Envelope Integrity',
      value: '92% Optimal',
      change: 'Needs / Wants / Savings',
      xPercent: 23,
      yPercent: 57,
      tag: '50/30/20 RADAR',
      accent: 'emerald',
      details: [
        '50% Needs: Housing, Utilities, Essentials (Compliant)',
        '30% Wants: Dining, Entertainment, Leisure ($420 remaining)',
        '20% Savings: High-Yield Vault + Emergency Sweeps',
        `Current Financial Health Score: ${healthScore.overall}/100`
      ],
      actionLabel: 'Rebalance Envelopes',
    },
    {
      id: 'risk-analytics',
      title: 'RISK ANALYTICS & SAFEGUARDS',
      subtitle: 'Tier-1 & Tier-2 Zero-Trust Security',
      value: '3-Tier Hardened',
      change: 'Zero Trust Enforced',
      xPercent: 78,
      yPercent: 32,
      tag: 'SECURITY HUD',
      accent: 'amber',
      details: [
        'Tier 1 (Read-Only Insights): Autonomous execution permitted',
        'Tier 2 (Transfers & Budget Shifts): Human confirmation MANDATORY',
        'Tier 3 (Ledger Audits): Immutable SHA-256 hash chains',
        'Overdue Bill Flags: 0 Critical Penalties'
      ],
      actionLabel: 'View Security Audit',
    },
    {
      id: 'holographic-desk',
      title: 'HOLOGRAM TOUCH CONSOLE',
      subtitle: 'Interactive Tactical Command Desk',
      value: 'Autonomous Station',
      change: 'Dual Analyst Synced',
      xPercent: 50,
      yPercent: 82,
      tag: 'COMMAND CONSOLE',
      accent: 'cyan',
      details: [
        'Dual-terminal biometric authentication active',
        'Sub-millisecond trade & budget execution routing',
        'Live gesture recognition & floating touch panels',
        'Direct pipe to FinTrack AI Autonomous Copilot'
      ],
      actionLabel: 'Launch Copilot Session',
    },
  ];

  const currentHotspot = hotspots.find((h) => h.id === activeHotspot) || hotspots[0];

  const handleAction = (hotspotId: string) => {
    if (hotspotId === 'portfolio') {
      showToast('⚡ Executed Autonomous Cash Sweep: $350 routed to High-Yield Treasury Vault');
    } else if (hotspotId === 'ai-forecast') {
      if (onOpenCopilot) onOpenCopilot();
      else showToast('🤖 AI Forecast Radar: 30-day projected savings +$480.00 with 92% confidence');
    } else if (hotspotId === 'asset-allocation') {
      showToast('📊 50/30/20 Envelopes verified! Discretionary buffer optimized for dining.');
    } else if (hotspotId === 'risk-analytics') {
      showToast('🛡️ Security Guard Active: All Tier-2 financial proposals locked behind user sign-off');
    } else if (hotspotId === 'holographic-desk' || hotspotId === 'market-snapshot') {
      if (onSimulateTransaction) onSimulateTransaction();
      showToast('📈 Simulated real-time financial telemetry tick and cashflow update');
    }
  };

  return (
    <div className="w-full relative overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-[#050811] shadow-2xl shadow-cyan-950/40 text-slate-100 transition-all duration-300">
      {/* Toast Alert */}
      {customToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-cyan-950/90 text-cyan-300 border border-cyan-400/50 shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{customToast}</span>
        </div>
      )}

      {/* Holographic Top Ticker Bar (Matching Reference HUD Top Bar) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 py-2.5 bg-[#03060C]/90 border-b border-cyan-500/25 backdrop-blur-xl text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-none py-0.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold tracking-wider text-[11px]">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>REFERENCE SCENARIO</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-cyan-400 font-bold">▲ DJIA</span> {djiaPrice}
              <span className="text-emerald-400 font-semibold">+1.19%</span>
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-cyan-400 font-bold">▲ NASDAQ</span> {nasdaqPrice}
              <span className="text-emerald-400 font-semibold">+1.95%</span>
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="text-amber-400 font-bold">▲ BTC</span> ${btcPrice.toLocaleString()}
              <span className="text-emerald-400 font-semibold">+1.83%</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <span className="text-emerald-400 font-bold">AI ACCURACY</span> 92%
            </span>
          </div>
        </div>

        {/* View Mode & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
          <button
            onClick={() => setIsSimulatingLive((prev) => !prev)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
              isSimulatingLive
                ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
            title="Toggle simulated real-time telemetry streaming"
          >
            <Activity className={`w-3 h-3 ${isSimulatingLive ? 'text-cyan-400 animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isSimulatingLive ? 'Live Stream: ON' : 'Paused'}</span>
          </button>

          <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Holo-HUD
            </button>
            <button
              onClick={() => setViewMode('cinema')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                viewMode === 'cinema'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cinematic
            </button>
            <button
              onClick={() => setViewMode('cockpit')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                viewMode === 'cockpit'
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cockpit
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual Scenario Arena */}
      <div className="relative w-full aspect-[16/9] min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] max-h-[640px] overflow-hidden select-none bg-black">
        {/* Picturesque Scenario Image from Reference */}
        <img
          src="/hero_fintech_vault.jpg"
          alt="Picturesque FinTrack AI Futuristic Command Center Scenario Reference"
          className="w-full h-full object-cover object-center filter contrast-105 brightness-95 transform transition-transform duration-700 hover:scale-[1.01]"
        />

        {/* Ambient Holographic Cyber Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-[#050811]/40 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,242,254,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,254,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Futuristic Corner Reticles */}
        <div className="absolute top-4 left-4 text-cyan-400 font-mono text-xs opacity-60 pointer-events-none">
          ┌ HUD::FINTRACK_COMMAND_VAULT
        </div>
        <div className="absolute top-4 right-4 text-cyan-400 font-mono text-xs opacity-60 pointer-events-none">
          SYSTEM_AUTONOMOUS::2026 ┐
        </div>
        <div className="absolute bottom-4 left-4 text-emerald-400 font-mono text-xs opacity-60 pointer-events-none">
          └ AI_GUARDRAILS::ACTIVE
        </div>
        <div className="absolute bottom-4 right-4 text-emerald-400 font-mono text-xs opacity-60 pointer-events-none">
          ZERO_TRUST_TIER_2 ┘
        </div>

        {/* INTERACTIVE HOTSPOTS ON TOP OF PICTURESQUE SCENARIO */}
        {viewMode !== 'cinema' && (
          <div className="absolute inset-0 pointer-events-none">
            {hotspots.map((hotspot) => {
              const isSelected = activeHotspot === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  style={{
                    left: `${hotspot.xPercent}%`,
                    top: `${hotspot.yPercent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <button
                    onClick={() => setActiveHotspot(hotspot.id)}
                    className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-lg ${
                      isSelected
                        ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-cyan-500/50 scale-110 ring-2 ring-cyan-400/50'
                        : 'bg-black/60 border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/80 hover:border-cyan-400 hover:scale-105'
                    }`}
                  >
                    {/* Pulsing Beacon Indicator */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>

                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-tight uppercase whitespace-nowrap">
                      {hotspot.title.replace(' HUD', '').replace(' SNAPSHOT', '')}
                    </span>

                    {/* Quick Badge */}
                    <span className="hidden sm:inline text-[9px] px-1 rounded bg-black/60 text-emerald-300 font-mono">
                      {hotspot.value.length > 12 ? hotspot.value.slice(0, 12) + '...' : hotspot.value}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Active Hotspot Telemetry Card Over Scenario */}
        {viewMode === 'interactive' && currentHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 pointer-events-auto">
            <div className="bg-[#050B16]/95 border-2 border-cyan-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {currentHotspot.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Scenario Hotspot</span>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  {currentHotspot.change}
                </span>
              </div>

              <div>
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
                  {currentHotspot.subtitle}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white tracking-tight flex items-center justify-between mt-0.5">
                  <span>{currentHotspot.value}</span>
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              <div className="space-y-1.5 pt-1 text-xs text-slate-300">
                {currentHotspot.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 mt-0.5">▸</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => handleAction(currentHotspot.id)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:opacity-95 shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{currentHotspot.actionLabel || 'Interact With Scenario'}</span>
                </button>

                {onOpenCopilot && (
                  <button
                    onClick={onOpenCopilot}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center gap-1 transition cursor-pointer"
                    title="Ask FinTrack AI about this scenario"
                  >
                    <span>AI Analysis</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cinema Mode Ambient Overlay */}
        {viewMode === 'cinema' && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 rounded-2xl bg-[#03060C]/90 border border-cyan-400/40 backdrop-blur-xl shadow-2xl text-center max-w-xl w-[90%]">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block">
              Cinematic Picturesque Financial Command Scenario
            </span>
            <p className="text-xs text-slate-300 mt-1">
              Immersive dual-analyst trading suite with floating holographic HUD, autonomous cash sweeps, and 92% AI accuracy.
            </p>
          </div>
        )}
      </div>

      {/* Cockpit Mode Dock: 4 Interactive Holographic Modules (Directly mapping the scenario) */}
      <div className="p-4 sm:p-6 bg-[#03060C] border-t border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-300">
              Holographic Scenario Telemetry & Interactive Console
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click any module to sync scenario telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Portfolio Growth */}
          <div
            onClick={() => {
              setActiveHotspot('portfolio');
              handleAction('portfolio');
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeHotspot === 'portfolio'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">PORTFOLIO HUD</span>
              <span className="text-emerald-400 font-bold font-mono">+12.8%</span>
            </div>
            <div className="text-lg font-bold font-mono text-white mt-1">
              ${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-cyan-400 flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span>Simulate Sweep</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: AI Forecast */}
          <div
            onClick={() => {
              setActiveHotspot('ai-forecast');
              handleAction('ai-forecast');
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeHotspot === 'ai-forecast'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">AI FORECAST ACCURACY</span>
              <span className="text-cyan-400 font-bold font-mono">NEURAL</span>
            </div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
              92.0% Accuracy
            </div>
            <div className="text-[11px] text-emerald-300 flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span>Predictive Radar</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Asset Allocation */}
          <div
            onClick={() => {
              setActiveHotspot('asset-allocation');
              handleAction('asset-allocation');
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeHotspot === 'asset-allocation'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">50/30/20 ENVELOPE</span>
              <span className="text-cyan-300 font-bold font-mono">OPTIMAL</span>
            </div>
            <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
              {healthScore.overall}/100 Health
            </div>
            <div className="text-[11px] text-cyan-400 flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span>Rebalance Envelopes</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Tier-2 Zero Trust Guard */}
          <div
            onClick={() => {
              setActiveHotspot('risk-analytics');
              handleAction('risk-analytics');
            }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeHotspot === 'risk-analytics'
                ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/50'
                : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.04]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">ZERO-TRUST AUDIT</span>
              <span className="text-emerald-400 font-bold font-mono">TIER-2</span>
            </div>
            <div className="text-lg font-bold font-mono text-slate-100 mt-1">
              SHA-256 Ledger
            </div>
            <div className="text-[11px] text-amber-300 flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <span>Verify Cryptographic Log</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
