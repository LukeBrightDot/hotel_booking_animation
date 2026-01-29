import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Sparkles, Gift, Clock, Coffee, CreditCard, Award } from 'lucide-react';
import type { RoomRate } from '@/types/hotel';

interface RateCardProps {
  rate: RoomRate;
  onSelect: (rate: RoomRate) => void;
  index?: number;
}

const benefitIcons: Record<string, React.ElementType> = {
  'Room Upgrade': Sparkles,
  'Early Check-In': Clock,
  'Late Check-Out': Clock,
  'Breakfast Included': Coffee,
  '$100 Credit': CreditCard,
  'Welcome Amenity': Gift,
};

export const RateCard: React.FC<RateCardProps> = ({ rate, onSelect, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const taxAmount = rate.taxAmount ?? (rate.amountAfterTax - rate.amountBeforeTax);

  return (
    <div
      style={{
        background: 'hsl(30 25% 98%)',
        border: '1px solid hsl(30 15% 88%)',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        transition: 'all 200ms ease',
        animation: 'fadeRise 0.4s ease-out forwards',
        animationDelay: `${index * 50}ms`,
        opacity: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'hsl(42 40% 70%)';
        e.currentTarget.style.boxShadow = '0 4px 16px hsl(30 15% 15% / 0.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Main Rate Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto auto',
        gap: '1rem',
        alignItems: 'center',
        padding: '1rem 1.25rem',
      }}>
        {/* Left: Rate Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Rate Provider/Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {rate.rateProvider && (
              <Award style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(42 65% 45%)' }} />
            )}
            <span style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 500,
              fontSize: '0.9375rem',
              color: 'hsl(30 20% 20%)',
              textTransform: rate.rateProvider ? 'none' : 'uppercase',
              letterSpacing: rate.rateProvider ? 'normal' : '0.05em',
            }}>
              {rate.rateProvider || rate.rateName}
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {rate.isRefundable && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                color: 'hsl(160 50% 35%)',
              }}>
                <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                Refundable
              </span>
            )}
            {rate.hasFreeCancellation && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                color: 'hsl(160 50% 35%)',
              }}>
                <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                Free cancellation
              </span>
            )}
          </div>

          {/* Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.8125rem',
              color: 'hsl(15 55% 55%)',
              cursor: 'pointer',
              marginTop: '0.25rem',
            }}
          >
            {isExpanded ? (
              <>
                <ChevronUp style={{ width: '0.875rem', height: '0.875rem' }} />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown style={{ width: '0.875rem', height: '0.875rem' }} />
                View details
              </>
            )}
          </button>
        </div>

        {/* Center: Price */}
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.5rem',
            fontWeight: 400,
            color: 'hsl(30 20% 15%)',
          }}>
            {formatPrice(rate.amountAfterTax, rate.currencyCode)}
          </div>
          <span style={{
            fontSize: '0.75rem',
            color: 'hsl(30 15% 50%)',
          }}>
            total <span style={{ fontStyle: 'italic' }}>(taxes incl.)</span>
          </span>
          <div style={{
            fontSize: '0.75rem',
            color: 'hsl(30 15% 55%)',
            marginTop: '0.125rem',
          }}>
            {formatPrice(rate.amountBeforeTax, rate.currencyCode)}/night
          </div>
        </div>

        {/* Right: Select Button */}
        <button
          onClick={() => onSelect(rate)}
          style={{
            padding: '0.625rem 1.5rem',
            background: 'hsl(42 45% 55%)',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'hsl(30 25% 98%)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 200ms',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'hsl(42 50% 48%)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'hsl(42 45% 55%)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Select
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid hsl(30 15% 90%)',
          padding: '1.25rem',
          background: 'hsl(30 20% 97%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}>
          {/* Partner Benefits */}
          {rate.partnerBenefits && rate.partnerBenefits.length > 0 && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.75rem',
              }}>
                <Sparkles style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(42 65% 45%)' }} />
                <span style={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: 'hsl(42 50% 40%)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Partner Benefits
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {rate.partnerBenefits.map((benefit, idx) => {
                  const Icon = benefitIcons[benefit] || Gift;
                  return (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem',
                        padding: '0.375rem 0.75rem',
                        background: 'hsl(30 25% 98%)',
                        border: '1px solid hsl(30 15% 88%)',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        color: 'hsl(30 20% 30%)',
                      }}
                    >
                      <Icon style={{ width: '0.75rem', height: '0.75rem', color: 'hsl(42 50% 45%)' }} />
                      {benefit}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Room Amenities */}
          {rate.roomAmenities && rate.roomAmenities.length > 0 && (
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'hsl(30 15% 35%)',
                marginBottom: '0.625rem',
              }}>
                Room Amenities
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {rate.roomAmenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.375rem 0.75rem',
                      background: 'hsl(30 25% 98%)',
                      border: '1px solid hsl(30 15% 88%)',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      color: 'hsl(30 15% 40%)',
                    }}
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Room Details */}
          {rate.roomDetails && (
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'hsl(30 15% 35%)',
                marginBottom: '0.625rem',
              }}>
                Room Details
              </span>
              <div style={{
                padding: '1rem',
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 90%)',
                borderRadius: '0.5rem',
                fontSize: '0.8125rem',
                color: 'hsl(30 15% 40%)',
                lineHeight: 1.6,
              }}>
                {rate.roomDetails}
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'hsl(30 15% 35%)',
              marginBottom: '0.625rem',
            }}>
              Price Breakdown
            </span>
            <div style={{
              padding: '1rem',
              background: 'hsl(30 25% 98%)',
              border: '1px solid hsl(30 15% 90%)',
              borderRadius: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: 'hsl(30 15% 40%)',
              }}>
                <span>Room rate (before tax)</span>
                <span>{formatPrice(rate.amountBeforeTax, rate.currencyCode)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.875rem',
                color: 'hsl(30 15% 40%)',
              }}>
                <span>Taxes & fees</span>
                <span>{formatPrice(taxAmount, rate.currencyCode)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.5rem',
                borderTop: '1px solid hsl(30 15% 88%)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                color: 'hsl(30 20% 20%)',
              }}>
                <span>Total</span>
                <span>{formatPrice(rate.amountAfterTax, rate.currencyCode)}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          {rate.cancellationPolicy && (
            <div style={{
              fontSize: '0.8125rem',
              color: 'hsl(30 15% 45%)',
              fontStyle: 'italic',
            }}>
              <strong style={{ fontStyle: 'normal', color: 'hsl(30 15% 35%)' }}>Cancellation: </strong>
              {rate.cancellationPolicy}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
