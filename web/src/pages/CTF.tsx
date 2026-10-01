import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flag, Trophy, Target } from 'lucide-react';

export function CTF() {
  const [ctf, setCtf] = useState<any[]>([]);
  useEffect(() => { axios.get('/api/ctf').then(res => setCtf(res.data)); }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">CTF Operations</h1>
        <p className="text-sm text-zinc-400">Active capture the flag challenges</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ctf.map(c => (
          <div key={c.name} className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><Flag size={20} /></div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">{c.points} PTS</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{c.name}</h3>
            <p className="text-xs text-zinc-500 mb-4 uppercase tracking-wider">{c.category}</p>
            <p className="text-sm text-zinc-400 flex-1">{c.description}</p>
          </div>
        ))}
        {ctf.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <Target size={48} className="mx-auto text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-zinc-300">No Active Challenges</h3>
            <p className="text-sm text-zinc-500">Configure CTF challenges in the discord server.</p>
          </div>
        )}
      </div>
    </div>
  );
}
