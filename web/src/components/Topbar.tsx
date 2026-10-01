import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function Topbar({ setSidebarOpen }: { setSidebarOpen: (v: boolean) => void }) {
  const location = useLocation();
  const pathName = location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1).replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center text-sm font-medium text-zinc-400">
          <span>nullRegion</span>
          <span className="mx-2 text-zinc-600">/</span>
          <span className="text-zinc-100">{pathName}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 h-9 pl-9 pr-4 bg-zinc-900/50 border border-white/10 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent transition-all"
          />
        </div>
        <button className="relative p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-[#0a0a0c]" />
        </button>
      </div>
    </header>
  );
}
