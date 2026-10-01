import React from 'react';
import { Settings as SettingsIcon, Database, Lock } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">System Settings</h1>
        <p className="text-sm text-zinc-400">Configure bot parameters and dashboard access</p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-zinc-200 font-medium border-b border-white/5 pb-4">
            <Database size={18} className="text-amber-500" /> Environment Variables
          </div>
          <p className="text-sm text-zinc-400 mb-4">Configuration is currently managed via Railway environment variables (.env file) for security.</p>
          <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-zinc-500 space-y-2">
            <div>DISCORD_TOKEN=********</div>
            <div>DISCORD_CLIENT_ID=1555...</div>
            <div>GUILD_ID=...</div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4 text-zinc-200 font-medium border-b border-white/5 pb-4">
            <Lock size={18} className="text-amber-500" /> Security
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Dashboard Access</div>
              <div className="text-xs text-zinc-500">Only users with Administrator permission in Discord can access this panel.</div>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">Enforced</div>
          </div>
        </div>
      </div>
    </div>
  );
}
