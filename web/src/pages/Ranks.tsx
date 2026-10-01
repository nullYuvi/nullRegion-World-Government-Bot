import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Crown, Anchor, Swords } from 'lucide-react';

export function Ranks() {
  const [ranks, setRanks] = useState<any[]>([]);
  useEffect(() => { axios.get('/api/ranks').then(res => setRanks(res.data)); }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cinzel, serif' }}>One Piece Ranks</h1>
        <p className="text-sm text-zinc-400">Automated rank progression hierarchy</p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent" />
        <div className="space-y-4 relative">
          {ranks.map((r, i) => (
            <div key={r.key} className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#111] border-2 border-amber-500/30 flex items-center justify-center flex-shrink-0 z-10 text-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.1)]">
                {i === 0 ? <Crown size={24} /> : i < 3 ? <Swords size={24} /> : <Anchor size={24} />}
              </div>
              <div className="flex-1 bg-zinc-900/50 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-100">{r.name}</h3>
                  <p className="text-xs text-zinc-500 font-mono mt-1">{r.roleId || 'Unconfigured'}</p>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg">
                  <Users size={16} />
                  <span className="font-medium">{r.memberCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
