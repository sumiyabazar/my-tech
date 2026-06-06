import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import type { CheckoutStep } from '@/types';
import gsap from 'gsap';
import html2canvas from 'html2canvas';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '' });
  const [generatingImage, setGeneratingImage] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const orderImageRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => {
    return '₮' + price.toLocaleString('mn-MN');
  };

  // Animate panel open/close
  useEffect(() => {
    if (!panelRef.current || !backdropRef.current) return;
    if (isOpen) {
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(panelRef.current, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      gsap.to(panelRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
      });
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Animate content transitions
  useEffect(() => {
    if (contentRef.current && isOpen) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [step, isOpen]);

  const handleCheckout = useCallback(() => {
    setStep('checkout');
  }, []);

  const generateOrderImage = async (): Promise<string | null> => {
    if (!orderImageRef.current) return null;
    try {
      const canvas = await html2canvas(orderImageRef.current, {
        backgroundColor: '#0A0E27',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      return canvas.toDataURL('image/png');
    } catch (err) {
      console.error('Failed to generate order image:', err);
      return null;
    }
  };

  const handleConfirmOrder = useCallback(async () => {
    setGeneratingImage(true);

    // Generate order image (for future use - can be sent as attachment)
    await generateOrderImage();

    // Build order text message
    const orderLines = items.map(
      (item) => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    );
    const orderText = [
      '🖥️ MyTech - Шинэ захиалга',
      '',
      `👤 Нэр: ${orderForm.name}`,
      `📞 Утас: ${orderForm.phone}`,
      `📍 Хаяг: ${orderForm.address}`,
      '',
      '📦 Захиалсан бараа:',
      ...orderLines,
      '',
      `💰 Нийт дүн: ${formatPrice(getCartTotal())}`,
    ].join('\n');

    setGeneratingImage(false);
    setStep('success');
    clearCart();

    // Open Facebook Messenger after a short delay
    setTimeout(() => {
      const fbMessage = encodeURIComponent(orderText);
      const fbUrl = `https://m.me/MyTech19?ref=order&text=${fbMessage}`;
      window.open(fbUrl, '_blank', 'noopener,noreferrer');
    }, 500);
  }, [items, orderForm, getCartTotal, clearCart]);

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      setOrderForm({ name: '', phone: '', address: '' });
      setGeneratingImage(false);
    }, 400);
  }, [onClose]);

  // Generate current date string
  const orderDate = new Date().toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const orderTime = new Date().toLocaleTimeString('mn-MN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 bg-black/70 z-[1099] opacity-0"
        onClick={handleClose}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-deep-navy/95 backdrop-blur-[20px] border-l border-white/10 z-[1100] flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">
            {step === 'cart' && 'Таны сагс'}
            {step === 'checkout' && 'Захиалга батлах'}
            {step === 'success' && 'Амжилттай!'}
          </h3>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Хаах"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-silver">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-text mb-4">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-muted-text text-lg mb-6">Сагс хоосон байна</p>
                  <button onClick={handleClose} className="btn-primary">
                    Дэлгүүр үзэх
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[60px] h-[60px] object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-muted-text text-xs font-mono mt-1 truncate">{item.specs}</p>
                        <p className="text-electric-blue text-sm font-semibold mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
                          >
                            -
                          </button>
                          <span className="text-white text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto w-7 h-7 flex items-center justify-center rounded-md hover:bg-danger/20 transition-colors text-muted-text hover:text-danger"
                            aria-label="Устгах"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {step === 'checkout' && (
            <div className="space-y-6">
              {/* Order Summary Preview */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h4 className="text-white font-medium mb-3">Захиалгын мэдээлэл</h4>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span className="text-silver">{item.name} x{item.quantity}</span>
                    <span className="text-electric-blue">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 mt-3 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Нийт дүн:</span>
                  <span className="text-electric-blue font-bold text-lg">{formatPrice(getCartTotal())}</span>
                </div>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-4">
                <h4 className="text-white font-medium">Холбоо барих мэдээлэл</h4>
                <input
                  type="text"
                  placeholder="Нэр *"
                  required
                  value={orderForm.name}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Утас *"
                  required
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Хүргүүлэх хаяг"
                  value={orderForm.address}
                  onChange={(e) => setOrderForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-muted-text focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
              </div>

              {/* Hidden Order Image Template (for html2canvas capture) */}
              <div
                ref={orderImageRef}
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: 0,
                  width: '500px',
                  padding: '30px',
                  background: 'linear-gradient(135deg, #0A0E27 0%, #000000 100%)',
                  fontFamily: 'Inter, sans-serif',
                  color: '#ffffff',
                }}
              >
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '25px', paddingBottom: '20px', borderBottom: '2px solid rgba(0, 229, 255, 0.3)' }}>
                  <h1 style={{
                    fontSize: '28px',
                    fontWeight: 800,
                    margin: 0,
                    background: 'linear-gradient(90deg, #00E5FF, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    MyTech
                  </h1>
                  <p style={{ color: '#94A3B8', fontSize: '12px', margin: '5px 0 0', letterSpacing: '2px' }}>ЗАХИАЛГЫН МЭДЭЭЛЭЛ</p>
                </div>

                {/* Order ID & Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '12px', color: '#94A3B8' }}>
                  <span>Захиалга #{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                  <span>{orderDate} {orderTime}</span>
                </div>

                {/* Customer Info */}
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '15px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>НЭР: </span>
                    <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{orderForm.name || '-'}</span>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>УТАС: </span>
                    <span style={{ color: '#00E5FF', fontSize: '13px', fontWeight: 600 }}>{orderForm.phone || '-'}</span>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8', fontSize: '11px' }}>ХАЯГ: </span>
                    <span style={{ color: '#E2E8F0', fontSize: '12px' }}>{orderForm.address || '-'}</span>
                  </div>
                </div>

                {/* Items Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(0, 229, 255, 0.3)' }}>
                      <th style={{ textAlign: 'left', padding: '8px 0', color: '#94A3B8', fontSize: '11px', fontWeight: 500 }}>БАРАА</th>
                      <th style={{ textAlign: 'center', padding: '8px 0', color: '#94A3B8', fontSize: '11px', fontWeight: 500 }}>ТОО</th>
                      <th style={{ textAlign: 'right', padding: '8px 0', color: '#94A3B8', fontSize: '11px', fontWeight: 500 }}>ҮНЭ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 0', fontSize: '12px', color: '#fff' }}>{item.name}</td>
                        <td style={{ padding: '10px 0', textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>x{item.quantity}</td>
                        <td style={{ padding: '10px 0', textAlign: 'right', fontSize: '12px', color: '#00E5FF', fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(124, 58, 237, 0.1))',
                  borderRadius: '12px',
                  padding: '15px 20px',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#94A3B8', fontSize: '13px' }}>НИЙТ ДҮН</span>
                  <span style={{
                    color: '#00E5FF',
                    fontSize: '22px',
                    fontWeight: 800,
                  }}>{formatPrice(getCartTotal())}</span>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Хан-Уул дүүрэг, Four Seasons хотхон</p>
                  <p style={{ color: '#94A3B8', fontSize: '11px', margin: '3px 0 0' }}>facebook.com/MyTech19 | 8964-6478</p>
                </div>

                {/* MyTech logo glow */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '15px',
                  fontSize: '10px',
                  color: 'rgba(0, 229, 255, 0.4)',
                  letterSpacing: '3px',
                }}>
                  MYTECH.MN
                </div>
              </div>

              {/* Info note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-electric-blue/5 border border-electric-blue/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p className="text-silver text-sm leading-relaxed">
                  Захиалга батлагдсаны дараа Facebook Messenger-р <span className="text-electric-blue font-medium">MyTech</span> хуудсанд автоматаар илгээнэ. Та мессэжээ шалгана уу.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <div className="w-20 h-20 rounded-full bg-electric-blue/20 flex items-center justify-center mb-6 animate-pulse">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Захиалга батлагдлаа!</h3>
              <p className="text-muted-text mb-2">Таны захиалга MyTech-ийн Facebook Messenger-д илгээгдлээ.</p>
              <p className="text-silver text-sm mb-8">Бид тантай удахгүй холбогдох болно.</p>

              {/* Facebook link reminder */}
              <a
                href="https://m.me/MyTech19"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mb-4"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook Messenger нээх
              </a>
              <button onClick={handleClose} className="btn-outline">
                Дэлгүүр үзэх
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-silver font-medium">Нийт дүн:</span>
              <span className="text-electric-blue font-bold text-xl">{formatPrice(getCartTotal())}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full">
              Захиалга өгөх
            </button>
            <button onClick={handleClose} className="btn-outline w-full">
              Дэлгүүр үзэх
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="p-6 border-t border-white/10 space-y-3">
            <button
              onClick={handleConfirmOrder}
              className="btn-primary w-full relative"
              disabled={!orderForm.name || !orderForm.phone || generatingImage}
              style={{ opacity: !orderForm.name || !orderForm.phone || generatingImage ? 0.6 : 1 }}
            >
              {generatingImage ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ордер зураг бэлдэж байна...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                  Захиалга батлах
                </>
              )}
            </button>
            <button
              onClick={() => setStep('cart')}
              className="btn-outline w-full"
            >
              Буцах
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
