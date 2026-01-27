import React, { useState, useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Filter, Search, Loader2, X, ChevronDown, Check } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCurrency } from '../App';
import { artistApi } from '../services/api';
import { Artist } from '../types';

export const Gallery: React.FC = () => {
  const { convertPrice } = useCurrency();
  const {
    artworks,
    isLoading,
    error,
    availableCategories,
    availableMediums,
    fetchArtworks
  } = useGallery();

  const [searchParams, setSearchParams] = useSearchParams();
  const artistIdParam = searchParams.get('artistId');

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMedium, setSelectedMedium] = useState<string>('All');

  // Clean filter arrays
  const categories = ['All', ...availableCategories];
  const mediums = ['All', ...availableMediums];

  // Fetch artworks when filters change
  useEffect(() => {
    const filters: any = {};
    if (selectedCategory !== 'All') filters.category = selectedCategory;
    if (selectedMedium !== 'All') filters.medium = selectedMedium;
    if (searchTerm) filters.search = searchTerm;
    if (artistIdParam) filters.artistId = artistIdParam;

    const timeoutId = setTimeout(() => {
      fetchArtworks(filters);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedMedium, searchTerm, artistIdParam, fetchArtworks]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedMedium('All');
    if (artistIdParam) setSearchParams({});
  };

  return (
    <div className="pt-32 min-h-screen max-w-screen-2xl mx-auto px-6 md:px-12">

      {/* Minimal Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 border-b border-stone-800 pb-8">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-4">Collection</h1>
          <p className="text-stone-500 uppercase tracking-widest text-xs">
            {isLoading ? 'Loading...' : `${artworks.length} Works Available`}
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto items-center">
          {/* Search */}
          <div className="relative flex-1 md:w-64 group border-b border-stone-800 focus-within:border-amber-500 transition-colors">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="SEARCH..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent pl-8 pr-4 py-2 text-xs focus:outline-none text-white placeholder:text-stone-600 uppercase tracking-widest"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-stone-400 hover:text-white uppercase tracking-widest text-xs border border-stone-800 px-4 py-2 transition-all hover:border-stone-600"
          >
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="min-h-[60vh]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-stone-500 text-xs uppercase tracking-widest">Curating Collection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4 font-serif text-xl">{error}</p>
            <button onClick={() => fetchArtworks()} className="text-stone-400 hover:text-white underline text-xs uppercase tracking-widest">Try Again</button>
          </div>
        ) : artworks.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-stone-800">
            <p className="text-white font-serif text-2xl mb-2">No artworks found</p>
            <p className="text-stone-500 text-sm mb-6">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="text-amber-500 hover:text-amber-400 text-xs uppercase tracking-widest border-b border-amber-500/50 pb-1">Clear All Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {artworks.map((art) => (
              <Link key={art.id} to={`/artwork/${art.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-6">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {!art.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white border border-white px-3 py-1 uppercase tracking-widest text-[10px]">Sold</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-xs uppercase tracking-widest border-b border-white pb-1">View Detail</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-white group-hover:text-amber-500 transition-colors truncate pr-4">{art.title}</h3>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">{art.artistName}</p>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-stone-400 text-xs font-mono">{convertPrice(art.price)}</span>
                    <span className="text-stone-600 text-[10px] uppercase">{art.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Slide-over Filter Panel */}
      <div className={`fixed inset-0 z-50 pointer-events-none transition-visibility duration-500 ${filterOpen ? 'pointer-events-auto' : ''}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${filterOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setFilterOpen(false)}
        />

        {/* Sidebar */}
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-stone-900 border-l border-stone-800 shadow-2xl transition-transform duration-500 ${filterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h2 className="font-serif text-3xl text-white">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="text-stone-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-10 pr-2">

              {/* Categories */}
              <div>
                <h3 className="text-amber-500 text-xs uppercase tracking-widest mb-4 font-bold">Category</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between w-full text-left py-2 px-3 transition-colors ${selectedCategory === cat ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'}`}
                    >
                      <span className="text-sm">{cat}</span>
                      {selectedCategory === cat && <Check size={14} className="text-amber-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mediums */}
              <div>
                <h3 className="text-amber-500 text-xs uppercase tracking-widest mb-4 font-bold">Medium</h3>
                <div className="space-y-2">
                  {mediums.map(med => (
                    <button
                      key={med}
                      onClick={() => setSelectedMedium(med)}
                      className={`flex items-center justify-between w-full text-left py-2 px-3 transition-colors ${selectedMedium === med ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-200'}`}
                    >
                      <span className="text-sm truncate pr-4">{med}</span>
                      {selectedMedium === med && <Check size={14} className="text-amber-500" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-stone-800">
              <button
                onClick={clearFilters}
                className="w-full py-4 border border-stone-700 text-stone-300 uppercase tracking-widest text-xs hover:bg-stone-800 hover:text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
