import React from 'react';
import { MOCK_ARTWORKS } from '../constants';
import { Heart, Package, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const UserProfile: React.FC = () => {
  return (
    <div className="pt-32 pb-12 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-12 border-b border-stone-800 pb-8">
         <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center text-2xl font-serif text-amber-500">
               AK
            </div>
            <div>
               <h1 className="font-serif text-3xl text-white">Ali Khan</h1>
               <p className="text-stone-500 uppercase tracking-widest text-xs mt-1">Collector • Member since 2023</p>
            </div>
         </div>
         <button className="text-stone-500 hover:text-white flex items-center gap-2 text-sm"><LogOut size={16}/> Sign Out</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Order History */}
         <div className="lg:col-span-2 space-y-8">
            <h2 className="font-serif text-2xl text-white flex items-center gap-2"><Package size={20} className="text-amber-500"/> Order History</h2>
            <div className="space-y-4">
               {[1, 2].map(i => (
                  <div key={i} className="bg-stone-900 border border-stone-800 p-6 flex items-center justify-between">
                     <div>
                        <p className="text-white font-bold">Order #ORD-2024-{i}92</p>
                        <p className="text-stone-500 text-xs mt-1">Placed on Oct {10+i}, 2024</p>
                     </div>
                     <div className="text-right">
                        <span className="inline-block px-3 py-1 bg-green-900/30 text-green-500 text-xs rounded-full border border-green-900/50 mb-2">Delivered</span>
                        <p className="text-stone-300 text-sm">PKR 450,000</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Wishlist */}
         <div>
            <h2 className="font-serif text-2xl text-white flex items-center gap-2 mb-6"><Heart size={20} className="text-red-500"/> Wishlist</h2>
            <div className="grid grid-cols-1 gap-4">
               {MOCK_ARTWORKS.slice(0, 2).map(art => (
                  <Link key={art.id} to={`/artwork/${art.id}`} className="flex gap-4 bg-stone-900 p-3 hover:bg-stone-800 transition-colors">
                     <img src={art.imageUrl} className="w-16 h-16 object-cover" alt={art.title}/>
                     <div>
                        <h4 className="text-white font-serif text-sm">{art.title}</h4>
                        <p className="text-stone-500 text-xs mt-1">{art.artistName}</p>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
