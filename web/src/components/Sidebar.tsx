import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, Hash, Settings, Anchor, Activity, LogOut, ShieldAlert, Bug, FileText, Menu, X } from 'lucide-react';
import axios from 'axios';

export function Sidebar({ open, setOpen, user }: { open: boolean; setOpen: (v: boolean) => void; user: any }) {
  const location = useLocation();
  
  const navGroups = [
    {
      title: 'OVERVIEW',
      links: [{ name: 'Dashboard', path: '/', icon: LayoutDashboard }]
    },
    {
      title: 'SERVER',
      links: [
        { name: 'Members', path: '/members', icon: Users },
        { name: 'Roles', path: '/roles', icon: Shield },
        { name: 'Channels', path: '/channels', icon: Hash },
      ]
    },
    {
      title: 'MANAGEMENT',
      links: [
        { name: 'Ranks', path: '/ranks', icon: Anchor },
        { name: 'Moderation', path: '/moderation', icon: ShieldAlert },
        { name: 'CTF', path: '/ctf', icon: Activity },
        { name: 'Bug Bounty', path: '/bug-bounty', icon: Bug },
      ]
    },
    {
      title: 'SYSTEM',
      links: [
        { name: 'Logs', path: '/logs', icon: FileText },
        { name: 'Settings', path: '/settings', icon: Settings },
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />}
      
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0c] border-r border-white/5 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative`}>
        
        <div className="flex-shrink-0 h-16 px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-300 tracking-wider uppercase" style={{ fontFamily: 'Cinzel, serif' }}>
              World Gov
            </h1>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">nullRegion</span>
          </div>
          <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide">
          {navGroups.map((group, i) => (
            <div key={i}>
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">{group.title}</h3>
              <div className="space-y-1">
                {group.links.map(link => {
                  const Icon = link.icon;
                  const active = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        active 
                          ? 'bg-amber-500/10 text-amber-400 shadow-[inset_2px_0_0_0_rgba(251,191,36,1)]' 
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={18} className={active ? 'text-amber-400' : 'text-zinc-500'} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex-shrink-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 mb-4">
            <img src={user?.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png'} alt="Avatar" className="w-9 h-9 rounded-full ring-2 ring-white/10" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100 truncate">{user?.username}</p>
              <p className="text-xs text-zinc-500 truncate">Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-zinc-400 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
