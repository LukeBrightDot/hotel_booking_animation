import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Award, Share2, Heart, Crown } from 'lucide-react';
import { HotelImageGallery, ExpandableRoomCard, HotelAmenities } from '@/components/hotel';
import type { Hotel, RoomRate } from '@/types/hotel';

// Sample rates data for demonstration
const SAMPLE_RATES: Record<string, RoomRate[]> = {
  'Deluxe Room': [
    {
      rateId: 'virtuoso-1',
      rateName: 'Virtuoso Properties',
      rateProvider: 'Virtuoso Properties',
      isRefundable: true,
      hasFreeCancellation: true,
      cancellationPolicy: 'Free cancellation until 24 hours before check-in',
      amountBeforeTax: 1173,
      amountAfterTax: 1350,
      currencyCode: 'USD',
      partnerBenefits: ['Room Upgrade', 'Early Check-In', 'Late Check-Out', 'Breakfast Included', '$100 Credit', 'Welcome Amenity'],
      roomAmenities: ['Internet access', 'Mini bar', 'City view'],
      roomDetails: 'SUPERIOR KING BED. COURTYARD VIEW 360 SQFT FLRS 4 TO 12. LUXURIOUS ACCOMMODATIONS. EARLY CHECK-IN AND LATE CHECK-OUT BASED UPON ON AVAILABILITY. ONE CATEGORY UPGRADE, BASED ON AVAILABILITY AT TIME OF CHECK-IN.',
    },
    {
      rateId: 'rosewood-1',
      rateName: 'Rosewood Escapes',
      rateProvider: 'Rosewood Escapes',
      isRefundable: true,
      hasFreeCancellation: true,
      cancellationPolicy: 'Free cancellation until 48 hours before check-in',
      amountBeforeTax: 1290,
      amountAfterTax: 1467,
      currencyCode: 'USD',
      partnerBenefits: ['Breakfast Included', 'Late Check-Out'],
      roomAmenities: ['Internet access', 'Marble bathroom', 'Shower'],
      roomDetails: 'MADISON KING 375 SQ. FT. FLOORS 3-18 MODERN ART DECO STYLE. NATURAL LIGHT. MADISON AVENUE VIEWS. MARBLE BATHROOM WITH RAIN SHOWER.',
    },
    {
      rateId: 'flexible-1',
      rateName: 'Flexible Rate',
      isRefundable: true,
      hasFreeCancellation: true,
      amountBeforeTax: 1525,
      amountAfterTax: 1725,
      currencyCode: 'USD',
      roomAmenities: ['Internet access'],
    },
  ],
  'Premier Room': [
    {
      rateId: 'virtuoso-2',
      rateName: 'Virtuoso Properties',
      rateProvider: 'Virtuoso Properties',
      isRefundable: true,
      hasFreeCancellation: true,
      amountBeforeTax: 1400,
      amountAfterTax: 1590,
      currencyCode: 'USD',
      partnerBenefits: ['Room Upgrade', 'Early Check-In', 'Breakfast Included'],
      roomAmenities: ['Panoramic views', 'Separate living area', 'Premium mini bar'],
    },
    {
      rateId: 'flexible-2',
      rateName: 'Best Available Rate',
      isRefundable: false,
      hasFreeCancellation: false,
      amountBeforeTax: 1200,
      amountAfterTax: 1380,
      currencyCode: 'USD',
    },
  ],
  'Aman Suite': [
    {
      rateId: 'virtuoso-3',
      rateName: 'Virtuoso Properties',
      rateProvider: 'Virtuoso Properties',
      isRefundable: true,
      hasFreeCancellation: true,
      amountBeforeTax: 2800,
      amountAfterTax: 3190,
      currencyCode: 'USD',
      partnerBenefits: ['Room Upgrade', 'Early Check-In', 'Late Check-Out', 'Breakfast Included', '$100 Credit', 'Welcome Amenity'],
      roomAmenities: ['Private furo bath', 'Butler service', 'Separate bedroom', 'Living room'],
      roomDetails: 'Luxurious 157 sqm suite featuring separate bedroom and living room, private furo bath, and dedicated butler service with panoramic city views.',
    },
  ],
};

// Sample hotel data for demonstration
const SAMPLE_HOTEL: Hotel = {
  hotelName: 'Aman Tokyo',
  chainName: 'Aman Resorts',
  starRating: 5,
  description: 'Occupying the top six floors of the Otemachi Tower in the heart of Tokyo\'s financial district, Aman Tokyo combines traditional Japanese aesthetics with contemporary design. The hotel offers stunning panoramic views of the Imperial Palace gardens and the city skyline, creating a sanctuary of serenity in one of the world\'s most vibrant cities.',
  address: {
    addressLine1: 'The Otemachi Tower, 1-5-6 Otemachi',
    city: 'Tokyo',
    state: 'Chiyoda-ku',
    postalCode: '100-0004',
    country: 'Japan',
  },
  distance: 2.4,
  thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  ],
  amenities: [
    { code: 'WIFI', description: 'Complimentary High-Speed WiFi' },
    { code: 'SPA', description: 'Aman Spa with Traditional Treatments' },
    { code: 'POOL', description: '30-Meter Indoor Pool' },
    { code: 'GYM', description: '24-Hour Fitness Center' },
    { code: 'REST', description: 'Fine Dining Restaurant' },
    { code: 'BAR', description: 'Lounge Bar with City Views' },
    { code: 'CONC', description: '24-Hour Concierge Service' },
    { code: 'VALET', description: 'Valet Parking' },
    { code: 'BUSI', description: 'Business Center' },
    { code: 'YOGA', description: 'Yoga Studio' },
    { code: 'SAFE', description: 'In-Room Safe' },
    { code: 'AC', description: 'Climate Control' },
  ],
  roomTypes: [
    {
      roomType: 'Deluxe Room',
      description: 'Elegant 71 sqm room featuring traditional Japanese design elements, floor-to-ceiling windows, and stunning city views.',
      currencyCode: 'USD',
      rateCount: 3,
      amountBeforeTax: 950,
      amountAfterTax: 1045,
      bedType: 'King Bed',
      maxOccupancy: 2,
      guarantee: 'Deposit Required',
      cancellation: 'Free Cancellation',
      isLuxuryPartner: true,
      luxuryPartnerName: 'Virtuoso Properties',
    },
    {
      roomType: 'Premier Room',
      description: 'Spacious 80 sqm room with enhanced amenities, separate living area, and panoramic views of the Imperial Palace.',
      currencyCode: 'USD',
      rateCount: 2,
      amountBeforeTax: 1200,
      amountAfterTax: 1320,
      bedType: 'King Bed',
      maxOccupancy: 3,
      guarantee: 'Deposit Required',
      cancellation: 'Free Cancellation',
    },
    {
      roomType: 'Aman Suite',
      description: 'Luxurious 157 sqm suite featuring separate bedroom and living room, private furo bath, and dedicated butler service.',
      currencyCode: 'USD',
      rateCount: 1,
      amountBeforeTax: 2800,
      amountAfterTax: 3080,
      bedType: 'King Bed',
      maxOccupancy: 4,
      guarantee: 'Full Prepayment',
      cancellation: '48-Hour Cancellation',
    },
  ],
  luxuryPrograms: ['Aman Junkies', 'Virtuoso', 'Fine Hotels & Resorts'],
  isLuxury: true,
};

const HotelDetail: React.FC = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  
  // In a real app, fetch hotel data based on hotelId
  const hotel = SAMPLE_HOTEL;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        style={{ 
          width: '1rem', 
          height: '1rem',
          fill: i < rating ? 'hsl(42 65% 50%)' : 'transparent',
          color: i < rating ? 'hsl(42 65% 50%)' : 'hsl(30 15% 80%)',
        }}
      />
    ));
  };

  const formatAddress = () => {
    const { addressLine1, city, state, postalCode, country } = hotel.address;
    return `${addressLine1}, ${city}, ${state} ${postalCode}, ${country}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'hsl(30 25% 98%)',
    }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        background: 'hsl(30 25% 98% / 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: 'none',
            borderRadius: '0.5rem',
            color: 'hsl(30 15% 25%)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'hsl(30 20% 92%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <ArrowLeft style={{ width: '1rem', height: '1rem' }} />
          Back to results
        </button>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'hsl(30 15% 45%)',
              cursor: 'pointer',
            }}
          >
            <Share2 style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <button
            style={{
              padding: '0.5rem',
              background: 'transparent',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'hsl(30 15% 45%)',
              cursor: 'pointer',
            }}
          >
            <Heart style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '4.5rem', paddingBottom: '4rem' }}>
        {/* Image Gallery */}
        <section style={{ padding: '0 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
          <HotelImageGallery images={hotel.images || []} hotelName={hotel.hotelName} />
        </section>

        {/* Hotel Info Section */}
        <section style={{ 
          padding: '2rem 1.5rem',
          maxWidth: '80rem',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 360px',
          gap: '2rem',
        }}>
          {/* Left Column - Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header Info */}
            <div>
              {/* Chain Name & Luxury Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                {hotel.chainName && (
                  <span style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontWeight: 200,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    color: 'hsl(30 15% 45%)',
                  }}>
                    {hotel.chainName}
                  </span>
                )}
                {hotel.isLuxury && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.25rem 0.625rem',
                    background: 'linear-gradient(135deg, hsl(42 65% 50%), hsl(35 50% 55%))',
                    borderRadius: '9999px',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'hsl(30 25% 98%)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    <Crown style={{ width: '0.75rem', height: '0.75rem' }} />
                    Luxury
                  </span>
                )}
              </div>

              {/* Hotel Name */}
              <h1 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '2.5rem',
                fontWeight: 300,
                color: 'hsl(30 20% 15%)',
                marginBottom: '0.75rem',
              }}>
                {hotel.hotelName}
              </h1>

              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.125rem' }}>
                  {renderStars(hotel.starRating)}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}>
                  {hotel.starRating}-Star Hotel
                </span>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'hsl(30 15% 45%)' }}>
                <MapPin style={{ width: '1rem', height: '1rem', marginTop: '0.125rem', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{formatAddress()}</p>
                  {hotel.distance && (
                    <p style={{ fontSize: '0.75rem', color: 'hsl(30 15% 55%)' }}>
                      {hotel.distance} miles from search location
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{
              padding: '1.5rem',
              background: 'hsl(30 20% 96% / 0.5)',
              borderRadius: '1rem',
              border: '1px solid hsl(30 15% 88% / 0.5)',
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '1.25rem',
                fontWeight: 400,
                color: 'hsl(30 20% 15%)',
                marginBottom: '1rem',
              }}>
                About This Hotel
              </h2>
              <p style={{
                fontSize: '0.9375rem',
                color: 'hsl(30 15% 35%)',
                lineHeight: 1.8,
              }}>
                {hotel.description}
              </p>
            </div>

            {/* Luxury Programs */}
            {hotel.luxuryPrograms && hotel.luxuryPrograms.length > 0 && (
              <div style={{
                padding: '1.5rem',
                background: 'linear-gradient(135deg, hsl(42 30% 96%), hsl(30 20% 96%))',
                borderRadius: '1rem',
                border: '1px solid hsl(42 40% 85%)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Award style={{ width: '1.25rem', height: '1.25rem', color: 'hsl(42 65% 45%)' }} />
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: 'hsl(30 20% 15%)',
                  }}>
                    Luxury Programs
                  </h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {hotel.luxuryPrograms.map((program, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.375rem 0.875rem',
                        background: 'hsl(30 25% 98%)',
                        border: '1px solid hsl(42 40% 80%)',
                        borderRadius: '9999px',
                        fontSize: '0.8125rem',
                        color: 'hsl(30 20% 25%)',
                      }}
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            <HotelAmenities amenities={hotel.amenities} />
          </div>

          {/* Right Column - Booking Summary */}
          <div style={{ position: 'sticky', top: '5.5rem', alignSelf: 'start' }}>
            <div style={{
              background: 'hsl(30 20% 96% / 0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(30 15% 88%)',
              borderRadius: '1rem',
              padding: '1.5rem',
              boxShadow: '0 4px 20px hsl(30 15% 15% / 0.05)',
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'baseline', 
                justifyContent: 'space-between',
                marginBottom: '1.25rem',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid hsl(30 15% 88% / 0.5)',
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
                    Starting from
                  </span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '2rem',
                    color: 'hsl(30 20% 15%)',
                  }}>
                    ${Math.min(...hotel.roomTypes.map(r => r.amountAfterTax))}
                  </span>
                  <span style={{ fontSize: '0.875rem', color: 'hsl(30 15% 45%)' }}> / night</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  background: 'hsl(42 65% 50% / 0.1)',
                  borderRadius: '0.375rem',
                }}>
                  <Star style={{ width: '0.875rem', height: '0.875rem', fill: 'hsl(42 65% 50%)', color: 'hsl(42 65% 50%)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'hsl(42 50% 35%)' }}>
                    {hotel.starRating}.0
                  </span>
                </div>
              </div>

              <p style={{
                fontSize: '0.875rem',
                color: 'hsl(30 15% 45%)',
                marginBottom: '1.25rem',
                lineHeight: 1.5,
              }}>
                {hotel.roomTypes.length} room type{hotel.roomTypes.length !== 1 ? 's' : ''} available. 
                Select a room below to continue your booking.
              </p>

              <button
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'hsl(15 55% 70%)',
                  border: 'none',
                  borderRadius: '0.75rem',
                  color: 'hsl(30 25% 98%)',
                  fontSize: '1rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'hsl(15 55% 65%)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px hsl(15 55% 70% / 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'hsl(15 55% 70%)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Available Rooms
              </button>
            </div>
          </div>
        </section>

        {/* Room Types Section */}
        <section 
          id="rooms-section"
          style={{ 
            padding: '2rem 1.5rem 4rem',
            maxWidth: '80rem',
            margin: '0 auto',
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.75rem',
            fontWeight: 300,
            color: 'hsl(30 20% 15%)',
            marginBottom: '1.5rem',
          }}>
            Available Rooms & Rates
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '1.5rem',
          }}>
            {hotel.roomTypes.map((room, idx) => (
              <ExpandableRoomCard 
                key={idx} 
                room={room} 
                index={idx}
                hotelId={hotelId}
              />
            ))}
          </div>
        </section>
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

export default HotelDetail;
