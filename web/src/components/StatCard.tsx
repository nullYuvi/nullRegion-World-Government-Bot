import React from 'react';

export function StatCard({ title, value, icon: Icon, trend, colorClass }: any) {
  return (
    <div className="relative overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl transition-all hover:bg-zinc-900/80 hover:border-white/10 group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} className={colorClass} />
      </div>
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="text-sm font-medium text-zinc-400">{title}</div>
        <div className={`p-2 rounded-xl bg-white/5 ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        {trend && (
          <div className="mt-2 text-xs font-medium text-emerald-400 flex items-center gap-1">
            <span className="text-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 rounded-md">+{trend}%</span> from last month
          </div>
        )}
      </div>
    </div>
  );
}
