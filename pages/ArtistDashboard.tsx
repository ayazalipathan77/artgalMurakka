import React from 'react';
import { BarChart, Upload, DollarSign, Image as ImageIcon } from 'lucide-react';

export const ArtistDashboard: React.FC = () => {
  return (
    <div className="pt-32 pb-12 max-w-7xl mx-auto px-4">
       <div className="flex justify-between items-center mb-12">
          <h1 className="font-serif text-4xl text-white">Artist Studio</h1>
          <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 flex items-center gap-2 text-sm uppercase tracking-widest">
             <Upload size={16} /> Upload New Work
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-stone-900 p-6 border border-stone-800">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <p className="text-stone-500 text-xs uppercase tracking-widest">Total Earnings</p>
                   <h3 className="text-3xl text-white font-serif mt-2">PKR 2.4M</h3>
                </div>
                <DollarSign className="text-amber-500" />
             </div>
             <div className="w-full bg-stone-800 h-1 mt-4"><div className="w-3/4 bg-amber-500 h-1"></div></div>
          </div>
          <div className="bg-stone-900 p-6 border border-stone-800">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <p className="text-stone-500 text-xs uppercase tracking-widest">Artworks Sold</p>
                   <h3 className="text-3xl text-white font-serif mt-2">14</h3>
                </div>
                <ImageIcon className="text-amber-500" />
             </div>
          </div>
          <div className="bg-stone-900 p-6 border border-stone-800">
             <div className="flex justify-between items-start mb-4">
                <div>
                   <p className="text-stone-500 text-xs uppercase tracking-widest">Profile Views</p>
                   <h3 className="text-3xl text-white font-serif mt-2">1.2k</h3>
                </div>
                <BarChart className="text-amber-500" />
             </div>
          </div>
       </div>

       <h2 className="font-serif text-2xl text-white mb-6">Portfolio Management</h2>
       <div className="bg-stone-900 border border-stone-800 overflow-hidden">
          <table className="w-full text-left text-sm text-stone-400">
             <thead className="bg-stone-950 text-stone-500 uppercase text-xs">
                <tr>
                   <th className="p-4">Artwork</th>
                   <th className="p-4">Status</th>
                   <th className="p-4">Price</th>
                   <th className="p-4">Views</th>
                   <th className="p-4">Action</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-stone-800">
                <tr className="hover:bg-stone-800/50">
                   <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-800"></div>
                      <span>Mystic River</span>
                   </td>
                   <td className="p-4"><span className="text-green-500 bg-green-900/20 px-2 py-1 text-xs rounded">Active</span></td>
                   <td className="p-4">PKR 120,000</td>
                   <td className="p-4">342</td>
                   <td className="p-4 text-amber-500 cursor-pointer">Edit</td>
                </tr>
                <tr className="hover:bg-stone-800/50">
                   <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-800"></div>
                      <span>Old Lahore</span>
                   </td>
                   <td className="p-4"><span className="text-stone-500 bg-stone-800 px-2 py-1 text-xs rounded">Sold</span></td>
                   <td className="p-4">PKR 450,000</td>
                   <td className="p-4">892</td>
                   <td className="p-4 text-amber-500 cursor-pointer">Details</td>
                </tr>
             </tbody>
          </table>
       </div>
    </div>
  );
};
