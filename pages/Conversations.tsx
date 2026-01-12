
import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Play, X, Clock, MapPin, Headphones, Video, BookOpen } from 'lucide-react';
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

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="font-serif text-5xl md:text-6xl text-stone-100">Conversations</h1>
        <p className="text-stone-500 uppercase tracking-widest text-sm">Artist Talks • Interviews • Insights</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {conversations.map((item) => (
          <div key={item.id} className="group cursor-pointer" onClick={() => setActiveVideo(item)}>
            {/* Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-900 mb-6">
               <img 
                  src={item.thumbnailUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
               />
               
               {/* Overlay Play Button */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform bg-black/20 group-hover:bg-amber-600/80 group-hover:border-transparent">
                     <Play className="text-white ml-1 fill-white" size={24} />
                  </div>
               </div>
               
               {/* Duration Badge */}
               {item.duration && (
                <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 text-[10px] font-mono text-white rounded">
                    {item.duration}
                </div>
               )}
            </div>

            {/* Content */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-stone-500 text-[10px] font-bold uppercase tracking-widest">
                  <span className={`flex items-center gap-1 ${item.category === 'LISTEN' ? 'text-blue-400' : item.category === 'LEARN' ? 'text-green-400' : 'text-amber-500'}`}>
                     {getCategoryIcon(item.category)} {item.category}
                  </span>
                  {item.location && (
                    <>
                      <span className="text-stone-700">•</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {item.location}</span>
                    </>
                  )}
               </div>
               
               <div>
                  <h3 className="font-serif text-2xl text-stone-200 leading-tight group-hover:text-amber-500 transition-colors mb-1">
                     {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm font-medium">{item.subtitle}</p>
               </div>
               
               <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
                  {item.description}
               </p>
               
               <div className="pt-3 border-t border-stone-800 flex items-center gap-2 text-stone-600 text-xs">
                  <Clock size={12} />
                  <span>{item.date}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
           {/* Close Button */}
           <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors flex items-center gap-2 uppercase text-xs tracking-widest"
           >
              Close <div className="p-2 border border-stone-700 rounded-full"><X size={20} /></div>
           </button>

           <div className="w-full max-w-5xl aspect-video bg-black shadow-2xl border border-stone-800 relative">
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
           
           <div className="max-w-4xl w-full mt-8 text-center space-y-2">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-900/50 px-2 py-1 rounded inline-block mb-2">
                 {activeVideo.category}
              </span>
              <h2 className="font-serif text-3xl text-white">{activeVideo.title}</h2>
              <p className="text-stone-400">{activeVideo.subtitle}</p>
           </div>
        </div>
      )}
    </div>
  );
};
