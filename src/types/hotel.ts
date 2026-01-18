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
