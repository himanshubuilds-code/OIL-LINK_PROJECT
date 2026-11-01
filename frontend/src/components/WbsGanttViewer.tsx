import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  Layers
} from 'lucide-react';

interface WbsNode {
  id: string;
  wbsCode: string;
  name: string;
  level: number;
  startDate: string;
  endDate: string;
  progress: number;
  plannedProgress: number;
  status: 'on-track' | 'delayed' | 'completed';
  children?: WbsNode[];
}

const wbsHierarchy: WbsNode[] = [
  {
    id: '1',
    wbsCode: 'OIL.DU4',
    name: 'Duliajan Block 4 Processing Facility',
    level: 1,
    startDate: '01 Jan 2026',
    endDate: '30 Dec 2026',
    progress: 42,
    plannedProgress: 48,
    status: 'delayed',
    children: [
      {
        id: '1.1',
        wbsCode: 'OIL.DU4.CIV',
        name: 'Civil & Structural Works',
        level: 2,
        startDate: '01 Jan 2026',
        endDate: '15 Jun 2026',
        progress: 75,
        plannedProgress: 70,
        status: 'on-track',
        children: [
          {
            id: '1.1.1',
            wbsCode: 'ACT-0831',
            name: 'Flare Pit Trench Earthwork & Excavation',
            level: 3,
            startDate: '10 Feb 2026',
            endDate: '28 Mar 2026',
            progress: 100,
            plannedProgress: 100,
            status: 'completed',
          }
        ]
      },
      {
        id: '1.2',
        wbsCode: 'OIL.DU4.PIP',
        name: 'Mechanical & Piping Installation',
        level: 2,
        startDate: '15 Feb 2026',
        endDate: '30 Aug 2026',
        progress: 38,
        plannedProgress: 45,
        status: 'delayed',
        children: [
          {
            id: '1.2.1',
            wbsCode: 'ACT-1094',
            name: 'Pipe Spool Welding & Fit-up - Bay 4',
            level: 3,
            startDate: '01 Mar 2026',
            endDate: '15 Apr 2026',
            progress: 58,
            plannedProgress: 60,
            status: 'on-track',
          },
          {
            id: '1.2.2',
            wbsCode: 'ACT-1450',
            name: 'Overhead Cable Tray Installation - Zone 2',
            level: 3,
            startDate: '10 Mar 2026',
            endDate: '20 Apr 2026',
            progress: 12,
            plannedProgress: 35,
            status: 'delayed',
          }
        ]
      }
    ]
  }
];

export const WbsGanttViewer: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    '1': true,
    '1.1': true,
    '1.2': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderWbsRows = (nodes: WbsNode[]) => {
    return nodes.map((node) => {
      const isExpanded = expandedNodes[node.id];
      const hasChildren = node.children && node.children.length > 0;
      const variance = node.progress - node.plannedProgress;

      return (
        <React.Fragment key={node.id}>
          <tr className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors text-xs">
            {/* WBS Name & Indented Tree */}
            <td className="py-3 px-4">
              <div 
                className="flex items-center gap-1.5"
                style={{ paddingLeft: `${(node.level - 1) * 16}px` }}
              >
                {hasChildren ? (
                  <button 
                    onClick={() => toggleNode(node.id)}
                    className="p-1 hover:bg-slate-200 rounded text-slate-500"
                  >
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                ) : (
                  <span className="w-5" />
                )}
                {hasChildren ? (
                  <Folder className="w-4 h-4 text-blue-500 shrink-0" />
                ) : (
                  <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className="font-semibold text-slate-800">{node.name}</span>
                <span className="font-mono text-[10px] text-slate-400 ml-1">({node.wbsCode})</span>
              </div>
            </td>

            {/* Dates */}
            <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{node.startDate}</td>
            <td className="py-3 px-3 text-slate-500 whitespace-nowrap">{node.endDate}</td>

            {/* Actual vs Planned Gantt Bar */}
            <td className="py-3 px-4 min-w-[200px]">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Actual: {node.progress}%</span>
                  <span>Planned: {node.plannedProgress}%</span>
                </div>
                {/* Progress Tracks */}
                <div className="w-full bg-slate-100 rounded-full h-2 relative overflow-hidden">
                  {/* Planned Baseline Marker */}
                  <div 
                    className="bg-slate-300 h-full absolute left-0 top-0" 
                    style={{ width: `${node.plannedProgress}%` }}
                  />
                  {/* Actual Progress Fill */}
                  <div 
                    className={`h-full absolute left-0 top-0 rounded-full ${
                      node.status === 'delayed' 
                        ? 'bg-amber-500' 
                        : node.status === 'completed' 
                        ? 'bg-emerald-500' 
                        : 'bg-blue-600'
                    }`} 
                    style={{ width: `${node.progress}%` }}
                  />
                </div>
              </div>
            </td>

            {/* Schedule Variance */}
            <td className="py-3 px-3 text-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                variance < 0 
                  ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {variance > 0 ? `+${variance}%` : `${variance}%`}
              </span>
            </td>

            {/* Status */}
            <td className="py-3 px-3 text-right">
              {node.status === 'completed' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Done
                </span>
              )}
              {node.status === 'delayed' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                  <AlertCircle className="w-3.5 h-3.5" /> Delay Risk
                </span>
              )}
              {node.status === 'on-track' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                  <Clock className="w-3.5 h-3.5" /> In Progress
                </span>
              )}
            </td>
          </tr>

          {hasChildren && isExpanded && renderWbsRows(node.children!)}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Primavera P6 WBS & Baseline Schedule</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hierarchical project breakdown linked with real-time field progress approvals
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blue-600 rounded-sm"></span>
            <span className="text-slate-600 font-medium">Actual Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-slate-300 rounded-sm"></span>
            <span className="text-slate-600 font-medium">P6 Target Baseline</span>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-3 px-4">WBS Hierarchy / Activity</th>
                <th className="py-3 px-3">Start</th>
                <th className="py-3 px-3">Finish</th>
                <th className="py-3 px-4">Progress vs Baseline</th>
                <th className="py-3 px-3 text-center">Variance</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {renderWbsRows(wbsHierarchy)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

