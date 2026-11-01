import React from 'react';
import { 
  Mic, 
  GitMerge, 
  CalendarDays, 
  BarChart3, 
  HardHat, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';

export type TabType = 'logger' | 'reconciliation' | 'gantt' | 'analytics';

interface AppLayoutProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ activeTab, onTabChange, children }) => {
  const navItems = [
    { id: 'logger' as TabType, label: 'Voice Time Agent', icon: Mic, badge: 'Field' },
    { id: 'reconciliation' as TabType, label: 'Schedule Matcher', icon: GitMerge, badge: 'AI Queue' },
    { id: 'gantt' as TabType, label: 'WBS & Gantt', icon: CalendarDays },
    { id: 'analytics' as TabType, label: 'Executive Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between">
        <div>
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-slate-800">OIL-LINK 122</h1>
              <p className="text-xs text-slate-400">P6 / Field Sync Layer</p>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-700">Project: Duliajan Block 4</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Schedule Baseline: Rev-03 Active</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Workspace</span>
            <span className="text-xs text-slate-300">/</span>
            <span className="text-sm font-semibold text-slate-700 capitalize">
              {activeTab}
            </span>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
            Ready for Components
          </span>
        </header>

        <section className="flex-1 overflow-y-auto p-6">
          {children}
        </section>
      </main>
    </div>
  );
};

