import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Play, X, Clock, MapPin, Headphones, Video, BookOpen, ArrowUpRight } from 'lucide-react';
import { Conversation } from '../types';

export const Conversations: React.FC = () => {
   const { conversations } = useGallery();
   const [activeVideo, setActiveVideo] = useState<Conversation | null>(null);

   const getCategoryIcon = (cat: string) => {
      switch (cat) {
         case 'LISTEN': return <Headphones size={12} />;
         case 'LEARN': return <BookOpen size={12} />;
         default: return <Video size={12} />;
      }
   };

   // Featured Item (First one)
   const featured = conversations[0];
   const others = conversations.slice(1);

   return (
      <div className="bg-stone-950 min-h-screen">

         {/* Hero / Header */}
         <div className="pt-40 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-stone-800">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
               <div>
                  <h1 className="font-serif text-6xl md:text-8xl text-white mb-6">Muraqqa Journal</h1>
                  <p className="text-stone-400 max-w-lg leading-relaxed text-lg">
                     Critical discourse, artist dialogues, and deep dives into the evolving landscape of contemporary Pakistani art.
                  </p>
               </div>
               <div className="flex gap-4">
                  <span className="px-4 py-2 border border-stone-700 text-stone-400 uppercase tracking-widest text-xs rounded-full">Essays</span>
                  <span className="px-4 py-2 bg-stone-100 text-stone-950 uppercase tracking-widest text-xs font-bold rounded-full">Interviews</span>
                  <span className="px-4 py-2 border border-stone-700 text-stone-400 uppercase tracking-widest text-xs rounded-full">Producers</span>
               </div>
            </div>
         </div>

         <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-20">

            {/* Featured Story */}
            {featured && (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 group cursor-pointer" onClick={() => setActiveVideo(featured)}>
                  <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden bg-stone-900">
                     <img
                        src={featured.thumbnailUrl}
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                           <Play size={32} className="ml-1 text-white fill-white" />
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                     <div className="flex items-center gap-3 text-amber-500 text-xs font-bold uppercase tracking-widest">
                        <span className="px-2 py-1 border border-amber-500/50 rounded">{featured.category}</span>
                        <span>{featured.date}</span>
                     </div>
                     <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] group-hover:underline underline-offset-8 decoration-1 decoration-stone-700">
                        {featured.title}
                     </h2>
                     <p className="text-xl text-stone-400 font-light leading-relaxed">
                        {featured.description}
                     </p>
                     <div className="pt-8 flex items-center gap-2 text-white text-xs uppercase tracking-widest">
                        Watch Feature <ArrowUpRight size={14} />
                     </div>
                  </div>
               </div>
            )}

            {/* Latest Stories Grid */}
            <div className="flex items-end justify-between mb-12 border-b border-stone-800 pb-4">
               <h3 className="font-serif text-3xl text-white">Latest Stories</h3>
               <button className="text-stone-500 hover:text-white uppercase tracking-widest text-xs">View Archive</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
               {others.map((item) => (
                  <div key={item.id} className="group cursor-pointer" onClick={() => setActiveVideo(item)}>
                     <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 mb-6">
                        <img
                           src={item.thumbnailUrl}
                           alt={item.title}
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 text-[10px] font-mono text-white rounded flex items-center gap-2">
                           <Play size={8} fill="currentColor" /> {item.duration || 'Video'}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-2 text-amber-600 text-[10px] font-bold uppercase tracking-widest">
                           {getCategoryIcon(item.category)} {item.category}
                        </div>
                        <h3 className="font-serif text-2xl text-stone-200 group-hover:text-amber-500 transition-colors leading-tight">
                           {item.title}
                        </h3>
                        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                           {item.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Video Modal (Unchanged logic, just styling tweaks) */}
         {activeVideo && (
            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-fade-in">
               <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest z-50"
               >
                  Close <div className="p-2 border border-stone-700 rounded-full"><X size={20} /></div>
               </button>

               <div className="w-full max-w-6xl aspect-video bg-black shadow-2xl border border-stone-800 relative">
                  <iframe
                     width="100%"
                     height="100%"
                     src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1`}
                     title={activeVideo.title}
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     className="w-full h-full"
                  ></iframe>
               </div>

               <div className="max-w-4xl w-full mt-8 text-center space-y-4">
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-900/50 px-3 py-1 rounded-full inline-block">
                     {activeVideo.category}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-white">{activeVideo.title}</h2>
                  <p className="text-stone-400">{activeVideo.subtitle}</p>
               </div>
            </div>
         )}
      </div>
   );
};
