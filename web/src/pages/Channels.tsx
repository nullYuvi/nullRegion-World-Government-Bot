import React from 'react';
import { Hash } from 'lucide-react';

export function Channels() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Channels</h1>
        <p className="text-sm text-zinc-400">Manage server channels and categories</p>
      </div>
      <div className="py-12 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20">
        <Hash size={48} className="mx-auto text-zinc-600 mb-4" />
        <h3 className="text-lg font-medium text-zinc-300">Channel Management</h3>
        <p className="text-sm text-zinc-500">Channel management is handled within Discord.</p>
      </div>
    </div>
  );
}
