import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { products, readyPCs, categories } from '@/data/products';
import type { ReadyPC } from '@/data/products';
import SectionHeading from '@/components/SectionHeading';
import ScrollFadeIn from '@/components/ScrollFadeIn';
import PCPlaceholder from '@/components/PCPlaceholder';
import gsap from 'gsap';

const CatalogSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Бүгд');
  const [addedId, setAddedId] = useState<string | number | null>(null);
  const [expandedPC, setExpandedPC] = useState<string | null>(null);
  const { addToCart } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => '₮' + price.toLocaleString('mn-MN');

  const getFilteredItems = () => {
    if (activeFilter === 'Бүгд') {
      return { readyPCs, products };
    }
    if (activeFilter === 'Бэлэн PC') {
      return { readyPCs, products: [] };
    }
    return {
      readyPCs: [],
      products: products.filter(p => p.category === activeFilter),
    };
  };

  const { readyPCs: filteredPCs, products: filteredProducts } = getFilteredItems();

  const handleFilterChange = useCallback((category: string) => {
    if (category === activeFilter) return;
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      gsap.to(cards, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        stagger: 0.02,
        onComplete: () => {
          setActiveFilter(category);
          setExpandedPC(null);
        },
      });
    } else {
      setActiveFilter(category);
      setExpandedPC(null);
    }
  }, [activeFilter]);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out', delay: 0.05 }
      );
    }
  }, [activeFilter]);

  const handleAddToCart = useCallback((item: ReadyPC | typeof products[0]) => {
    const cartItem = 'model' in item
      ? {
          id: parseInt(item.id.replace('pc-', '')) + 100,
          name: `MyTech ${item.model}`,
          category: 'Бэлэн PC',
          specs: `${item.cpu} / ${item.gpu} / ${item.ram} / ${item.storage}`,
          price: item.salePrice,
          image: item.image,
        }
      : item;
    addToCart(cartItem);
    setAddedId('model' in item ? item.id : item.id);
    setTimeout(() => setAddedId(null), 1500);
  }, [addToCart]);

  const toggleExpand = (id: string) => {
    setExpandedPC(prev => prev === id ? null : id);
  };

  return (
    <section id="catalog" className="section-padding relative">
      <div className="container-main">
        <ScrollFadeIn>
          <SectionHeading
            title="Бүтээгдэхүүний каталог"
            subtitle="Хамгийн шилдэг Gaming болон Office компьютерууд"
          />
        </ScrollFadeIn>

        {/* Filter Pills */}
        <ScrollFadeIn delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                  activeFilter === category
                    ? 'bg-electric-blue/15 text-electric-blue border-electric-blue/50'
                    : 'bg-transparent text-muted-text border-white/15 hover:bg-white/5 hover:text-silver'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Ready PCs (Бэлэн PC) */}
          {(activeFilter === 'Бүгд' || activeFilter === 'Бэлэн PC') &&
            filteredPCs.map((pc) => (
              <div key={pc.id} className="product-card">
                <div className="glass-card overflow-hidden p-0">
                  {/* Image — Real photo or MyTech placeholder */}
                  <div className="relative overflow-hidden aspect-[16/10] bg-deep-navy">
                    {pc.image.startsWith('/images/') ? (
                      <img
                        src={pc.image}
                        alt={pc.model}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <PCPlaceholder model={pc.model} gpu={pc.gpu} cpu={pc.cpu} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent" />
                    {/* Model Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 text-sm font-bold rounded-lg bg-electric-blue text-deep-navy">
                        {pc.model}
                      </span>
                    </div>
                    {/* Discount Badge */}
                    {pc.salePrice < pc.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-danger/90 text-white">
                          ХЯМДРАЛ
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    {/* Quick Specs */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 text-xs rounded-md bg-electric-blue/10 text-electric-blue border border-electric-blue/20 font-mono">
                        {pc.cpu}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-md bg-purple/10 text-purple border border-purple/20 font-mono">
                        {pc.gpu}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-md bg-white/5 text-silver border border-white/10 font-mono">
                        {pc.ram}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-electric-blue font-bold text-xl">
                        {formatPrice(pc.salePrice)}
                      </span>
                      {pc.salePrice < pc.originalPrice && (
                        <span className="text-muted-text text-sm line-through">
                          {formatPrice(pc.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Expand Toggle */}
                    <button
                      onClick={() => toggleExpand(pc.id)}
                      className="flex items-center gap-1 text-muted-text text-xs hover:text-electric-blue transition-colors mb-3"
                    >
                      <span>{expandedPC === pc.id ? 'Хураах' : 'Дэлгэрэнгүй'}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform ${expandedPC === pc.id ? 'rotate-180' : ''}`}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Expanded Specs */}
                    {expandedPC === pc.id && (
                      <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        {[
                          ['CPU', pc.cpu],
                          ['Cooler', pc.cooler],
                          ['Motherboard', pc.motherboard],
                          ['RAM', pc.ram],
                          ['Case', pc.case],
                          ['Coolant', pc.coolant],
                          ['PSU', pc.psu],
                          ['GPU', pc.gpu],
                          ['Storage', pc.storage],
                        ].map(([label, value]) => (
                          <div key={label} className="flex justify-between text-xs">
                            <span className="text-muted-text">{label}</span>
                            <span className="text-silver font-mono">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(pc)}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 border ${
                        addedId === pc.id
                          ? 'bg-success/20 text-success border-success/40'
                          : 'bg-electric-blue/15 text-electric-blue border-electric-blue/40 hover:bg-electric-blue hover:text-deep-navy hover:shadow-button'
                      }`}
                      style={{
                        transform: addedId === pc.id ? 'scale(0.97)' : 'scale(1)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {addedId === pc.id ? 'Сагсанд нэмэгдлээ ✓' : 'Сагсанд нэмэх'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          }

          {/* Other Products */}
          {(activeFilter === 'Бүгд' || activeFilter !== 'Бэлэн PC') &&
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="glass-card overflow-hidden p-0">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-electric-blue/20 text-electric-blue border border-electric-blue/30">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-base mb-2 truncate">
                      {product.name}
                    </h3>
                    <p className="text-muted-text text-xs font-mono leading-relaxed mb-3">
                      {product.specs}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-electric-blue font-bold text-lg">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 border ${
                        addedId === product.id
                          ? 'bg-success/20 text-success border-success/40'
                          : 'bg-electric-blue/15 text-electric-blue border-electric-blue/40 hover:bg-electric-blue hover:text-deep-navy hover:shadow-button'
                      }`}
                      style={{
                        transform: addedId === product.id ? 'scale(0.97)' : 'scale(1)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {addedId === product.id ? 'Сагсанд нэмэгдлээ ✓' : 'Сагсанд нэмэх'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Count indicator */}
        <div className="text-center mt-8">
          <p className="text-muted-text text-sm">
            {activeFilter === 'Бүгд'
              ? `Нийт ${readyPCs.length + products.length} бүтээгдэхүүн`
              : activeFilter === 'Бэлэн PC'
              ? `Нийт ${readyPCs.length} бэлэн PC`
              : `Нийт ${filteredProducts.length} бүтээгдэхүүн`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
