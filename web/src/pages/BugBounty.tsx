import React from 'react';
import { Bug, CheckCircle } from 'lucide-react';

export function BugBounty() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Bug Bounty</h1>
        <p className="text-sm text-zinc-400">Manage security reports and bounties</p>
      </div>
      <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20">
        <Bug size={48} className="mx-auto text-zinc-600 mb-4" />
        <h3 className="text-lg font-medium text-zinc-300">No Open Reports</h3>
        <p className="text-sm text-zinc-500">All bug bounty submissions are currently resolved.</p>
      </div>
    </div>
  );
}
