import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ARTWORKS } from '../constants';
import { useCart, useCurrency } from '../App';
import { ARView } from '../components/ARView';
import { ShieldCheck, Truck, Box, CreditCard, Share2, Star, FileText, X } from 'lucide-react';
import { CartItem } from '../types';

export const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { convertPrice, rawConvert } = useCurrency();
  const [showAR, setShowAR] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);
  
  // Print Logic
  const [purchaseType, setPurchaseType] = useState<'ORIGINAL' | 'PRINT'>('ORIGINAL');
  const [selectedPrintSize, setSelectedPrintSize] = useState<'A4' | 'A3' | 'CANVAS_24x36'>('A3');
  
  const artwork = MOCK_ARTWORKS.find(a => a.id === id);

  if (!artwork) return <div className="pt-32 text-center">Artwork not found</div>;

  const calculatePrice = () => {
    if (purchaseType === 'ORIGINAL') return artwork.price;
    switch (selectedPrintSize) {
       case 'A4': return artwork.price * 0.05;
       case 'A3': return artwork.price * 0.08;
       case 'CANVAS_24x36': return artwork.price * 0.15;
       default: return artwork.price;
    }
  };

  const finalPricePKR = calculatePrice();

  const handleAddToCart = () => {
    const item: CartItem = { 
      ...artwork, 
      quantity: 1, 
      selectedPrintSize: purchaseType === 'PRINT' ? selectedPrintSize : 'ORIGINAL',
      finalPrice: finalPricePKR
    };
    addToCart(item);
    navigate('/cart');
  };

  return (
    <div className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {showAR && <ARView artwork={artwork} onClose={() => setShowAR(false)} />}
      
      {/* Provenance/Certificate Modal */}
      {showProvenance && (
         <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-stone-100 text-stone-900 max-w-lg w-full p-8 rounded shadow-2xl relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
               <button onClick={() => setShowProvenance(false)} className="absolute top-4 right-4 text-stone-500 hover:text-black"><X size={24}/></button>
               <div className="border-4 border-double border-stone-800 p-6 text-center">
                  <h2 className="font-serif text-3xl font-bold mb-2 uppercase tracking-widest">Certificate of Authenticity</h2>
                  <div className="w-16 h-px bg-stone-900 mx-auto mb-6"></div>
                  <p className="font-serif italic text-lg mb-4">This document certifies that</p>
                  <h3 className="font-bold text-2xl mb-1">{artwork.title}</h3>
                  <p className="text-sm uppercase tracking-wide mb-6">by {artwork.artistName}</p>
                  <p className="text-sm text-stone-600 mb-8 leading-relaxed">
                     Is an authentic original artwork created in {artwork.year}. 
                     This work is recorded in the Muraqqa blockchain registry under ID:
                     <span className="block font-mono bg-stone-200 mt-2 py-1 select-all">{artwork.provenanceId}</span>
                  </p>
                  <div className="flex justify-between items-end mt-12 pt-4 border-t border-stone-400">
                     <div className="text-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Signature_sample.svg" className="h-8 opacity-70" alt="Signature" />
                        <p className="text-xs uppercase mt-1">Curator Signature</p>
                     </div>
                     <div className="text-right">
                        <ShieldCheck size={32} className="ml-auto text-amber-600" />
                        <p className="text-xs uppercase mt-1 text-amber-700 font-bold">Verified</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Visuals */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] bg-stone-900 overflow-hidden shadow-2xl">
            <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setShowAR(true)} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-stone-800 hover:bg-stone-700 text-white transition-colors border border-stone-700 uppercase tracking-widest text-xs">
              <Box size={16} /> View in AR
            </button>
            <button onClick={() => setShowProvenance(true)} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors border border-stone-700 uppercase tracking-widest text-xs">
               <FileText size={16} /> Provenance
            </button>
          </div>
        </div>

        {/* Details & Commerce */}
        <div className="space-y-10">
          <div>
            <h1 className="font-serif text-4xl lg:text-6xl text-stone-100 mb-4 leading-tight">{artwork.title}</h1>
            <h2 className="text-xl text-amber-500 tracking-[0.2em] uppercase">{artwork.artistName}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-4 text-amber-500">
               {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s <= (artwork.reviews[0]?.rating || 4) ? "currentColor" : "none"} />)}
               <span className="text-stone-500 text-xs ml-2">({artwork.reviews.length} Reviews)</span>
            </div>
          </div>

          <div className="text-stone-300 space-y-4 font-light leading-relaxed text-lg border-l-2 border-amber-900/50 pl-6">
            <p>{artwork.description}</p>
          </div>

          {/* Configuration */}
          <div className="bg-stone-900 p-8 rounded-sm border border-stone-800 space-y-8">
            
            {/* Type Selector */}
            <div className="flex border-b border-stone-800 pb-6">
               <button 
                  onClick={() => setPurchaseType('ORIGINAL')}
                  className={`flex-1 pb-2 text-sm uppercase tracking-widest transition-colors ${purchaseType === 'ORIGINAL' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-stone-500'}`}
               >
                 Original
               </button>
               <button 
                  onClick={() => setPurchaseType('PRINT')}
                  className={`flex-1 pb-2 text-sm uppercase tracking-widest transition-colors ${purchaseType === 'PRINT' ? 'text-amber-500 border-b-2 border-amber-500' : 'text-stone-500'}`}
               >
                 Limited Print
               </button>
            </div>

            {/* Print Options */}
            {purchaseType === 'PRINT' && (
               <div className="grid grid-cols-3 gap-4">
                  {(['A4', 'A3', 'CANVAS_24x36'] as const).map(size => (
                     <button 
                        key={size}
                        onClick={() => setSelectedPrintSize(size)}
                        className={`py-3 text-xs border ${selectedPrintSize === size ? 'border-amber-500 bg-amber-900/20 text-white' : 'border-stone-700 text-stone-500 hover:border-stone-500'}`}
                     >
                        {size.replace('_', ' ')}
                     </button>
                  ))}
               </div>
            )}

            {/* Price & Action */}
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-xs text-stone-500 uppercase tracking-widest mb-1">Total Price</p>
                  <p className="text-4xl font-serif text-white">{convertPrice(finalPricePKR)}</p>
               </div>
               {artwork.inStock ? (
                 <button onClick={handleAddToCart} className="bg-white hover:bg-stone-200 text-black px-8 py-4 uppercase tracking-widest text-sm font-bold transition-colors">
                   Add to Cart
                 </button>
               ) : (
                 <button disabled className="bg-stone-800 text-stone-500 px-8 py-4 uppercase tracking-widest text-sm font-bold cursor-not-allowed">
                   Sold Out
                 </button>
               )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-[10px] text-stone-500 uppercase tracking-wider pt-4 border-t border-stone-800">
               <span className="flex items-center gap-2"><Truck size={12}/> {purchaseType === 'ORIGINAL' ? 'Insured Shipping' : 'Standard Shipping'}</span>
               <span className="flex items-center gap-2"><ShieldCheck size={12}/> Authenticity Guaranteed</span>
               <span className="flex items-center gap-2"><CreditCard size={12}/> Secure Payment</span>
               <span className="flex items-center gap-2"><Share2 size={12}/> 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Community / Reviews */}
      <div className="mt-24 border-t border-stone-800 pt-12">
         <h3 className="font-serif text-3xl text-stone-200 mb-8">Community Reviews</h3>
         {artwork.reviews.length > 0 ? (
            <div className="grid gap-6">
               {artwork.reviews.map(r => (
                  <div key={r.id} className="bg-stone-900 p-6 border border-stone-800">
                     <div className="flex justify-between mb-2">
                        <span className="text-white font-bold">{r.userName}</span>
                        <span className="text-stone-500 text-xs">{r.date}</span>
                     </div>
                     <div className="flex text-amber-500 mb-3">{[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor"/>)}</div>
                     <p className="text-stone-400 text-sm italic">"{r.comment}"</p>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-stone-600 italic">No reviews yet. Be the first to collect and review.</p>
         )}
      </div>
    </div>
  );
};
