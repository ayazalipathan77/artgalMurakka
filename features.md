# Muraqqa - Feature Implementation Checklist

## Frontend Features (Implemented)
- [x] **Theme:** Subtle ambient dark with warmer feels (Stone & Amber palette).
- [x] **Landing Page:** Hero section, moving visuals (CSS parallax/transitions), top picks.
- [x] **Navigation:** Sticky navbar, English/Urdu toggle support.
- [x] **Gallery/Marketplace:** Search, Filter by Category, Price (UI).
- [x] **Product Detail:** High-quality image, details, provenance ID display.
- [x] **AR Feature:** Browser-based camera overlay (`<video>` + `<img>` overlay).
- [x] **AI Art Discovery:** Google Gemini integration for art curation chat.
- [x] **Cart/Ecommerce:** Add to cart state, Print vs Original options, pricing logic.
- [x] **Admin Dashboard:** UI for inventory and orders stats.
- [x] **Responsiveness:** Mobile-first Tailwind design.

## Backend/Business Logic (Simulated/Ready for Integration)
- [ ] **Database (PostgreSQL):** *See Schema below.*
- [ ] **Payment Gateway:** Stripe/Bank Transfer (UI placeholder present).
- [ ] **Shipping:** DHL Integration (Calculation logic placeholder present).
- [ ] **Auth:** JWT/Session handling (Mock routes present).
- [ ] **Notifications:** WhatsApp/Email triggers (Requires backend worker).

## Database Schema (ERD Design for PostgreSQL)

```sql
-- Users & Auth
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER', -- 'ADMIN', 'ARTIST', 'USER'
    full_name VARCHAR(100),
    phone_number VARCHAR(20) -- For WhatsApp notifications
);

-- Artists
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    bio TEXT,
    portfolio_url VARCHAR(255),
    origin_city VARCHAR(100)
);

-- Inventory
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artist_id UUID REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'PKR',
    category VARCHAR(50),
    medium VARCHAR(100),
    dimensions VARCHAR(50),
    image_url TEXT,
    provenance_hash VARCHAR(255), -- Blockchain link
    stock_status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    total_amount DECIMAL(12, 2),
    shipping_address TEXT,
    status VARCHAR(50), -- 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED'
    tracking_number VARCHAR(100),
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    artwork_id UUID REFERENCES artworks(id),
    item_type VARCHAR(20) -- 'ORIGINAL', 'PRINT'
);
```
