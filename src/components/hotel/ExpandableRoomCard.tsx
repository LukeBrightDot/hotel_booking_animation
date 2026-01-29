import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Check, ChevronRight, Award } from 'lucide-react';
import type { RoomType } from '@/types/hotel';

interface ExpandableRoomCardProps {
  room: RoomType;
  index?: number;
  hotelId?: string;
}

export const ExpandableRoomCard: React.FC<ExpandableRoomCardProps> = ({ 
  room, 
  index = 0,
  hotelId = '1',
}) => {
  const navigate = useNavigate();

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleViewAllRates = () => {
    const roomId = encodeURIComponent(room.roomType.toLowerCase().replace(/\s+/g, '-'));
    navigate(`/hotel/${hotelId}/room/${roomId}/rates`);
  };

  const handleBookNow = () => {
    // Book with best available rate - navigate to booking
    navigate(`/booking?hotelId=${hotelId}&room=${encodeURIComponent(room.roomType)}`);
  };

  return (
    <div
      style={{
        background: 'hsl(30 20% 96% / 0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid hsl(30 15% 88% / 0.5)',
        borderRadius: '1rem',
        overflow: 'hidden',
        transition: 'all 300ms ease',
        animation: 'fadeRise 0.6s ease-out forwards',
        animationDelay: `${index * 100}ms`,
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'hsl(30 20% 96% / 0.8)';
        e.currentTarget.style.borderColor = 'hsl(15 55% 70% / 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'hsl(30 20% 96% / 0.5)';
        e.currentTarget.style.borderColor = 'hsl(30 15% 88% / 0.5)';
      }}
    >
      {/* Room Header */}
      <div style={{ padding: '1.5rem' }}>
        {/* Room Type Header */}
        <div style={{ marginBottom: '0.75rem' }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.375rem',
            fontWeight: 400,
            color: 'hsl(30 20% 15%)',
            marginBottom: '0.5rem',
          }}>
            {room.roomType}
          </h3>

          {/* Bed Type & Badges Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <Bed style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(30 15% 50%)' }} />
              <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>{room.bedType}</span>
            </div>

            {/* Luxury Partner Badge */}
            {room.isLuxuryPartner && room.luxuryPartnerName && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.25rem 0.625rem',
                background: 'hsl(42 40% 92%)',
                border: '1px solid hsl(42 40% 80%)',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'hsl(42 50% 35%)',
              }}>
                <Award style={{ width: '0.75rem', height: '0.75rem' }} />
                {room.luxuryPartnerName}
              </span>
            )}

            {/* Refundable Badge */}
            {room.cancellation.toLowerCase().includes('free') && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.8125rem',
                color: 'hsl(160 50% 35%)',
              }}>
                <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                Refundable
              </span>
            )}
          </div>
        </div>

        {/* Rates Count */}
        <div style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          color: 'hsl(30 15% 50%)',
          marginBottom: '0.5rem',
        }}>
          {room.rateCount} rate{room.rateCount !== 1 ? 's' : ''} available
        </div>

        {/* Price Row */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.625rem',
                fontWeight: 400,
                color: 'hsl(30 20% 15%)',
              }}>
                {formatPrice(room.amountAfterTax, room.currencyCode)}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'hsl(30 15% 50%)' }}>
                total <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>(incl. taxes)</span>
              </span>
            </div>
            <span style={{ fontSize: '0.8125rem', color: 'hsl(30 15% 55%)' }}>
              {formatPrice(room.amountBeforeTax, room.currencyCode)}/night <span style={{ fontSize: '0.75rem' }}>(before tax)</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {/* Book Now - Primary CTA */}
          <button
            onClick={handleBookNow}
            style={{
              width: '100%',
              padding: '0.875rem',
              background: 'hsl(42 45% 55%)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'hsl(30 25% 98%)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'hsl(42 50% 48%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 16px hsl(42 45% 55% / 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'hsl(42 45% 55%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Book Now
          </button>

          {/* View All Rates - Secondary */}
          <button
            onClick={handleViewAllRates}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              border: '1px solid hsl(30 15% 85%)',
              borderRadius: '0.5rem',
              color: 'hsl(30 15% 40%)',
              fontSize: '0.875rem',
              fontWeight: 400,
              cursor: 'pointer',
              transition: 'all 200ms',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'hsl(30 15% 70%)';
              e.currentTarget.style.color = 'hsl(30 15% 30%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'hsl(30 15% 85%)';
              e.currentTarget.style.color = 'hsl(30 15% 40%)';
            }}
          >
            View All {room.rateCount} Rate{room.rateCount !== 1 ? 's' : ''}
            <ChevronRight style={{ width: '1rem', height: '1rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
};
