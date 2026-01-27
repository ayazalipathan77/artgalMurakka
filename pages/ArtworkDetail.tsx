import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart, useCurrency } from '../App';
import { useGallery } from '../context/GalleryContext';
import { ARView } from '../components/ARView';
import { ShieldCheck, Truck, Box, CreditCard, Share2, Star, FileText, X, Loader2, ArrowLeft, Heart, Maximize2 } from 'lucide-react';
import { CartItem, Artwork } from '../types';
import { artworkApi, transformArtwork } from '../services/api';

export const ArtworkDetail: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const { addToCart } = useCart();
   const { convertPrice } = useCurrency();
   const { artworks } = useGallery();

   const [artwork, setArtwork] = useState<Artwork | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   const [showAR, setShowAR] = useState(false);
   const [showProvenance, setShowProvenance] = useState(false);
   const [isSaved, setIsSaved] = useState(false);

   // Print Logic
   const [purchaseType, setPurchaseType] = useState<'ORIGINAL' | 'PRINT'>('ORIGINAL');
   const [selectedPrintSize, setSelectedPrintSize] = useState<'A4' | 'A3' | 'CANVAS_24x36'>('A3');

   // Fetch artwork from API
   useEffect(() => {
      const fetchArtwork = async () => {
         if (!id) return;
         setIsLoading(true);
         setError(null);
         try {
            const response = await artworkApi.getById(id);
            const transformedArtwork = transformArtwork(response.artwork);
            setArtwork(transformedArtwork);
         } catch (err) {
            console.error('Error fetching artwork:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch artwork');
         } finally {
            setIsLoading(false);
         }
      };

      fetchArtwork();
      window.scrollTo(0, 0);
   }, [id]);

   if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-stone-950"><Loader2 className="w-8 h-8 text-amber-500 animate-spin" /></div>;
   if (error || !artwork) return <div className="min-h-screen flex items-center justify-center bg-stone-950 text-white">{error || 'Artwork not found'}</div>;

   const relatedArtworks = artworks.filter(art => art.id !== id && (art.category === artwork.category || art.artistName === artwork.artistName)).slice(0, 3);

   const finalPricePKR = purchaseType === 'ORIGINAL' ? artwork.price :
      (selectedPrintSize === 'A4' ? artwork.price * 0.05 : selectedPrintSize === 'A3' ? artwork.price * 0.08 : artwork.price * 0.15);

   const handleAddToCart = () => {
      addToCart({
         ...artwork,
         quantity: 1,
         selectedPrintSize: purchaseType === 'PRINT' ? selectedPrintSize : 'ORIGINAL',
         finalPrice: finalPricePKR
      });
      navigate('/cart');
   };

   return (
      <div className="min-h-screen bg-stone-950 pb-20">
         {showAR && <ARView artwork={artwork} onClose={() => setShowAR(false)} />}

         {/* Navigation Bar */}
         <div className="fixed top-24 left-0 w-full z-40 px-6 md:px-12 pointer-events-none">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-stone-500 hover:text-white uppercase tracking-widest text-xs pointer-events-auto transition-colors bg-stone-950/50 backdrop-blur px-3 py-1 rounded-full">
               <ArrowLeft size={14} /> Back to Collection
            </Link>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">

            {/* Left: Immersive Image (Taking majority of screen on desktop) */}
            <div className="lg:col-span-8 lg:h-screen lg:sticky lg:top-0 bg-stone-900 flex items-center justify-center p-8 md:p-20 relative group">
               <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
                  <img
                     src={artwork.imageUrl}
                     alt={artwork.title}
                     className="max-w-full max-h-full object-contain shadow-2xl drop-shadow-2xl"
                  />
                  {/* Image Controls */}
                  <div className="absolute bottom-8 right-8 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                     <button onClick={() => setShowAR(true)} className="bg-stone-950/80 backdrop-blur text-white p-3 hover:text-amber-500 transition-colors rounded-full" title="View in AR">
                        <Box size={20} />
                     </button>
                     <button className="bg-stone-950/80 backdrop-blur text-white p-3 hover:text-amber-500 transition-colors rounded-full" title="Zoom">
                        <Maximize2 size={20} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Right: Details Panel */}
            <div className="lg:col-span-4 bg-stone-950 px-8 md:px-12 py-12 lg:py-24 space-y-12 overflow-y-auto">

               {/* Header */}
               <div className="space-y-4">
                  <div className="flex justify-between items-start">
                     <Link to={`/artists/${artwork.artistId}`} className="text-amber-500 uppercase tracking-[0.2em] text-sm hover:text-white transition-colors block mb-2">
                        {artwork.artistName}
                     </Link>
                     <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={`transition-colors ${isSaved ? 'text-red-500' : 'text-stone-500 hover:text-red-500'}`}
                     >
                        <Heart size={20} fill={isSaved ? "currentColor" : "none"} />
                     </button>
                  </div>
                  <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">{artwork.title}</h1>
                  <p className="text-stone-500 text-sm uppercase tracking-widest">{artwork.year} • {artwork.medium}</p>
               </div>

               {/* Description */}
               <div className="prose prose-invert prose-stone">
                  <p className="font-light text-stone-300 leading-relaxed text-lg">{artwork.description}</p>
               </div>

               {/* Commerce Section */}
               <div className="space-y-8 pt-8 border-t border-stone-800">

                  {/* Type Selection */}
                  <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg w-fit">
                     <button
                        onClick={() => setPurchaseType('ORIGINAL')}
                        className={`px-6 py-2 text-xs uppercase tracking-widest rounded-md transition-all ${purchaseType === 'ORIGINAL' ? 'bg-stone-800 text-white shadow' : 'text-stone-500 hover:text-stone-300'}`}
                     >
                        Original
                     </button>
                     <button
                        onClick={() => setPurchaseType('PRINT')}
                        className={`px-6 py-2 text-xs uppercase tracking-widest rounded-md transition-all ${purchaseType === 'PRINT' ? 'bg-stone-800 text-white shadow' : 'text-stone-500 hover:text-stone-300'}`}
                     >
                        Print
                     </button>
                  </div>

                  {purchaseType === 'PRINT' && (
                     <div className="space-y-3">
                        <span className="text-stone-500 text-xs uppercase tracking-widest">Select Size</span>
                        <div className="flex flex-wrap gap-2">
                           {(['A4', 'A3', 'CANVAS_24x36'] as const).map(size => (
                              <button
                                 key={size}
                                 onClick={() => setSelectedPrintSize(size)}
                                 className={`px-4 py-2 border text-xs ${selectedPrintSize === size ? 'border-amber-500 text-amber-500' : 'border-stone-800 text-stone-500 hover:border-stone-600'}`}
                              >
                                 {size.replace('_', ' ')}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Price & Add */}
                  <div className="flex flex-col gap-4">
                     <p className="font-serif text-4xl text-white">{convertPrice(finalPricePKR)}</p>
                     {artwork.inStock ? (
                        <button
                           onClick={handleAddToCart}
                           className="w-full bg-white text-stone-950 hover:bg-stone-200 py-4 uppercase tracking-widest text-xs font-bold transition-all"
                        >
                           Add to Collection
                        </button>
                     ) : (
                        <button disabled className="w-full bg-stone-800 text-stone-500 py-4 uppercase tracking-widest text-xs cursor-not-allowed">
                           Sold Out
                        </button>
                     )}
                     <p className="text-center text-[10px] text-stone-500 uppercase tracking-widest mt-2">
                        Free insured shipping worldwide
                     </p>
                  </div>
               </div>

               {/* Collapsible Meta */}
               <div className="space-y-4 pt-8 border-t border-stone-800">
                  <div className="flex items-center gap-3 text-stone-400 text-xs uppercase tracking-widest">
                     <ShieldCheck size={14} /> Certificate of Authenticity Included
                  </div>
                  <button onClick={() => setShowProvenance(true)} className="flex items-center gap-2 text-amber-500 hover:text-amber-400 text-xs uppercase tracking-widest">
                     <FileText size={14} /> View Provenance Record
                  </button>
               </div>
            </div>
         </div>

         {/* Related Works (Below fold) */}
         {relatedArtworks.length > 0 && (
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24 border-t border-stone-800 mt-12 bg-stone-950">
               <h3 className="font-serif text-3xl text-white mb-12">More from this Series</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedArtworks.map((art) => (
                     <Link key={art.id} to={`/artwork/${art.id}`} className="group block">
                        <div className="aspect-[3/4] overflow-hidden bg-stone-900 mb-4">
                           <img src={art.imageUrl} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                        </div>
                        <h4 className="font-serif text-lg text-white group-hover:text-amber-500 transition-colors">{art.title}</h4>
                        <p className="text-stone-500 text-xs uppercase tracking-widest">{convertPrice(art.price)}</p>
                     </Link>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};
