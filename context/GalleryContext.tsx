import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Artwork, Order, ShippingConfig, OrderStatus } from '../types';
import { MOCK_ARTWORKS } from '../constants';

interface GalleryContextType {
  artworks: Artwork[];
  orders: Order[];
  shippingConfig: ShippingConfig;
  
  // Inventory Actions
  addArtwork: (art: Artwork) => void;
  updateArtwork: (id: string, updates: Partial<Artwork>) => void;
  deleteArtwork: (id: string) => void;
  
  // Order Actions
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus, tracking?: string) => void;
  
  // Settings Actions
  updateShippingConfig: (config: Partial<ShippingConfig>) => void;
  
  // Financials (Mock)
  stripeConnected: boolean;
  connectStripe: () => void;
  totalRevenue: number;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) throw new Error('useGallery must be used within GalleryProvider');
  return context;
};

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Inventory State ---
  const [artworks, setArtworks] = useState<Artwork[]>(MOCK_ARTWORKS);

  // --- Order State (Mock Initial Data) ---
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Ali Khan',
      customerEmail: 'ali@example.com',
      items: [MOCK_ARTWORKS[0] as any],
      totalAmount: 450000,
      currency: 'PKR' as any,
      status: 'SHIPPED',
      date: new Date('2023-11-15'),
      shippingAddress: '123 DHA Phase 6, Lahore',
      shippingCountry: 'Pakistan',
      trackingNumber: 'DHL-9928382',
      paymentMethod: 'STRIPE',
      transactionId: 'pi_3M9x8K2eZvKylo2C1x5y8'
    },
    {
      id: 'ORD-002',
      customerName: 'John Smith',
      customerEmail: 'john@london.co.uk',
      items: [MOCK_ARTWORKS[3] as any],
      totalAmount: 950000,
      currency: 'PKR' as any,
      status: 'PROCESSING',
      date: new Date('2024-01-20'),
      shippingAddress: '45 Baker St, London',
      shippingCountry: 'UK',
      paymentMethod: 'STRIPE',
      transactionId: 'pi_3N5j1L2eZvKylo2C9a2b1'
    }
  ]);

  // --- Settings State ---
  const [shippingConfig, setShippingConfig] = useState<ShippingConfig>({
    domesticRate: 500,
    internationalRate: 8500,
    enableDHL: true,
    dhlApiKey: 'MOCK_DHL_KEY_123',
    freeShippingThreshold: 1000000
  });

  const [stripeConnected, setStripeConnected] = useState(false);

  // --- Actions ---

  const addArtwork = (art: Artwork) => {
    setArtworks(prev => [art, ...prev]);
  };

  const updateArtwork = (id: string, updates: Partial<Artwork>) => {
    setArtworks(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteArtwork = (id: string) => {
    setArtworks(prev => prev.filter(a => a.id !== id));
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (id: string, status: OrderStatus, tracking?: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status, trackingNumber: tracking || o.trackingNumber } : o));
  };

  const updateShippingConfig = (config: Partial<ShippingConfig>) => {
    setShippingConfig(prev => ({ ...prev, ...config }));
  };

  const connectStripe = () => {
    // Simulate connection
    setTimeout(() => setStripeConnected(true), 1500);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'CANCELLED' ? o.totalAmount : 0), 0);

  return (
    <GalleryContext.Provider value={{
      artworks,
      orders,
      shippingConfig,
      addArtwork,
      updateArtwork,
      deleteArtwork,
      addOrder,
      updateOrderStatus,
      updateShippingConfig,
      stripeConnected,
      connectStripe,
      totalRevenue
    }}>
      {children}
    </GalleryContext.Provider>
  );
};
