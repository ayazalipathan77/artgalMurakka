import React, { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'USER' | 'ARTIST'>('USER');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of Auth
    if (role === 'ARTIST') {
       navigate('/artist-dashboard');
    } else {
       navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-12 flex items-center justify-center px-4 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-fixed">
       <div className="absolute inset-0 bg-stone-950/90"></div>
       
       <div className="relative z-10 w-full max-w-md bg-stone-900 border border-stone-800 p-8 shadow-2xl">
          <h2 className="font-serif text-3xl text-white text-center mb-2">MURAQQA</h2>
          <p className="text-stone-500 text-center text-xs uppercase tracking-widest mb-8">{isLogin ? 'Sign In to your account' : 'Join the Collective'}</p>

          <div className="flex gap-2 mb-6 p-1 bg-stone-950 rounded">
             <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-xs uppercase font-bold rounded ${isLogin ? 'bg-stone-800 text-white' : 'text-stone-500'}`}>Login</button>
             <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-xs uppercase font-bold rounded ${!isLogin ? 'bg-stone-800 text-white' : 'text-stone-500'}`}>Register</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             {!isLogin && (
                <div className="space-y-4 mb-6 border-b border-stone-800 pb-6">
                   <p className="text-stone-400 text-xs uppercase">I am a:</p>
                   <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" name="role" checked={role === 'USER'} onChange={() => setRole('USER')} className="accent-amber-500" />
                         <span className={role === 'USER' ? 'text-white' : 'text-stone-500'}>Collector</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                         <input type="radio" name="role" checked={role === 'ARTIST'} onChange={() => setRole('ARTIST')} className="accent-amber-500" />
                         <span className={role === 'ARTIST' ? 'text-white' : 'text-stone-500'}>Artist</span>
                      </label>
                   </div>
                </div>
             )}

             {!isLogin && (
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
                  <input type="text" placeholder="Full Name" className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
             )}
             
             <div className="relative group">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
               <input type="email" placeholder="Email Address" className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors" />
             </div>
             
             <div className="relative group">
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
               <input type="password" placeholder="Password" className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors" />
             </div>

             <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 mt-4 font-bold uppercase tracking-widest text-sm transition-colors">
                {isLogin ? 'Enter Gallery' : 'Create Account'}
             </button>
          </form>
          
          <div className="mt-6 text-center">
             <Link to="/admin" className="text-stone-600 text-xs hover:text-stone-400">Admin Access</Link>
          </div>
       </div>
    </div>
  );
};
