import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { artistApi, transformArtist } from '../services/api';
import { Artist } from '../types';

export const Artists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await artistApi.getAll();
        const transformedArtists = response.artists.map(transformArtist);
        setArtists(transformedArtists);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch artists');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-stone-950">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <span className="ml-3 text-stone-500 uppercase tracking-widest text-xs">Loading artists...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center bg-stone-950">
        <p className="text-red-500 font-serif text-xl mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-amber-500 hover:text-amber-400 text-xs uppercase tracking-widest underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-screen-2xl mx-auto px-6 md:px-12 bg-stone-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-stone-800 pb-8">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">The Artists</h1>
          <p className="text-stone-500 uppercase tracking-widest text-xs">Masters of Contemporary Practice</p>
        </div>
        <div className="hidden md:block text-stone-500 text-sm max-w-xs text-right">
          Representing a diverse collective of visionaries redefining Pakistani art.
        </div>
      </div>

      {artists.length === 0 ? (
        <p className="text-center text-stone-500 py-20">No artists found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {artists.map((artist, idx) => (
            <Link key={artist.id} to={`/artists/${artist.id}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-stone-900">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div className="flex justify-between items-start border-t border-stone-800 pt-6 group-hover:border-amber-500/50 transition-colors">
                <div>
                  <h2 className="font-serif text-3xl text-white mb-2 group-hover:text-amber-500 transition-colors">{artist.name}</h2>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">{artist.specialty}</p>
                </div>
                <ArrowRight className="text-stone-600 group-hover:text-amber-500 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
              <p className="text-stone-400 text-sm mt-4 line-clamp-3 leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                {artist.bio}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
