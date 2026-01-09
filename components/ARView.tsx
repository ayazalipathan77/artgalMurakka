import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, RefreshCw, Smartphone, Check, Move } from 'lucide-react';
import { Artwork } from '../types';

interface ARViewProps {
  artwork: Artwork;
  onClose: () => void;
}

export const ARView: React.FC<ARViewProps> = ({ artwork, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [arStep, setArStep] = useState<'SCANNING' | 'READY' | 'PLACED'>('SCANNING');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        // Simulate surface detection delay
        setTimeout(() => {
           setArStep(prev => prev === 'SCANNING' ? 'READY' : prev);
        }, 3000);
      } catch (err) {
        setError('Camera access denied or unavailable. Please enable permissions.');
        console.error("Camera Error:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleTap = () => {
    if (arStep === 'READY') {
      setArStep('PLACED');
    }
  };

  const resetAR = (e: React.MouseEvent) => {
    e.stopPropagation();
    setArStep('SCANNING');
    setTimeout(() => setArStep('READY'), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col" onClick={handleTap}>
      {/* Header Controls */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between px-6">
         <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/20">
            <p className="text-white text-xs font-mono uppercase">
               {arStep === 'SCANNING' && 'Detecting Surface...'}
               {arStep === 'READY' && 'Surface Detected'}
               {arStep === 'PLACED' && 'Artwork Placed'}
            </p>
         </div>
         <button onClick={onClose} className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 border border-white/10">
           <X size={20} />
         </button>
      </div>

      <div className="flex-1 relative overflow-hidden bg-stone-900 flex items-center justify-center">
        {error ? (
          <div className="text-center p-8">
            <Camera size={48} className="mx-auto mb-4 text-red-500" />
            <p className="text-white">{error}</p>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* AR Overlays */}
            <div className="absolute inset-0 pointer-events-none">
               
               {/* Scanning Overlay */}
               {arStep === 'SCANNING' && (
                  <div className="w-full h-full relative">
                     <div className="absolute inset-x-0 h-0.5 bg-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white/80 flex flex-col items-center gap-4">
                           <Smartphone className="animate-pulse" size={48} />
                           <p className="text-sm font-medium bg-black/50 px-4 py-2 rounded">Move device slowly</p>
                        </div>
                     </div>
                     {/* Scanning Grid Points */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:40px_40px] opacity-30"></div>
                  </div>
               )}

               {/* Ready / Placement Reticle */}
               {arStep === 'READY' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="relative">
                        {/* Floor Reticle Simulation */}
                        <div className="w-64 h-64 border-2 border-dashed border-white/70 rounded-full animate-[spin_10s_linear_infinite] opacity-80" style={{ transform: 'rotateX(60deg)' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,1)]"></div>
                        </div>
                        <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max text-white text-sm font-bold shadow-black drop-shadow-md animate-bounce">
                           Tap to Place
                        </p>
                     </div>
                  </div>
               )}

               {/* Placed Artwork */}
               {arStep === 'PLACED' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="relative group cursor-grab active:cursor-grabbing">
                        {/* Shadow to ground it */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/60 blur-xl rounded-[100%]"></div>
                        {/* Artwork */}
                        <img 
                           src={artwork.imageUrl} 
                           alt="AR Overlay" 
                           className="w-64 md:w-80 h-auto object-contain drop-shadow-2xl border-4 border-white/10" 
                        />
                        {/* Interactive Hints */}
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <div className="bg-black/60 p-2 rounded-full text-white"><Move size={16}/></div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
          </>
        )}
      </div>
      
      {/* Footer Controls */}
      <div className="bg-stone-950/80 backdrop-blur-md p-6 pb-8 border-t border-white/10">
        <div className="flex justify-between items-center max-w-md mx-auto">
           {arStep === 'PLACED' ? (
              <div className="flex gap-4 w-full justify-center">
                 <button onClick={resetAR} className="flex flex-col items-center gap-1 text-stone-400 hover:text-white transition-colors">
                    <div className="p-3 bg-stone-800 rounded-full"><RefreshCw size={20}/></div>
                    <span className="text-[10px] uppercase tracking-widest">Reset</span>
                 </button>
                 <button className="flex flex-col items-center gap-1 text-amber-500 hover:text-amber-400 transition-colors">
                    <div className="p-4 bg-white rounded-full border-4 border-stone-800 outline outline-1 outline-amber-500"><Camera size={24} className="text-black"/></div>
                 </button>
                 <button onClick={onClose} className="flex flex-col items-center gap-1 text-stone-400 hover:text-white transition-colors">
                    <div className="p-3 bg-stone-800 rounded-full"><Check size={20}/></div>
                    <span className="text-[10px] uppercase tracking-widest">Done</span>
                 </button>
              </div>
           ) : (
              <div className="w-full text-center">
                 <h3 className="text-white font-serif text-lg">
                    {arStep === 'SCANNING' ? 'Scanning Environment' : 'Placement Ready'}
                 </h3>
                 <p className="text-stone-400 text-xs mt-1">
                    {arStep === 'SCANNING' ? 'Find a well-lit flat surface' : 'Tap screen to anchor artwork'}
                 </p>
              </div>
           )}
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};