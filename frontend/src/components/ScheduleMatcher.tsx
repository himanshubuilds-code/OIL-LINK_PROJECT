import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Filter, 
  Search,
  Check,
  X,
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';
import { useReconciliationQueue, useSubmitReconciliation } from '../lib/apiHooks';
import { ReconciliationRecord } from '../lib/apiTypes';

const fallbackQueue: ReconciliationRecord[] = [
  {
    id: 'REC-101',
    transcript: 'Aaj Bay 4 pe pipe spool welding 14 joints complete ho gaya, line 24 erection on schedule.',
    created_at: 'Today, 02:45 PM',
    p6_activity_id: 'ACT-1094',
    p6_activity_name: 'Pipe Spool Welding & Fit-up - Bay 4',
    discipline: 'Piping',
    logged_qty: '14 Joints',
    remaining_qty: '48 Joints',
    confidence: 94,
    status: 'pending',
    supervisor_id: 'SUP-882'
  },
  {
    id: 'REC-102',
    transcript: 'Excavation for flare pit foundation completed up to 80 cubic meters with 2 JCBs.',
    created_at: 'Today, 11:15 AM',
    p6_activity_id: 'ACT-0831',
    p6_activity_name: 'Flare Pit Trench Earthwork & Excavation',
    discipline: 'Civil',
    logged_qty: '80 m³',
    remaining_qty: '120 m³',
    confidence: 88,
    status: 'pending',
    supervisor_id: 'SUP-410'
  }
];

export const ScheduleMatcher: React.FC = () => {
  const { data: serverItems } = useReconciliationQueue();
  const submitMutation = useSubmitReconciliation();
  
  const [localOverrides, setLocalOverrides] = useState<Record<string, 'approved' | 'rejected'>>({});
  const [filterDiscipline, setFilterDiscipline] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const displayItems = ((serverItems || fallbackQueue || []) as any[]).map((item: any) => ({
    ...item,
    status: (localOverrides[item.id] || item.status) as 'pending' | 'approved' | 'rejected'
  }));

  const handleAction = (id: string, newStatus: 'approved' | 'rejected') => {
    setLocalOverrides((prev) => ({ ...prev, [id]: newStatus }));
    submitMutation.mutate({ id, status: newStatus });
  };

  const filteredItems = (displayItems || []).filter((item: any) => {
    const matchesDiscipline = filterDiscipline === 'all' || item.discipline === filterDiscipline;
    const matchesSearch = (item.p6_activity_name?.toLowerCase()?? '').includes(searchQuery.toLowerCase()) ||
                          (item.transcript?.toLowerCase()?? '').includes(searchQuery.toLowerCase());
    return matchesDiscipline && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Pending Reconciliation</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              {displayItems.filter((i) => i.status === 'pending').length}
            </p>
          </div>
          <span className="p-2.5 rounded-lg bg-amber-50 text-amber-600">
            <Clock className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">P6 Baseline Synced</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              {displayItems.filter((i) => i.status === 'approved').length}
            </p>
          </div>
          <span className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">FastAPI Model Mean</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">91%</p>
          </div>
          <span className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <Sparkles className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search field log or P6 activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterDiscipline}
            onChange={(e) => setFilterDiscipline(e.target.value)}
            className="text-xs font-medium border border-slate-200 rounded-lg px-2.5 py-2 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Disciplines</option>
            <option value="Piping">Piping</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
      </div>

      {/* Queue */}
      <div className="space-y-3">
        {filteredItems.map((item: any, index: number) => (
          <div
            key={item.id?? item.match_id ?? index}
            className={`bg-white rounded-xl border transition-all p-5 shadow-sm ${
              item.status === 'approved' 
                ? 'border-emerald-200 bg-emerald-50/20' 
                : item.status === 'rejected' 
                ? 'border-rose-200 bg-rose-50/20 opacity-60' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.discipline}
                  </span>
                  <span className="text-xs text-slate-400">{item.created_at}</span>
                </div>
                <p className="text-sm font-medium text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  "{item.transcript}"
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <span>Logged Qty: <strong className="text-slate-900">{item.logged_qty}</strong></span>
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-slate-300">
                <ArrowRight className="w-5 h-5" />
              </div>

              <div className="flex-1 bg-blue-50/40 border border-blue-100 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    {item.p6_activity_id}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.confidence > 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.confidence}% Match
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">
                  {item.p6_activity_name}
                </p>
                <p className="text-xs text-slate-500">
                  Remaining in Schedule: <span className="font-semibold text-slate-700">{item.remaining_qty}</span>
                </p>
              </div>

              <div className="flex lg:flex-col items-center gap-2 min-w-[130px] justify-end">
                {(item.status === 'pending' || item.status === 'PENDING' || !item.status) ?(
                  <>
                    <button
                      onClick={() => handleAction(item.id ?? item.match_id, 'approved')}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Approve Link
                    </button>
                    <button
                      onClick={() => handleAction(item.id ?? item.match_id, 'rejected')}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remap / Flag
                    </button>
                  </>
                ) : (
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                    item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status === 'approved' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {item.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




