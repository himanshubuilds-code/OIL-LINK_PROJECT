import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertOctagon, 
  Clock, 
  Calendar, 
  HardHat, 
  FileSpreadsheet, 
  Activity 
} from 'lucide-react';

export const ExecutiveAnalytics: React.FC = () => {
  // S-Curve monthly cumulative data points
  const sCurveData = [
    { month: 'Jan', planned: 5, actual: 5 },
    { month: 'Feb', planned: 14, actual: 16 },
    { month: 'Mar', planned: 28, actual: 24 },
    { month: 'Apr', planned: 45, actual: 38 },
    { month: 'May (Proj)', planned: 64, actual: null },
    { month: 'Jun (Proj)', planned: 82, actual: null },
    { month: 'Jul (Proj)', planned: 100, actual: null },
  ];

  // Variance hotspots per discipline
  const varianceHotspots = [
    { discipline: 'Electrical & Instrumentation', planned: '35%', actual: '12%', delta: '-23%', risk: 'High', delayDays: 14 },
    { discipline: 'Mechanical & Piping', planned: '45%', actual: '38%', delta: '-7%', risk: 'Medium', delayDays: 5 },
    { discipline: 'Civil & Foundation', planned: '70%', actual: '75%', delta: '+5%', risk: 'Low', delayDays: 0 },
    { discipline: 'Structural Steel Erection', planned: '52%', actual: '50%', delta: '-2%', risk: 'Low', delayDays: 2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Schedule Performance (SPI)</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">0.84</p>
          <p className="text-[11px] text-amber-600 font-medium flex items-center gap-1 mt-1">
            <TrendingDown className="w-3.5 h-3.5" /> 16% Behind Planned Cadence
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Critical Path Variance</span>
            <AlertOctagon className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">-14 Days</p>
          <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
            Zone 2 Overhead Trays Critical
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">AI Match Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">92.4%</p>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
            41 Voice logs auto-reconciled
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Target Completion</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-800">30 Dec 2026</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            P6 Rev-03 Baseline locked
          </p>
        </div>
      </div>

      {/* S-Curve Graph Visualizer */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Project S-Curve: Cumulative Progress (%)</h3>
            <p className="text-xs text-slate-500">Compares baseline planned timeline against approved field supervisor logs</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-slate-300 rounded"></span>
              <span className="text-slate-600">P6 Planned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-blue-600 rounded"></span>
              <span className="text-blue-700">Actual Approved</span>
            </div>
          </div>
        </div>

        {/* CSS-Only Accessible S-Curve Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-7 gap-3 items-end h-44 border-b border-slate-200 px-2">
            {sCurveData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full flex items-end justify-center gap-1.5 h-full">
                  {/* Planned Bar */}
                  <div 
                    className="w-1/3 bg-slate-200 rounded-t transition-all hover:bg-slate-300 relative group"
                    style={{ height: `${item.planned}%` }}
                  >
                    <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded">
                      {item.planned}%
                    </span>
                  </div>
                  {/* Actual Bar */}
                  {item.actual !== null ? (
                    <div 
                      className="w-1/3 bg-blue-600 rounded-t transition-all hover:bg-blue-700 relative group"
                      style={{ height: `${item.actual}%` }}
                    >
                      <span className="hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 rounded">
                        {item.actual}%
                      </span>
                    </div>
                  ) : (
                    <div className="w-1/3 border-b-2 border-dashed border-slate-300 h-1"></div>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-slate-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discrepancy & Root Cause Heatmap */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-800">Discrepancy Hotspots & Delay Attribution</h3>
          <p className="text-xs text-slate-500">Identified via field logs mapped to schedule nodes</p>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-semibold bg-white">
              <th className="py-3 px-4">Discipline</th>
              <th className="py-3 px-3">Target P6</th>
              <th className="py-3 px-3">Field Actual</th>
              <th className="py-3 px-3">Schedule Variance</th>
              <th className="py-3 px-3">Estimated Delay</th>
              <th className="py-3 px-4 text-right">Risk Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {varianceHotspots.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-800">{row.discipline}</td>
                <td className="py-3 px-3 text-slate-600">{row.planned}</td>
                <td className="py-3 px-3 font-semibold text-slate-800">{row.actual}</td>
                <td className="py-3 px-3">
                  <span className={`font-bold ${row.delta.startsWith('+') ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {row.delta}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-600 font-medium">
                  {row.delayDays > 0 ? `${row.delayDays} Days` : 'On Schedule'}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    row.risk === 'High' 
                      ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                      : row.risk === 'Medium' 
                      ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {row.risk}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

