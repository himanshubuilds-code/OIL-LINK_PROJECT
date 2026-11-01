import React, { useState } from 'react';
import { AppLayout, TabType } from './components/layout/AppLayout';
import { VoiceTimeAgent } from './components/VoiceTimeAgent';
import { ScheduleMatcher } from './components/ScheduleMatcher';
import { WbsGanttViewer } from './components/WbsGanttViewer';
import { ExecutiveAnalytics } from './components/ExecutiveAnalytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('analytics');

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'logger' && <VoiceTimeAgent />}
      {activeTab === 'reconciliation' && <ScheduleMatcher />}
      {activeTab === 'gantt' && <WbsGanttViewer />}
      {activeTab === 'analytics' && <ExecutiveAnalytics />}
    </AppLayout>
  );
}




