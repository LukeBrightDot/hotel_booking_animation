import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { BookingForm, BookingData } from './BookingForm';

interface BookingLayoutProps {
  onSearch?: (data: BookingData) => void;
  className?: string;
}

export const BookingLayout: React.FC<BookingLayoutProps> = ({ onSearch, className = '' }) => {
  const handleSearch = (data: BookingData) => {
    console.log('Search data:', data);
    onSearch?.(data);
  };

  return (
    <div 
      className={className}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2D231C 0%, #1A1510 50%, #0D0A08 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 32px',
        background: 'rgba(26, 21, 16, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}>
        {/* Logo */}
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}>
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '20px',
            fontWeight: 600,
            color: 'rgba(212, 175, 55, 0.9)',
          }}>H</span>
        </div>

        {/* Right Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          {/* Help Button */}
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            fontSize: '13px',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'rgba(205, 188, 174, 0.8)',
            background: 'transparent',
            border: '1px solid rgba(205, 188, 174, 0.2)',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}>
            Need help?
          </button>

          {/* Mic Button */}
          <button style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(205, 188, 174, 0.2)',
            background: 'rgba(255, 255, 255, 0.03)',
            color: 'rgba(205, 188, 174, 0.7)',
            cursor: 'pointer',
          }}>
            <Mic style={{ width: '18px', height: '18px' }} />
          </button>

          {/* Speaker Button */}
          <button style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(205, 188, 174, 0.2)',
            background: 'rgba(255, 255, 255, 0.03)',
            color: 'rgba(205, 188, 174, 0.7)',
            cursor: 'pointer',
          }}>
            <Volume2 style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '100px',
        paddingBottom: '60px',
      }}>
        <BookingForm onSearch={handleSearch} />
      </main>

      {/* Subtle Branding */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontWeight: 300,
        letterSpacing: '0.3em',
        textTransform: 'uppercase' as const,
        fontSize: '10px',
        color: 'rgba(205, 188, 174, 0.3)',
      }}>
        Luxury Stays
      </div>
    </div>
  );
};

export default BookingLayout;
