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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    axios.get('/api/auth/me')
      .then(res => setAuth(res.data))
      .catch(() => setAuth(null))
      .finally(() => setLoading(false));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await axios.post('/api/auth/login', { username, password });
      checkAuth();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

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
          
          <form onSubmit={handleLogin} className="w-full space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl text-center">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="text"
                placeholder="Admin Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                required
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 transition-colors"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isLoggingIn}
              className="w-full mt-2 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-black rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoggingIn ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
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
