import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';

import { Dashboard } from './pages/Dashboard';
import { Members } from './pages/Members';
import { Roles } from './pages/Roles';
import { Ranks } from './pages/Ranks';
import { CTF } from './pages/CTF';
import { Channels } from './pages/Channels';
import { BugBounty } from './pages/BugBounty';
import { Moderation } from './pages/Moderation';
import { Logs } from './pages/Logs';
import { Settings } from './pages/Settings';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

export default function App() {
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/auth/me')
      .then(res => setAuth(res.data))
      .catch(() => setAuth(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center p-8 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl max-w-md w-full">
          <div className="w-16 h-16 bg-[#111] border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <div className="text-2xl font-serif text-amber-400">WG</div>
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-300 font-serif mb-2 tracking-wide text-center">
            WORLD GOVERNMENT
          </h1>
          <p className="text-zinc-500 text-sm mb-8">nullRegion Control Center</p>
          
          <button 
            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || ''}/api/auth/login`} 
            className="w-full py-3 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#5865F2]/25"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            Continue with Discord
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0a0c] text-zinc-300 flex overflow-hidden selection:bg-amber-500/30">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} user={auth?.user} />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0c] to-[#0f0f13]">
          <Topbar setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto relative scrollbar-hide">
            <div className="absolute top-0 inset-x-0 h-96 bg-amber-500/5 opacity-50 blur-[100px] pointer-events-none" />
            <div className="relative z-10 min-h-full">
              <Routes>
                <Route path="/" element={<Dashboard user={auth?.user} />} />
                <Route path="/members" element={<Members />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/ranks" element={<Ranks />} />
                <Route path="/channels" element={<Channels />} />
                <Route path="/ctf" element={<CTF />} />
                <Route path="/bug-bounty" element={<BugBounty />} />
                <Route path="/moderation" element={<Moderation />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
