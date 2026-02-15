# OfflineShop

A Progressive Web App (PWA) that provides a seamless shopping experience, with full offline functionality. Browse and manage your shopping cart even when you're not connected to the internet.

## Features

- 🛒 **Shopping Cart**: Add, remove, and manage products in your cart
- 📱 **Progressive Web App**: Install as a native-like app on your device
- 🔌 **Offline Support**: Full functionality works without internet connection
- 🖼️ **Smart Image Caching**: Product images are cached for offline access
- 🔄 **Auto-Update**: Service worker automatically updates the app when new versions are available
- 📡 **Online Status Detection**: Real-time indicator showing your connection status

## How to Start the Project

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd offline-shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

To create a production build:

```bash
npm run build
```

This generates an optimized build in the `dist/` folder.

### Preview Production Build

To test the production build locally:

```bash
npm run preview
```

## Service Worker Explained

The service worker is the backbone of the offline functionality. Here's how it works:

### What is a Service Worker?

A service worker is a background script that runs independently of your web page. It acts as a proxy between your app and the network, allowing the app to work offline and providing enhanced caching capabilities.

### How OfflineShop's Service Worker Works

#### 1. **Registration & Installation**

The service worker is automatically registered when the app loads. The `vite-plugin-pwa` plugin handles this registration with the `autoUpdate` strategy, which means:
- The service worker automatically checks for updates in the background
- New updates are fetched and cached without interrupting the user
- Users see the updated app on their next visit or when explicitly updated

#### 2. **Caching Strategy**

The app uses two main caching strategies:

##### **Cache First Strategy (for static assets)**
- Static assets (HTML, CSS, JavaScript, fonts, images) are cached when first accessed
- Subsequent requests are served from the cache immediately
- This ensures instant loading and offline availability

Files cached include:
- `.js`, `.css`, `.html` - Application code and styles
- `.ico`, `.png`, `.svg` - Icons and graphics
- `.woff2` - Font files

##### **Network First Strategy (for dynamic content)**
- External images from Unsplash are fetched from the network first
- If the network is unavailable, cached images are served
- Cached images expire after 30 days or after 50 entries

#### 3. **Offline Functionality**

When you go offline:
1. Your cart data remains available in the browser's local storage
2. Previously visited pages and cached assets load instantly
3. Product images that were viewed before are displayed from the cache
4. The app remains fully functional for browsing and cart management

When you come back online:
1. The service worker automatically fetches new content updates
2. The `NetworkBanner` component displays a notification showing your connection status
3. Any new products or price updates are fetched on refresh

#### 4. **Cache Management**

The service worker in OfflineShop specifically handles:

- **Unsplash Images Cache** (`unsplash-images`):
  - URLs matching `https://images.unsplash.com/` are cached
  - Cache can store up to 50 images
  - Cached images are valid for 30 days
  - Both successful (200) and network errors (0) responses are cached

### How to Test Offline Functionality

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Open the app** in your browser and add some products to your cart

3. **Test offline mode**:
   - **In DevTools**: Open Chrome DevTools → Application → Service Workers → Check "Offline"
   - **In Browser**: Open DevTools → Network tab → Toggle the throttle dropdown to "Offline"

4. **Verify offline functionality**:
   - Your cart items should still be visible
   - Previously loaded product images should display
   - You can still add/remove items from the cart
   - The NetworkBanner should indicate you're offline

5. **Go back online**: Uncheck the offline option and the app will sync any changes

### File Structure

```
offline-shop/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # App header with online/offline indicator
│   │   ├── CartDrawer.jsx   # Shopping cart sidebar
│   │   ├── ProductCard.jsx  # Individual product card
│   │   ├── ProductModal.jsx # Product details modal
│   │   └── NetworkBanner.jsx # Online/offline status banner
│   ├── hooks/
│   │   ├── useCart.js       # Cart state management
│   │   └── useOnlineStatus.js # Online status detection hook
│   ├── data/
│   │   └── products.js      # Product data
│   └── App.jsx              # Main app component
├── vite.config.js           # Vite & PWA configuration
├── index.html               # HTML entry point
└── package.json             # Project dependencies
```

### Technologies Used

- **React** - UI library
- **Vite** - Build tool and dev server
- **Vite PWA Plugin** - Service worker and PWA manifest generation
- **Workbox** - Service worker library (used by Vite PWA)

### Browser Compatibility

Service workers work in:
- ✅ Chrome/Edge 40+
- ✅ Firefox 44+
- ✅ Safari 11.1+
- ✅ Opera 27+

### Tips for Best Performance

1. **Build before deployment**: Always use `npm run build` for production
2. **Test offline**: Regularly test offline functionality during development
3. **Monitor cache**: Check DevTools → Application → Cache Storage to see cached items
4. **Update strategy**: Users will get updates automatically on their next visit

### Troubleshooting

#### Service Worker not updating
- **Solution**: In DevTools, go to Application → Service Workers → Click "Update"
- Or hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

#### Images not loading offline
- **Issue**: Only images from Unsplash that were viewed before will be available offline
- **Solution**: Browse the products while online to cache the images

#### Cart not persisting
- **Check**: Verify local storage is not disabled
- **DevTools**: Application → Local Storage → Look for cart data

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
