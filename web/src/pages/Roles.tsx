import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield } from 'lucide-react';

export function Roles() {
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => { axios.get('/api/roles').then(res => setRoles(res.data)); }, []);
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Roles</h1>
        <p className="text-sm text-zinc-400">Server role hierarchy and permissions</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map(r => (
          <div key={r.id} className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: r.color }} />
                <h3 className="font-semibold text-zinc-100">{r.name}</h3>
              </div>
              {r.managed && <Shield size={16} className="text-blue-400" title="Managed by Integration" />}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-500">Members</span>
              <span className="text-zinc-300 font-medium">{r.memberCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
