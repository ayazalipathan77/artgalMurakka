
import React, { useState } from 'react';
import { Menu, ShoppingBag, User as UserIcon, Search, Globe, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart, useCurrency } from '../App';
import { UI_TEXT } from '../constants';
import { Currency } from '../types';

interface NavbarProps {
  lang: 'EN' | 'UR';
  setLang: (l: 'EN' | 'UR') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [currOpen, setCurrOpen] = useState(false);

  const toggleLang = () => setLang(lang === 'EN' ? 'UR' : 'EN');

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-stone-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="font-serif text-2xl md:text-3xl text-amber-500 tracking-wider font-bold">
              MURAQQA
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/gallery" className="text-stone-300 hover:text-amber-450 transition-colors font-medium text-xs tracking-[0.15em] uppercase">
              {UI_TEXT[lang].nav.gallery}
            </Link>
            <Link to="/artists" className="text-stone-300 hover:text-amber-450 transition-colors font-medium text-xs tracking-[0.15em] uppercase">
              {UI_TEXT[lang].nav.artists}
            </Link>
            <Link to="/exhibitions" className="text-stone-300 hover:text-amber-450 transition-colors font-medium text-xs tracking-[0.15em] uppercase">
              {UI_TEXT[lang].nav.exhibitions}
            </Link>
            <Link to="/conversations" className="text-stone-300 hover:text-amber-450 transition-colors font-medium text-xs tracking-[0.15em] uppercase">
              {UI_TEXT[lang].nav.conversations}
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            {/* Currency Dropdown */}
            <div className="relative hidden md:block">
              <button onClick={() => setCurrOpen(!currOpen)} className="text-stone-400 hover:text-white flex items-center gap-1 text-xs font-bold">
                {currency} <ChevronDown size={14} />
              </button>
              {currOpen && (
                <div className="absolute top-8 right-0 bg-stone-900 border border-stone-700 rounded shadow-xl py-2 w-24">
                  {Object.values(Currency).map((c) => (
                    <button 
                      key={c}
                      onClick={() => { setCurrency(c); setCurrOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-stone-800 ${currency === c ? 'text-amber-500' : 'text-stone-300'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleLang} className="text-stone-400 hover:text-white flex items-center gap-1 text-xs font-bold">
              <Globe size={16} /> {lang}
            </button>
            
            <Link to="/auth" className="text-stone-400 hover:text-white">
              <UserIcon size={20} />
            </Link>
            
            <Link to="/cart" className="text-stone-400 hover:text-amber-500 relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-stone-900 border-b border-stone-800 absolute w-full h-screen top-20 left-0 p-4">
          <div className="space-y-4">
            <Link to="/gallery" className="block text-2xl font-serif text-stone-300 hover:text-amber-450" onClick={() => setIsOpen(false)}>{UI_TEXT[lang].nav.gallery}</Link>
            <Link to="/artists" className="block text-2xl font-serif text-stone-300 hover:text-amber-450" onClick={() => setIsOpen(false)}>{UI_TEXT[lang].nav.artists}</Link>
            <Link to="/exhibitions" className="block text-2xl font-serif text-stone-300 hover:text-amber-450" onClick={() => setIsOpen(false)}>{UI_TEXT[lang].nav.exhibitions}</Link>
            <Link to="/conversations" className="block text-2xl font-serif text-stone-300 hover:text-amber-450" onClick={() => setIsOpen(false)}>{UI_TEXT[lang].nav.conversations}</Link>
            <div className="pt-8 border-t border-stone-800">
               <p className="text-stone-500 text-sm mb-2">Select Currency</p>
               <div className="flex gap-4">
                  {Object.values(Currency).map((c) => (
                    <button key={c} onClick={() => setCurrency(c)} className={`border px-3 py-1 rounded ${currency === c ? 'border-amber-500 text-amber-500' : 'border-stone-700 text-stone-500'}`}>{c}</button>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
