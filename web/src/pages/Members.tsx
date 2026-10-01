import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, MoreVertical, ShieldAlert, Ban } from 'lucide-react';

export function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = () => {
    axios.get('/api/members').then(res => setMembers(res.data)).finally(() => setLoading(false));
  };

  const handleAction = async (id: string, action: 'kick' | 'ban') => {
    if (!confirm(`Are you sure you want to ${action} this member?`)) return;
    try {
      await axios.post(`/api/members/${id}/${action}`, { reason: 'Action via Dashboard' });
      fetchMembers();
    } catch (err: any) {
      alert(err.response?.data?.error || `Failed to ${action} member`);
    }
  };

  if (loading) return <div className="p-8 text-zinc-500">Loading members...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Members</h1>
          <p className="text-sm text-zinc-400">Manage members of nullRegion</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input type="text" placeholder="Search members..." className="pl-9 pr-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none w-64" />
          </div>
          <button className="p-2 border border-white/10 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"><Filter size={18} /></button>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-900/80 border-b border-white/5 text-zinc-400">
            <tr>
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Roles</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {members.slice(0, 50).map(m => (
              <tr key={m.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar || 'https://cdn.discordapp.com/embed/avatars/0.png'} className="w-10 h-10 rounded-full bg-zinc-800" />
                    <div>
                      <div className="font-medium text-zinc-100">{m.displayName}</div>
                      <div className="text-xs text-zinc-500">{m.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {m.roles.slice(0,3).map((r: any) => (
                      <span key={r.id} style={{ color: r.color, borderColor: r.color + '40', backgroundColor: r.color + '10' }} className="text-xs px-2 py-0.5 rounded-full border">
                        {r.name}
                      </span>
                    ))}
                    {m.roles.length > 3 && <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-zinc-500">+{m.roles.length - 3}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">{new Date(m.joinedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleAction(m.id, 'kick')} className="p-1.5 text-amber-500 hover:bg-amber-500/10 rounded-lg transition-colors tooltip" title="Kick">
                      <ShieldAlert size={16} />
                    </button>
                    <button onClick={() => handleAction(m.id, 'ban')} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" title="Ban">
                      <Ban size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
