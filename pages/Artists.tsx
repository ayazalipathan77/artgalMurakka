import React from 'react';
import { MOCK_ARTISTS } from '../constants';
import { Link } from 'react-router-dom';

export const Artists: React.FC = () => {
  return (
    <div className="pt-32 pb-12 max-w-7xl mx-auto px-4">
      <h1 className="font-serif text-5xl text-stone-100 mb-4 text-center">The Artists</h1>
      <p className="text-stone-500 text-center uppercase tracking-widest text-sm mb-16">Masters of the Craft</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {MOCK_ARTISTS.map(artist => (
          <div key={artist.id} className="group text-center">
            <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-stone-800 group-hover:border-amber-500 transition-colors">
              <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">{artist.name}</h2>
            <p className="text-amber-500 text-xs uppercase tracking-widest mb-3">{artist.specialty}</p>
            <p className="text-stone-400 text-sm mb-6 max-w-xs mx-auto">{artist.bio}</p>
            <Link to="/gallery" className="text-stone-500 hover:text-white text-xs border-b border-transparent hover:border-white pb-1 transition-all">View Collection</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
