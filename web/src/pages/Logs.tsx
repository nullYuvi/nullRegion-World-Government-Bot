import React from 'react';
import { FileText } from 'lucide-react';

export function Logs() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
        <p className="text-sm text-zinc-400">System and administration activity</p>
      </div>
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
         <div className="text-center py-8 text-zinc-500">
           <FileText size={32} className="mx-auto mb-3 opacity-50" />
           <p>Audit logs are currently viewable in Discord directly.</p>
         </div>
      </div>
    </div>
  );
}
