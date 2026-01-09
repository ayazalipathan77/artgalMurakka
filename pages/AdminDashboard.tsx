import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, Users, DollarSign, Settings, 
  Plus, Edit, Trash2, Truck, CreditCard, Check, X, Search 
} from 'lucide-react';
import { useGallery } from '../context/GalleryContext';
import { useCurrency } from '../App';
import { OrderStatus, Artwork } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    artworks, orders, shippingConfig, totalRevenue, stripeConnected,
    addArtwork, updateArtwork, deleteArtwork, updateOrderStatus, updateShippingConfig, connectStripe 
  } = useGallery();
  const { convertPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'INVENTORY' | 'ORDERS' | 'SHIPPING' | 'FINANCE'>('OVERVIEW');

  // Local State for forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newArtwork, setNewArtwork] = useState<Partial<Artwork>>({
    title: '', artistName: '', price: 0, category: 'Abstract', medium: '', inStock: true
  });
  const [trackingInput, setTrackingInput] = useState<{id: string, code: string} | null>(null);

  const handleAddArtwork = () => {
    if (!newArtwork.title || !newArtwork.price) return;
    addArtwork({
      ...newArtwork,
      id: Date.now().toString(),
      imageUrl: `https://picsum.photos/800/800?random=${Date.now()}`,
      reviews: [],
      year: new Date().getFullYear(),
      dimensions: '24x24'
    } as Artwork);
    setIsAddModalOpen(false);
    setNewArtwork({ title: '', artistName: '', price: 0, category: 'Abstract', medium: '', inStock: true });
  };

  return (
    <div className="pt-24 px-4 sm:px-8 max-w-7xl mx-auto min-h-screen pb-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-stone-800 pb-6">
        <div>
           <h1 className="text-3xl font-serif text-white">Gallery Management</h1>
           <p className="text-stone-500 text-sm mt-1">Administrator Portal</p>
        </div>
        <div className="flex gap-4">
           {['OVERVIEW', 'INVENTORY', 'ORDERS', 'SHIPPING', 'FINANCE'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`text-xs font-bold px-4 py-2 rounded-full transition-colors ${activeTab === tab ? 'bg-amber-600 text-white' : 'bg-stone-900 text-stone-400 hover:text-white'}`}
              >
                {tab}
              </button>
           ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-fade-in">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: DollarSign, label: 'Total Revenue', val: convertPrice(totalRevenue) },
                { icon: Users, label: 'Active Collectors', val: '143' },
                { icon: Package, label: 'Artworks in Stock', val: artworks.filter(a => a.inStock).length.toString() },
                { icon: Truck, label: 'Pending Shipments', val: orders.filter(o => o.status === 'PAID' || o.status === 'PROCESSING').length.toString() },
              ].map((stat, i) => (
                <div key={i} className="bg-stone-900 p-6 rounded-lg border border-stone-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-stone-400 text-sm uppercase tracking-wider">{stat.label}</span>
                    <stat.icon className="text-amber-500" size={20} />
                  </div>
                  <div className="text-2xl text-white font-serif">{stat.val}</div>
                </div>
              ))}
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-stone-900 p-6 border border-stone-800">
                 <h3 className="text-white font-serif text-xl mb-4">Recent Activity</h3>
                 <ul className="space-y-4 text-sm text-stone-400">
                    {orders.slice(0, 5).map(o => (
                       <li key={o.id} className="flex justify-between items-center border-b border-stone-800 pb-2">
                          <span>New order from <strong className="text-white">{o.customerName}</strong></span>
                          <span className="text-xs">{new Date(o.date).toLocaleDateString()}</span>
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-stone-900 p-6 border border-stone-800 flex items-center justify-center flex-col">
                 <div className="text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${stripeConnected ? 'bg-green-900/20 text-green-500' : 'bg-stone-800 text-stone-500'}`}>
                       <CreditCard size={32} />
                    </div>
                    <h3 className="text-white font-serif text-xl">Payment Gateway</h3>
                    <p className="text-stone-500 text-sm">{stripeConnected ? 'Stripe Connect Active' : 'Setup Required'}</p>
                    {!stripeConnected && (
                       <button onClick={connectStripe} className="bg-white text-black px-6 py-2 text-xs uppercase font-bold hover:bg-stone-200">Connect Stripe</button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* INVENTORY TAB */}
      {activeTab === 'INVENTORY' && (
         <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
               <h3 className="text-xl text-white font-serif">Artwork Catalog</h3>
               <button onClick={() => setIsAddModalOpen(true)} className="bg-amber-600 text-white px-4 py-2 text-sm flex items-center gap-2 hover:bg-amber-500">
                  <Plus size={16} /> Add Artwork
               </button>
            </div>
            
            {/* Add Modal */}
            {isAddModalOpen && (
               <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                  <div className="bg-stone-900 border border-stone-700 p-6 w-full max-w-lg space-y-4">
                     <h3 className="text-white text-xl">Add New Masterpiece</h3>
                     <input className="w-full bg-stone-950 border border-stone-700 p-2 text-white" placeholder="Title" value={newArtwork.title} onChange={e => setNewArtwork({...newArtwork, title: e.target.value})} />
                     <input className="w-full bg-stone-950 border border-stone-700 p-2 text-white" placeholder="Artist Name" value={newArtwork.artistName} onChange={e => setNewArtwork({...newArtwork, artistName: e.target.value})} />
                     <input className="w-full bg-stone-950 border border-stone-700 p-2 text-white" type="number" placeholder="Price (PKR)" value={newArtwork.price || ''} onChange={e => setNewArtwork({...newArtwork, price: Number(e.target.value)})} />
                     <div className="flex gap-2">
                        <button onClick={handleAddArtwork} className="flex-1 bg-amber-600 py-2 text-white">Save</button>
                        <button onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-stone-800 py-2 text-white">Cancel</button>
                     </div>
                  </div>
               </div>
            )}

            <div className="bg-stone-900 border border-stone-800 overflow-x-auto">
               <table className="w-full text-left text-sm text-stone-400">
                  <thead className="bg-stone-950 text-stone-500 uppercase text-xs border-b border-stone-800">
                     <tr>
                        <th className="p-4">Artwork</th>
                        <th className="p-4">Artist</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                     {artworks.map(art => (
                        <tr key={art.id} className="hover:bg-stone-800/30">
                           <td className="p-4 flex items-center gap-3">
                              <img src={art.imageUrl} className="w-10 h-10 object-cover rounded" alt="" />
                              <span className="text-white font-medium">{art.title}</span>
                           </td>
                           <td className="p-4">{art.artistName}</td>
                           <td className="p-4">{convertPrice(art.price)}</td>
                           <td className="p-4">
                              <button 
                                 onClick={() => updateArtwork(art.id, { inStock: !art.inStock })}
                                 className={`px-2 py-1 text-xs rounded ${art.inStock ? 'bg-green-900/20 text-green-500' : 'bg-red-900/20 text-red-500'}`}
                              >
                                 {art.inStock ? 'In Stock' : 'Sold Out'}
                              </button>
                           </td>
                           <td className="p-4 flex gap-2">
                              <button className="text-stone-500 hover:text-white"><Edit size={16}/></button>
                              <button onClick={() => deleteArtwork(art.id)} className="text-stone-500 hover:text-red-500"><Trash2 size={16}/></button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'ORDERS' && (
         <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl text-white font-serif">Order Management</h3>
            <div className="bg-stone-900 border border-stone-800 overflow-x-auto">
               <table className="w-full text-left text-sm text-stone-400">
                  <thead className="bg-stone-950 text-stone-500 uppercase text-xs border-b border-stone-800">
                     <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Fulfillment</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                     {orders.map(order => (
                        <tr key={order.id} className="hover:bg-stone-800/30">
                           <td className="p-4 font-mono text-white">{order.id}</td>
                           <td className="p-4">
                              <div className="text-white">{order.customerName}</div>
                              <div className="text-xs">{order.shippingCountry}</div>
                           </td>
                           <td className="p-4">{convertPrice(order.totalAmount)}</td>
                           <td className="p-4">
                              <div className="flex flex-col">
                                 <span className="text-xs font-bold text-white">{order.paymentMethod}</span>
                                 {order.transactionId && <span className="text-[10px] font-mono text-stone-500">{order.transactionId}</span>}
                              </div>
                           </td>
                           <td className="p-4">
                              <select 
                                 value={order.status}
                                 onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                                 className="bg-stone-950 border border-stone-700 text-xs text-white p-1 rounded"
                              >
                                 {['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                 ))}
                              </select>
                           </td>
                           <td className="p-4">
                              {order.trackingNumber ? (
                                 <span className="text-green-500 text-xs flex items-center gap-1"><Truck size={12}/> {order.trackingNumber}</span>
                              ) : (
                                 trackingInput?.id === order.id ? (
                                    <div className="flex gap-1">
                                       <input 
                                          className="w-24 bg-stone-950 text-white text-xs p-1 border border-stone-600" 
                                          placeholder="Tracking #" 
                                          value={trackingInput.code} 
                                          onChange={e => setTrackingInput({id: order.id, code: e.target.value})}
                                       />
                                       <button onClick={() => { updateOrderStatus(order.id, 'SHIPPED', trackingInput.code); setTrackingInput(null); }} className="text-green-500"><Check size={16}/></button>
                                       <button onClick={() => setTrackingInput(null)} className="text-red-500"><X size={16}/></button>
                                    </div>
                                 ) : (
                                    <button onClick={() => setTrackingInput({id: order.id, code: ''})} className="text-amber-500 text-xs hover:underline">Add Tracking</button>
                                 )
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {/* FINANCE / STRIPE TAB */}
      {activeTab === 'FINANCE' && (
         <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl text-white font-serif">Financial Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-stone-900 p-6 border border-stone-800">
                  <h4 className="text-stone-500 text-xs uppercase tracking-widest mb-4">Stripe Connection</h4>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stripeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-white text-lg">{stripeConnected ? 'Connected' : 'Disconnected'}</span>
                     </div>
                     {!stripeConnected && <button onClick={connectStripe} className="text-amber-500 text-sm hover:underline">Connect Now</button>}
                  </div>
                  {stripeConnected && (
                     <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-sm text-stone-400"><span>Account ID</span><span className="font-mono text-white">acct_1Muraqqa8291</span></div>
                        <div className="flex justify-between text-sm text-stone-400"><span>Payout Schedule</span><span className="text-white">Daily</span></div>
                     </div>
                  )}
               </div>
               
               <div className="bg-stone-900 p-6 border border-stone-800">
                  <h4 className="text-stone-500 text-xs uppercase tracking-widest mb-4">Next Payout</h4>
                  <div className="text-4xl text-white font-serif mb-2">PKR 1,250,000</div>
                  <p className="text-stone-500 text-sm">Scheduled for Oct 25, 2024</p>
                  <button className="mt-6 w-full bg-stone-800 text-white py-2 text-sm hover:bg-stone-700">View Transactions</button>
               </div>
            </div>
         </div>
      )}

      {/* SHIPPING TAB */}
      {activeTab === 'SHIPPING' && (
         <div className="space-y-6 animate-fade-in">
            <h3 className="text-xl text-white font-serif">Shipping Configuration</h3>
            <div className="bg-stone-900 p-8 border border-stone-800 max-w-2xl">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-white text-lg flex items-center gap-2"><Truck className="text-amber-500"/> DHL Integration</span>
                  <div 
                     onClick={() => updateShippingConfig({enableDHL: !shippingConfig.enableDHL})}
                     className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${shippingConfig.enableDHL ? 'bg-amber-600' : 'bg-stone-700'}`}
                  >
                     <div className={`w-4 h-4 rounded-full bg-white transition-transform ${shippingConfig.enableDHL ? 'translate-x-6' : ''}`}></div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div>
                     <label className="block text-stone-500 text-xs uppercase mb-2">DHL API Key</label>
                     <input 
                        type="password" 
                        value={shippingConfig.dhlApiKey} 
                        onChange={(e) => updateShippingConfig({dhlApiKey: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-700 p-3 text-white font-mono" 
                        disabled={!shippingConfig.enableDHL}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <label className="block text-stone-500 text-xs uppercase mb-2">Flat Rate (Domestic)</label>
                        <input 
                           type="number" 
                           value={shippingConfig.domesticRate} 
                           onChange={(e) => updateShippingConfig({domesticRate: Number(e.target.value)})}
                           className="w-full bg-stone-950 border border-stone-700 p-3 text-white" 
                        />
                     </div>
                     <div>
                        <label className="block text-stone-500 text-xs uppercase mb-2">Flat Rate (Intl)</label>
                        <input 
                           type="number" 
                           value={shippingConfig.internationalRate} 
                           onChange={(e) => updateShippingConfig({internationalRate: Number(e.target.value)})}
                           className="w-full bg-stone-950 border border-stone-700 p-3 text-white" 
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};
