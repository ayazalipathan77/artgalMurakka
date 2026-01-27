import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HomeProps {
  lang: 'EN' | 'UR';
}

export const Home: React.FC<HomeProps> = ({ lang }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Featured Content Data (Mock)
  const featuredExhibition = {
    title: "Shadows of the Past",
    artist: "Zara Khan",
    date: "OCT 12 — DEC 24",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop"
  };

  const curatedCollections = [
    { title: "Abstract Modernism", image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop" },
    { title: "Calligraphic Heritage", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop" },
    { title: "Digital Horizons", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="bg-stone-950 min-h-screen">

      {/* Immersive Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/header_bg.jpg"
            alt="Hero Art"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
        >
          <p className="text-stone-300 uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-fade-in">
            Contemporary Pakistani Art
          </p>
          <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] animate-enter">
            Elevation of <br /> <span className="italic text-amber-500">Perspective</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/gallery"
              className="px-8 py-4 border border-white text-white uppercase tracking-widest text-xs hover:bg-white hover:text-stone-950 transition-all duration-300"
            >
              View Collection
            </Link>
            <Link
              to="/exhibitions"
              className="px-8 py-4 bg-amber-600 text-white uppercase tracking-widest text-xs hover:bg-amber-500 transition-all duration-300 border border-transparent"
            >
              Current Exhibitions
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
        >
          <ArrowDown size={24} />
        </motion.div>
      </section>

      {/* Featured Exhibition (Editorial Layout) */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <span className="inline-block w-12 h-px bg-amber-500 mb-4"></span>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight">
              {featuredExhibition.title}
            </h2>
            <p className="text-xl text-stone-400">
              A solo exhibition by <span className="text-white">{featuredExhibition.artist}</span>
            </p>
            <p className="text-stone-500 max-w-md leading-relaxed">
              Explore the ethereal boundaries between memory and reality in this groundbreaking collection.
              Khan’s work challenges the conventional narrative of spatial dynamics in miniature painting.
            </p>
            <div className="pt-8">
              <Link to="/exhibitions" className="group inline-flex items-center gap-4 text-white uppercase tracking-widest text-xs">
                Explore Exhibition
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[3/4] md:aspect-square overflow-hidden group">
            <img
              src={featuredExhibition.image}
              alt={featuredExhibition.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Curated Collections (Asymmetric Grid) */}
      <section className="py-24 bg-stone-900">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h3 className="font-serif text-3xl text-white mb-2">Curated Collections</h3>
              <p className="text-stone-500">Handpicked selections by our curators.</p>
            </div>
            <Link to="/gallery" className="text-amber-500 hover:text-white uppercase tracking-widest text-xs transition-colors">
              View All Collections
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Large Item */}
            <Link to="/gallery" className="md:col-span-2 group relative overflow-hidden aspect-[16/9] md:aspect-auto">
              <img
                src={curatedCollections[0].image}
                alt={curatedCollections[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="font-serif text-2xl text-white">{curatedCollections[0].title}</h4>
              </div>
            </Link>

            {/* Tall Item */}
            <Link to="/gallery" className="group relative overflow-hidden aspect-[3/4]">
              <img
                src={curatedCollections[1].image}
                alt={curatedCollections[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="font-serif text-2xl text-white">{curatedCollections[1].title}</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial / Latest Essays */}
      <section className="py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl text-white mb-4">Muraqqa Journal</h2>
          <p className="text-stone-500 uppercase tracking-widest text-xs">Stories, Interviews, and Critical Essays</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-stone-800 pt-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/2] overflow-hidden mb-6 bg-stone-900">
                <img
                  src={`https://picsum.photos/seed/${i * 55}/800/600`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  alt="Journal"
                />
              </div>
              <p className="text-amber-500 text-xs uppercase tracking-widest mb-3">Interview</p>
              <h3 className="font-serif text-2xl text-white mb-4 group-hover:underline decoration-stone-600 underline-offset-4">
                The Resurgence of Miniature Art in the Digital Age
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                We sat down with leading artists to discuss how traditional techniques are evolving...
              </p>
              <span className="text-white text-xs uppercase tracking-widest border-b border-stone-800 pb-1 group-hover:border-white transition-colors">Read Story</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
