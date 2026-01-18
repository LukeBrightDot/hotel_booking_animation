import React from 'react';
import { Users, Bed, Shield, X } from 'lucide-react';
import type { RoomType } from '@/types/hotel';

interface RoomCardProps {
  room: RoomType;
  index?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, index = 0 }) => {
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      style={{
        background: 'hsl(30 20% 96% / 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid hsl(30 15% 88% / 0.5)',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 300ms ease',
        animation: 'fadeRise 0.6s ease-out forwards',
        animationDelay: `${index * 100}ms`,
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'hsl(30 20% 96% / 0.8)';
        e.currentTarget.style.borderColor = 'hsl(15 55% 70% / 0.3)';
        e.currentTarget.style.boxShadow = '0 0 40px hsl(15 55% 70% / 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'hsl(30 20% 96% / 0.5)';
        e.currentTarget.style.borderColor = 'hsl(30 15% 88% / 0.5)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Room Type Header */}
      <div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '1.25rem',
          fontWeight: 400,
          color: 'hsl(30 20% 15%)',
          marginBottom: '0.5rem',
        }}>
          {room.roomType}
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'hsl(30 15% 45%)',
          lineHeight: 1.6,
        }}>
          {room.description}
        </p>
      </div>

      {/* Room Features */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bed style={{ width: '1rem', height: '1rem', color: 'hsl(30 15% 45%)' }} />
          <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>{room.bedType}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users style={{ width: '1rem', height: '1rem', color: 'hsl(30 15% 45%)' }} />
          <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>Max {room.maxOccupancy} guests</span>
        </div>
      </div>

      {/* Policies */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.375rem 0.75rem',
          background: 'hsl(160 45% 40% / 0.1)',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          color: 'hsl(160 45% 35%)',
        }}>
          <Shield style={{ width: '0.875rem', height: '0.875rem' }} />
          {room.guarantee}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          padding: '0.375rem 0.75rem',
          background: room.cancellation.toLowerCase().includes('free') 
            ? 'hsl(160 45% 40% / 0.1)' 
            : 'hsl(30 20% 92% / 0.5)',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          color: room.cancellation.toLowerCase().includes('free') 
            ? 'hsl(160 45% 35%)'
            : 'hsl(30 15% 45%)',
        }}>
          <X style={{ width: '0.875rem', height: '0.875rem' }} />
          {room.cancellation}
        </div>
      </div>

      {/* Pricing and CTA */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: '1rem',
        borderTop: '1px solid hsl(30 15% 88% / 0.3)',
        marginTop: 'auto',
      }}>
        <div>
          <span style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 200,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            color: 'hsl(30 15% 45%)',
            display: 'block',
            marginBottom: '0.25rem',
          }}>
            {room.rateCount} rate{room.rateCount !== 1 ? 's' : ''} available
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.5rem',
              color: 'hsl(30 20% 15%)',
            }}>
              {formatPrice(room.amountAfterTax, room.currencyCode)}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'hsl(30 15% 45%)' }}>/ night</span>
          </div>
          {room.amountBeforeTax !== room.amountAfterTax && (
            <span style={{ fontSize: '0.75rem', color: 'hsl(30 15% 55%)' }}>
              {formatPrice(room.amountBeforeTax, room.currencyCode)} before tax
            </span>
          )}
        </div>

        <button
          style={{
            padding: '0.75rem 1.5rem',
            background: 'hsl(15 55% 70%)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'hsl(30 25% 98%)',
            fontSize: '0.875rem',
            fontWeight: 400,
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'hsl(15 55% 65%)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'hsl(15 55% 70%)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Select Room
        </button>
      </div>
    </div>
  );
};
