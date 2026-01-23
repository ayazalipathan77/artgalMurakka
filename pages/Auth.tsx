import React, { useState } from 'react';
import { User, Lock, Mail, Facebook, Chrome, ArrowRight, Phone, MapPin, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api';

export const Auth: React.FC = () => {
   const [isLogin, setIsLogin] = useState(true);
   const [role, setRole] = useState<'USER' | 'ARTIST'>('USER');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [fullName, setFullName] = useState('');

   // New Fields
   const [phoneNumber, setPhoneNumber] = useState('');
   const [address, setAddress] = useState('');
   const [city, setCity] = useState('');
   const [country, setCountry] = useState('Pakistan');
   const [zipCode, setZipCode] = useState('');

   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const { login, register: authRegister } = useAuth();

   const handleAuthSuccess = (token: string, userRole: string) => {
      login(token);

      if (userRole === 'ADMIN') {
         navigate('/admin');
      } else if (userRole === 'ARTIST') {
         navigate('/artist-dashboard');
      } else {
         navigate('/profile');
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
         if (isLogin) {
            // Login request
            const response = await fetch(`${API_URL}/auth/login`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  email,
                  password,
               }),
            });

            const data = await response.json();

            if (!response.ok) {
               setError(data.message || 'Login failed');
               return;
            }

            handleAuthSuccess(data.token, data.user.role);
         } else {
            // Register request
            const response = await fetch(`${API_URL}/auth/register`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  email,
                  password,
                  fullName,
                  role,
                  phoneNumber,
                  address,
                  city,
                  country,
                  zipCode
               }),
            });

            const data = await response.json();

            if (!response.ok) {
               setError(data.message || 'Registration failed');
               return;
            }

            handleAuthSuccess(data.token, data.user.role);
         }
      } catch (err: any) {
         setError(err.message || 'An error occurred');
      } finally {
         setLoading(false);
      }
   };

   const handleSocialLogin = (provider: string) => {
      // Simulate OAuth process
      console.log(`Initiating ${provider} login...`);
      setError('Social login not yet implemented');
   };

   return (
      <div className="min-h-screen pt-32 pb-12 flex items-center justify-center px-4 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-fixed">
         <div className="absolute inset-0 bg-stone-950/90"></div>

         <div className="relative z-10 w-full max-w-md bg-stone-900 border border-stone-800 p-8 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <h2 className="font-serif text-3xl text-white text-center mb-2">MURAQQA</h2>
            <p className="text-stone-500 text-center text-xs uppercase tracking-widest mb-8">{isLogin ? 'Sign In to your account' : 'Join the Collective'}</p>

            <div className="flex gap-2 mb-8 p-1 bg-stone-950 rounded border border-stone-800">
               <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 text-xs uppercase font-bold rounded transition-all ${isLogin ? 'bg-stone-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}>Login</button>
               <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 text-xs uppercase font-bold rounded transition-all ${!isLogin ? 'bg-stone-800 text-white shadow-lg' : 'text-stone-500 hover:text-stone-300'}`}>Register</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
               {!isLogin && (
                  <div className="space-y-4 mb-6 border-b border-stone-800 pb-6 animate-fade-in">
                     <p className="text-stone-400 text-xs uppercase tracking-wider">I am joining as a:</p>
                     <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${role === 'USER' ? 'border-amber-500' : 'border-stone-600'}`}>
                              {role === 'USER' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                           </div>
                           <input type="radio" name="role" checked={role === 'USER'} onChange={() => setRole('USER')} className="hidden" />
                           <span className={`text-sm transition-colors ${role === 'USER' ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'}`}>Collector</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${role === 'ARTIST' ? 'border-amber-500' : 'border-stone-600'}`}>
                              {role === 'ARTIST' && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                           </div>
                           <input type="radio" name="role" checked={role === 'ARTIST'} onChange={() => setRole('ARTIST')} className="hidden" />
                           <span className={`text-sm transition-colors ${role === 'ARTIST' ? 'text-white' : 'text-stone-500 group-hover:text-stone-300'}`}>Artist</span>
                        </label>
                     </div>
                  </div>
               )}

               <div className="space-y-4">
                  {!isLogin && (
                     <>
                        <div className="relative group">
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                           <input
                              type="text"
                              placeholder="Full Name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors"
                              required
                           />
                        </div>
                        <div className="relative group">
                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                           <input
                              type="tel"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors"
                           />
                        </div>
                        {/* Address Section */}
                        <div className="space-y-2">
                           <div className="relative group">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                              <input
                                 type="text"
                                 placeholder="Address"
                                 value={address}
                                 onChange={(e) => setAddress(e.target.value)}
                                 className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors"
                              />
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                              <input
                                 type="text"
                                 placeholder="City"
                                 value={city}
                                 onChange={(e) => setCity(e.target.value)}
                                 className="w-full bg-stone-950 border border-stone-700 p-3 text-white focus:border-amber-500 outline-none transition-colors"
                              />
                              <input
                                 type="text"
                                 placeholder="Zip Code"
                                 value={zipCode}
                                 onChange={(e) => setZipCode(e.target.value)}
                                 className="w-full bg-stone-950 border border-stone-700 p-3 text-white focus:border-amber-500 outline-none transition-colors"
                              />
                           </div>
                           <div className="relative group">
                              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                              <select
                                 value={country}
                                 onChange={(e) => setCountry(e.target.value)}
                                 className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors appearance-none"
                              >
                                 <option value="Pakistan">Pakistan</option>
                                 <option value="UAE">UAE</option>
                                 <option value="UK">UK</option>
                                 <option value="USA">USA</option>
                              </select>
                           </div>
                        </div>
                     </>
                  )}

                  <div className="relative group">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                     <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors"
                        required
                     />
                  </div>

                  <div className="relative group">
                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={18} />
                     <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 p-3 pl-10 text-white focus:border-amber-500 outline-none transition-colors"
                        required
                     />
                  </div>

                  {error && (
                     <div className="bg-red-950 border border-red-700 text-red-200 p-3 rounded text-xs">
                        {error}
                     </div>
                  )}
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white py-3 mt-2 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group transition-all"
               >
                  {loading ? 'Processing...' : (isLogin ? 'Enter Gallery' : 'Create Account')}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </form>

            {/* Social Login Section */}
            <div className="relative my-8">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-800"></div>
               </div>
               <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-stone-900 px-4 text-stone-500">Or continue with</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <button
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 bg-stone-950 border border-stone-700 text-stone-300 py-3 text-xs font-bold uppercase hover:bg-stone-800 hover:text-white hover:border-stone-600 transition-all"
               >
                  <Chrome size={16} />
                  Google
               </button>
               <button
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center justify-center gap-2 bg-[#1877F2]/10 border border-[#1877F2]/30 text-[#1877F2] py-3 text-xs font-bold uppercase hover:bg-[#1877F2] hover:text-white transition-all"
               >
                  <Facebook size={16} />
                  Facebook
               </button>
            </div>

            <div className="mt-8 text-center pt-6 border-t border-stone-800">
               <Link to="/admin" className="text-stone-600 text-[10px] uppercase tracking-widest hover:text-amber-500 transition-colors">Admin Portal Access</Link>
            </div>
         </div>
      </div>
   );
};
