import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Shield, Hash, Activity } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export function Dashboard({ user }: { user: any }) {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get('/api/guild/stats').then(res => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <div className="p-8 text-zinc-500 animate-pulse">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome back, {user?.username}</h1>
        <p className="text-zinc-400">Here's what's happening in nullRegion today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Members" value={stats.memberCount} icon={Users} colorClass="text-blue-400" trend="12" />
        <StatCard title="Roles Configured" value={stats.roleCount} icon={Shield} colorClass="text-amber-400" />
        <StatCard title="Active Channels" value={stats.channelCount} icon={Hash} colorClass="text-emerald-400" />
        <StatCard title="Bot Ping" value={`${stats.ping}ms`} icon={Activity} colorClass="text-rose-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-2xl p-6 h-96 flex items-center justify-center">
          <p className="text-zinc-500">Activity Chart Placeholder</p>
        </div>
        <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 space-y-6">
          <h3 className="font-semibold text-white">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Bot Process</span>
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Discord Gateway</span>
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> Connected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">API Latency</span>
              <span className="text-sm font-medium text-zinc-300">{stats.ping}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
