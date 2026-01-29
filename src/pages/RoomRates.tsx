import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, Bed, Users, Check, Award, Filter, 
  ChevronDown, ChevronUp, SortAsc, X, Sparkles,
  Gift, Clock, Coffee, CreditCard, Loader2
} from 'lucide-react';
import type { RoomType, RoomRate } from '@/types/hotel';

// Sample rates data - in real app, this would come from API
const generateSampleRates = (roomType: string): RoomRate[] => {
  const providers = [
    { name: 'Virtuoso Properties', hasPartnerBenefits: true },
    { name: 'Rosewood Escapes', hasPartnerBenefits: true },
    { name: 'Fine Hotels & Resorts', hasPartnerBenefits: true },
    { name: 'Preferred Hotels', hasPartnerBenefits: true },
    { name: 'Flexible Rate', hasPartnerBenefits: false },
    { name: 'Best Available Rate', hasPartnerBenefits: false },
    { name: 'Advance Purchase', hasPartnerBenefits: false },
    { name: 'Member Rate', hasPartnerBenefits: false },
    { name: 'AAA/CAA Rate', hasPartnerBenefits: false },
    { name: 'Senior Rate', hasPartnerBenefits: false },
    { name: 'Government Rate', hasPartnerBenefits: false },
    { name: 'Corporate Rate', hasPartnerBenefits: false },
    { name: 'Package Deal', hasPartnerBenefits: false },
    { name: 'Last Minute', hasPartnerBenefits: false },
    { name: 'Weekend Special', hasPartnerBenefits: false },
    { name: 'Extended Stay', hasPartnerBenefits: false },
  ];

  const partnerBenefits = ['Room Upgrade', 'Early Check-In', 'Late Check-Out', 'Breakfast Included', '$100 Credit', 'Welcome Amenity'];
  const amenities = ['Internet access', 'Marble bathroom', 'Shower', 'Mini bar', 'City view', 'Rain shower', 'Soaking tub'];

  return providers.slice(0, 13).map((provider, idx) => {
    const basePrice = 900 + Math.floor(Math.random() * 800);
    const taxRate = 0.14 + Math.random() * 0.05;
    
    return {
      rateId: `rate-${roomType}-${idx}`,
      rateName: provider.name,
      rateProvider: provider.hasPartnerBenefits ? provider.name : undefined,
      isRefundable: Math.random() > 0.3,
      hasFreeCancellation: Math.random() > 0.4,
      cancellationPolicy: Math.random() > 0.5 ? 'Free cancellation until 24 hours before check-in' : 'Non-refundable',
      amountBeforeTax: basePrice,
      amountAfterTax: Math.round(basePrice * (1 + taxRate)),
      taxAmount: Math.round(basePrice * taxRate),
      currencyCode: 'USD',
      partnerBenefits: provider.hasPartnerBenefits 
        ? partnerBenefits.slice(0, 3 + Math.floor(Math.random() * 4))
        : undefined,
      roomAmenities: amenities.slice(0, 2 + Math.floor(Math.random() * 3)),
      roomDetails: `${roomType.toUpperCase()} - ${300 + Math.floor(Math.random() * 200)} SQ. FT. FLOORS 3-18. MODERN ART DECO STYLE. NATURAL LIGHT. MADISON AVENUE VIEWS. MARBLE BATHROOM WITH RAIN SHOWER. LUXURIOUS ACCOMMODATIONS.`,
    };
  });
};

const SAMPLE_ROOM: RoomType = {
  roomType: 'Standard Room',
  description: 'Elegant room featuring traditional Japanese design elements, floor-to-ceiling windows, and stunning city views.',
  currencyCode: 'USD',
  rateCount: 13,
  amountBeforeTax: 950,
  amountAfterTax: 1045,
  bedType: 'King Bed',
  maxOccupancy: 2,
  guarantee: 'Deposit Required',
  cancellation: 'Free Cancellation',
};

const benefitIcons: Record<string, React.ElementType> = {
  'Room Upgrade': Sparkles,
  'Early Check-In': Clock,
  'Late Check-Out': Clock,
  'Breakfast Included': Coffee,
  '$100 Credit': CreditCard,
  'Welcome Amenity': Gift,
};

type SortOption = 'price-low' | 'price-high' | 'partner-first';
type FilterOption = 'all' | 'refundable' | 'partner-benefits' | 'free-cancellation';

const RoomRates: React.FC = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [isLoading, setIsLoading] = useState(true);
  const [rates, setRates] = useState<RoomRate[]>([]);
  const [expandedRateId, setExpandedRateId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('price-low');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);

  const room = SAMPLE_ROOM; // In real app, fetch based on roomId

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setRates(generateSampleRates(room.roomType));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [room.roomType]);

  const filteredAndSortedRates = useMemo(() => {
    let result = [...rates];

    // Apply filter
    switch (filterBy) {
      case 'refundable':
        result = result.filter(r => r.isRefundable);
        break;
      case 'partner-benefits':
        result = result.filter(r => r.partnerBenefits && r.partnerBenefits.length > 0);
        break;
      case 'free-cancellation':
        result = result.filter(r => r.hasFreeCancellation);
        break;
    }

    // Apply sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.amountAfterTax - b.amountAfterTax);
        break;
      case 'price-high':
        result.sort((a, b) => b.amountAfterTax - a.amountAfterTax);
        break;
      case 'partner-first':
        result.sort((a, b) => {
          const aHas = a.partnerBenefits?.length || 0;
          const bHas = b.partnerBenefits?.length || 0;
          if (bHas !== aHas) return bHas - aHas;
          return a.amountAfterTax - b.amountAfterTax;
        });
        break;
    }

    return result;
  }, [rates, filterBy, sortBy]);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSelectRate = (rate: RoomRate) => {
    console.log('Selected rate:', rate);
    navigate(`/booking?hotelId=${hotelId}&roomId=${roomId}&rateId=${rate.rateId}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'hsl(30 25% 98%)',
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'hsl(30 25% 98% / 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid hsl(30 15% 90%)',
      }}>
        <div style={{
          maxWidth: '64rem',
          margin: '0 auto',
          padding: '1rem 1.5rem',
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0',
              background: 'transparent',
              border: 'none',
              color: 'hsl(30 15% 35%)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
            Back to hotel
          </button>

          {/* Room Info */}
          <div style={{ marginBottom: '1rem' }}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.75rem',
              fontWeight: 400,
              color: 'hsl(30 20% 15%)',
              marginBottom: '0.5rem',
            }}>
              {room.roomType}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Bed style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(30 15% 50%)' }} />
                <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>{room.bedType}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Users style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(30 15% 50%)' }} />
                <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>Max {room.maxOccupancy} guests</span>
              </div>
            </div>
          </div>

          {/* Filters & Sort Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            {/* Filter Toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(['all', 'refundable', 'partner-benefits', 'free-cancellation'] as FilterOption[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterBy(filter)}
                  style={{
                    padding: '0.5rem 0.875rem',
                    background: filterBy === filter ? 'hsl(42 45% 55%)' : 'hsl(30 25% 98%)',
                    border: `1px solid ${filterBy === filter ? 'hsl(42 45% 55%)' : 'hsl(30 15% 85%)'}`,
                    borderRadius: '9999px',
                    color: filterBy === filter ? 'hsl(30 25% 98%)' : 'hsl(30 15% 40%)',
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {filter === 'all' && 'All Rates'}
                  {filter === 'refundable' && 'Refundable'}
                  {filter === 'partner-benefits' && 'Partner Benefits'}
                  {filter === 'free-cancellation' && 'Free Cancellation'}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.875rem',
                  background: 'hsl(30 25% 98%)',
                  border: '1px solid hsl(30 15% 85%)',
                  borderRadius: '0.5rem',
                  color: 'hsl(30 15% 35%)',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                }}
              >
                <SortAsc style={{ width: '0.875rem', height: '0.875rem' }} />
                Sort by
                <ChevronDown style={{ width: '0.75rem', height: '0.75rem' }} />
              </button>

              {showFilters && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '0.25rem',
                  background: 'hsl(30 25% 98%)',
                  border: '1px solid hsl(30 15% 88%)',
                  borderRadius: '0.5rem',
                  boxShadow: '0 8px 24px hsl(30 15% 15% / 0.1)',
                  overflow: 'hidden',
                  minWidth: '160px',
                  zIndex: 10,
                }}>
                  {([
                    { value: 'price-low', label: 'Price: Low to High' },
                    { value: 'price-high', label: 'Price: High to Low' },
                    { value: 'partner-first', label: 'Partner Benefits First' },
                  ] as { value: SortOption; label: string }[]).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowFilters(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        background: sortBy === option.value ? 'hsl(42 40% 95%)' : 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        color: 'hsl(30 15% 25%)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '64rem',
        margin: '0 auto',
        padding: '1.5rem',
      }}>
        {/* Results Count */}
        <div style={{
          marginBottom: '1rem',
          fontSize: '0.875rem',
          color: 'hsl(30 15% 50%)',
        }}>
          {isLoading ? 'Loading rates...' : `${filteredAndSortedRates.length} rates available`}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4rem',
          }}>
            <Loader2 style={{ 
              width: '2rem', 
              height: '2rem', 
              color: 'hsl(42 45% 55%)',
              animation: 'spin 1s linear infinite',
            }} />
          </div>
        )}

        {/* Rate Cards List */}
        {!isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredAndSortedRates.map((rate, idx) => {
              const isExpanded = expandedRateId === rate.rateId;
              const taxAmount = rate.taxAmount ?? (rate.amountAfterTax - rate.amountBeforeTax);

              return (
                <div
                  key={rate.rateId}
                  style={{
                    background: 'hsl(30 25% 98%)',
                    border: `1px solid ${rate.partnerBenefits ? 'hsl(42 40% 80%)' : 'hsl(30 15% 88%)'}`,
                    borderRadius: '0.75rem',
                    overflow: 'hidden',
                    transition: 'all 200ms ease',
                    animation: 'fadeRise 0.4s ease-out forwards',
                    animationDelay: `${idx * 30}ms`,
                    opacity: 0,
                  }}
                >
                  {/* Partner Badge Bar */}
                  {rate.partnerBenefits && rate.partnerBenefits.length > 0 && (
                    <div style={{
                      background: 'linear-gradient(135deg, hsl(42 35% 94%), hsl(42 40% 92%))',
                      padding: '0.5rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderBottom: '1px solid hsl(42 40% 88%)',
                    }}>
                      <Award style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(42 60% 45%)' }} />
                      <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: 'hsl(42 50% 35%)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>
                        Partner Benefits Included
                      </span>
                    </div>
                  )}

                  {/* Main Rate Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: '1.5rem',
                    alignItems: 'center',
                    padding: '1.25rem',
                  }}>
                    {/* Left: Rate Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 500,
                        fontSize: '1rem',
                        color: 'hsl(30 20% 20%)',
                      }}>
                        {rate.rateProvider || rate.rateName}
                      </span>

                      {/* Badges */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', alignItems: 'center' }}>
                        {rate.isRefundable && (
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
                        {rate.hasFreeCancellation && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.8125rem',
                            color: 'hsl(160 50% 35%)',
                          }}>
                            <Check style={{ width: '0.75rem', height: '0.75rem' }} />
                            Free cancellation
                          </span>
                        )}
                      </div>

                      {/* Expand Toggle */}
                      <button
                        onClick={() => setExpandedRateId(isExpanded ? null : rate.rateId)}
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
                          width: 'fit-content',
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
                        fontSize: '1.625rem',
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
                      onClick={() => handleSelectRate(rate)}
                      style={{
                        padding: '0.75rem 1.75rem',
                        background: 'hsl(42 45% 55%)',
                        border: 'none',
                        borderRadius: '0.5rem',
                        color: 'hsl(30 25% 98%)',
                        fontSize: '0.9375rem',
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
                                    padding: '0.5rem 0.875rem',
                                    background: 'hsl(30 25% 98%)',
                                    border: '1px solid hsl(30 15% 88%)',
                                    borderRadius: '9999px',
                                    fontSize: '0.8125rem',
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
                                  fontSize: '0.8125rem',
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

                      {/* Two-column layout for breakdown and policy */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1rem',
                      }}>
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
                        <div>
                          <span style={{
                            display: 'block',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                            color: 'hsl(30 15% 35%)',
                            marginBottom: '0.625rem',
                          }}>
                            Cancellation Policy
                          </span>
                          <div style={{
                            padding: '1rem',
                            background: rate.isRefundable ? 'hsl(160 40% 97%)' : 'hsl(30 25% 98%)',
                            border: `1px solid ${rate.isRefundable ? 'hsl(160 40% 88%)' : 'hsl(30 15% 90%)'}`,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            color: rate.isRefundable ? 'hsl(160 45% 30%)' : 'hsl(30 15% 40%)',
                          }}>
                            {rate.cancellationPolicy || (rate.isRefundable ? 'Refundable rate' : 'Non-refundable rate')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAndSortedRates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'hsl(30 15% 45%)',
          }}>
            <p style={{ marginBottom: '1rem' }}>No rates match your current filters.</p>
            <button
              onClick={() => setFilterBy('all')}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'hsl(42 45% 55%)',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'hsl(30 25% 98%)',
                cursor: 'pointer',
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <div style={{ 
        position: 'fixed',
        bottom: '1.5rem', 
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 40,
      }}>
        <span style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 200,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          color: 'hsl(30 15% 45% / 0.4)',
        }}>
          Voyage AI
        </span>
      </div>
    </div>
  );
};

export default RoomRates;
