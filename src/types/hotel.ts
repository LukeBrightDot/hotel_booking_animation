// Hotel data types based on API response structure

export interface HotelAddress {
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface HotelAmenity {
  code: string;
  description: string;
}

// Individual rate within a room type
export interface RoomRate {
  rateId: string;
  rateName: string;
  rateProvider?: string; // e.g., "Virtuoso Properties", "Rosewood Escapes"
  isRefundable: boolean;
  hasFreeCancellation: boolean;
  cancellationPolicy?: string;
  amountBeforeTax: number;
  amountAfterTax: number;
  taxAmount?: number;
  currencyCode: string;
  partnerBenefits?: string[]; // e.g., ["Room Upgrade", "Early Check-In", "Breakfast Included"]
  roomAmenities?: string[]; // e.g., ["Marble bathroom", "Shower", "Internet access"]
  roomDetails?: string; // Long description text
}

export interface RoomType {
  roomType: string;
  description: string;
  currencyCode: string;
  rateCount: number;
  amountBeforeTax: number;
  amountAfterTax: number;
  bedType: string;
  maxOccupancy: number;
  guarantee: string;
  cancellation: string;
  rates?: RoomRate[]; // Multiple rates per room type
  isLuxuryPartner?: boolean; // e.g., Virtuoso Properties
  luxuryPartnerName?: string;
}

export interface Hotel {
  // Basic Info
  hotelName: string;
  chainName?: string;
  starRating: number;
  description: string;
  
  // Location
  address: HotelAddress;
  distance?: number; // from search point in miles
  
  // Images
  thumbnail?: string;
  images?: string[];
  
  // Amenities
  amenities: HotelAmenity[];
  
  // Room Types
  roomTypes: RoomType[];
  
  // Luxury Info
  luxuryPrograms?: string[];
  isLuxury?: boolean;
}
