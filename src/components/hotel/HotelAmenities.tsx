import React from 'react';
import { 
  Wifi, Car, Waves, Dumbbell, Utensils, Coffee, 
  Sparkles, Plane, Shield, Heart, Wind, Tv,
  Bath, PawPrint, Baby, Briefcase
} from 'lucide-react';
import type { HotelAmenity } from '@/types/hotel';

interface HotelAmenitiesProps {
  amenities: HotelAmenity[];
}

// Map common amenity codes to icons
const getAmenityIcon = (code: string, description: string) => {
  const lowerDesc = description.toLowerCase();
  const lowerCode = code.toLowerCase();
  
  if (lowerDesc.includes('wifi') || lowerDesc.includes('internet')) return Wifi;
  if (lowerDesc.includes('parking') || lowerDesc.includes('valet')) return Car;
  if (lowerDesc.includes('pool') || lowerDesc.includes('swim')) return Waves;
  if (lowerDesc.includes('gym') || lowerDesc.includes('fitness')) return Dumbbell;
  if (lowerDesc.includes('restaurant') || lowerDesc.includes('dining')) return Utensils;
  if (lowerDesc.includes('breakfast') || lowerDesc.includes('coffee')) return Coffee;
  if (lowerDesc.includes('spa') || lowerDesc.includes('wellness')) return Sparkles;
  if (lowerDesc.includes('airport') || lowerDesc.includes('shuttle')) return Plane;
  if (lowerDesc.includes('safe') || lowerDesc.includes('security')) return Shield;
  if (lowerDesc.includes('concierge') || lowerDesc.includes('service')) return Heart;
  if (lowerDesc.includes('air') || lowerDesc.includes('conditioning')) return Wind;
  if (lowerDesc.includes('tv') || lowerDesc.includes('entertainment')) return Tv;
  if (lowerDesc.includes('bath') || lowerDesc.includes('jacuzzi')) return Bath;
  if (lowerDesc.includes('pet')) return PawPrint;
  if (lowerDesc.includes('child') || lowerDesc.includes('family')) return Baby;
  if (lowerDesc.includes('business') || lowerDesc.includes('meeting')) return Briefcase;
  
  return Sparkles; // Default icon
};

export const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities }) => {
  const displayAmenities = amenities.slice(0, 12); // Show max 12 amenities
  const hasMore = amenities.length > 12;

  return (
    <div style={{ 
      background: 'hsl(30 20% 96% / 0.5)',
      backdropFilter: 'blur(8px)',
      border: '1px solid hsl(30 15% 88% / 0.5)',
      borderRadius: '1rem',
      padding: '1.5rem',
    }}>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.25rem',
        fontWeight: 400,
        color: 'hsl(30 20% 15%)',
        marginBottom: '1.25rem',
      }}>
        Hotel Amenities
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {displayAmenities.map((amenity, idx) => {
          const Icon = getAmenityIcon(amenity.code, amenity.description);
          return (
            <div
              key={amenity.code || idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                background: 'hsl(30 25% 98% / 0.5)',
                borderRadius: '0.5rem',
                transition: 'all 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'hsl(30 25% 98%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'hsl(30 25% 98% / 0.5)';
              }}
            >
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '0.5rem',
                background: 'hsl(15 55% 70% / 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon style={{ width: '1.25rem', height: '1.25rem', color: 'hsl(15 55% 65%)' }} />
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'hsl(30 15% 25%)',
                lineHeight: 1.4,
              }}>
                {amenity.description}
              </span>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <button
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: '1px solid hsl(30 15% 88%)',
            borderRadius: '0.5rem',
            color: 'hsl(30 15% 45%)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'hsl(15 55% 70%)';
            e.currentTarget.style.color = 'hsl(15 55% 70%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
            e.currentTarget.style.color = 'hsl(30 15% 45%)';
          }}
        >
          +{amenities.length - 12} more amenities
        </button>
      )}
    </div>
  );
};
