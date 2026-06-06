import { useState, useCallback } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navigation from '@/components/Navigation';
import CartPanel from '@/components/CartPanel';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import FeaturesSection from '@/sections/FeaturesSection';
import CatalogSection from '@/sections/CatalogSection';
import ServicesSection from '@/sections/ServicesSection';
import CustomBuildSection from '@/sections/CustomBuildSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import ContactSection from '@/sections/ContactSection';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartClick = useCallback(() => {
    setCartOpen(true);
  }, []);

  const handleCartClose = useCallback(() => {
    setCartOpen(false);
  }, []);

  return (
    <CartProvider>
      {/* Custom Cursor (desktop only) */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation onCartClick={handleCartClick} />

      {/* Cart Panel */}
      <CartPanel isOpen={cartOpen} onClose={handleCartClose} />

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <CatalogSection />
        <ServicesSection />
        <CustomBuildSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </CartProvider>
  );
}

export default App;
