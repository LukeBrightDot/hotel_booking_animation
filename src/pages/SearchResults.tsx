import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  SlidersHorizontal, 
  ChevronDown,
  X,
  Star,
  ArrowUpDown
} from 'lucide-react';
import { Header, BottomNav } from '@/components/layout';
import { AnimatedResortCard, HotelCardSkeleton, type Resort } from '@/components/voice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample resort results for demo
const SAMPLE_RESORTS: Resort[] = [
  {
    id: '1',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    description: 'A sanctuary of serenity in the heart of Tokyo, offering panoramic city views and traditional Japanese hospitality.',
    pricePerNight: '$1,800',
    rating: 4.9,
    amenities: ['Spa', 'Fine Dining', 'City Views'],
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
  },
  {
    id: '2',
    name: 'Soneva Fushi',
    location: 'Maldives',
    description: 'Barefoot luxury on a private island, where pristine beaches meet world-class sustainability.',
    pricePerNight: '$2,400',
    rating: 4.95,
    amenities: ['Private Beach', 'Overwater Villa', 'Observatory'],
    imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  },
  {
    id: '3',
    name: 'Amanpuri',
    location: 'Phuket, Thailand',
    description: 'The original Aman resort, set in a coconut grove overlooking the Andaman Sea.',
    pricePerNight: '$1,500',
    rating: 4.85,
    amenities: ['Private Pool', 'Holistic Spa', 'Yacht Charter'],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  },
  {
    id: '4',
    name: 'Four Seasons Bora Bora',
    location: 'Bora Bora, French Polynesia',
    description: 'Overwater bungalows with glass floor panels and breathtaking lagoon views.',
    pricePerNight: '$2,100',
    rating: 4.92,
    amenities: ['Overwater Villa', 'Snorkeling', 'Spa'],
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
  },
  {
    id: '5',
    name: 'The Ritz Paris',
    location: 'Paris, France',
    description: 'Legendary palace hotel on Place Vendôme, blending timeless elegance with modern luxury.',
    pricePerNight: '$1,650',
    rating: 4.88,
    amenities: ['Michelin Dining', 'Spa', 'Historic'],
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
  },
  {
    id: '6',
    name: 'Como Castello Del Nero',
    location: 'Tuscany, Italy',
    description: 'A restored 12th-century castle surrounded by olive groves and Chianti vineyards.',
    pricePerNight: '$1,200',
    rating: 4.82,
    amenities: ['Wine Tours', 'Spa', 'Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
];

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'rating';
type FilterOption = 'all' | 'spa' | 'beach' | 'city' | 'pool';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Search context from URL params
  const destination = searchParams.get('destination') || 'All Destinations';
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests') || '2';
  const rooms = searchParams.get('rooms') || '1';
  
  // State
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate progressive loading
  useEffect(() => {
    setIsLoading(true);
    setLoadedCount(0);
    setResorts([]);

    // Simulate batched API responses
    const batches = [
      { delay: 800, count: 2 },
      { delay: 2500, count: 2 },
      { delay: 4000, count: 2 },
    ];

    const timeouts: NodeJS.Timeout[] = [];

    batches.forEach((batch, batchIndex) => {
      const timeout = setTimeout(() => {
        const startIdx = batches.slice(0, batchIndex).reduce((sum, b) => sum + b.count, 0);
        const newResorts = SAMPLE_RESORTS.slice(startIdx, startIdx + batch.count);
        setResorts(prev => [...prev, ...newResorts]);
        setLoadedCount(prev => prev + batch.count);
        
        if (batchIndex === batches.length - 1) {
          setIsLoading(false);
        }
      }, batch.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [destination, checkIn, checkOut]);

  // Filter and sort resorts
  const filteredResorts = resorts
    .filter(resort => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return resort.name.toLowerCase().includes(query) || 
               resort.location.toLowerCase().includes(query);
      }
      return true;
    })
    .filter(resort => {
      if (filterBy === 'all') return true;
      return resort.amenities.some(a => a.toLowerCase().includes(filterBy));
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return parseInt(a.pricePerNight.replace(/\D/g, '')) - parseInt(b.pricePerNight.replace(/\D/g, ''));
        case 'price-high':
          return parseInt(b.pricePerNight.replace(/\D/g, '')) - parseInt(a.pricePerNight.replace(/\D/g, ''));
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleNewSearch = () => {
    navigate('/');
  };

  const formatDateDisplay = (dateStr: string | null) => {
    if (!dateStr) return 'Flexible';
    try {
      return format(new Date(dateStr), 'MMM dd');
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'hsl(30 25% 98%)',
      paddingTop: '4.5rem',
      paddingBottom: '6rem',
    }}>
      <Header />
      <BottomNav searchMode="form" onModeChange={() => {}} />

      {/* Search Context Bar */}
      <div style={{
        position: 'sticky',
        top: '4rem',
        zIndex: 40,
        background: 'hsl(30 25% 98% / 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid hsl(30 15% 88% / 0.5)',
        padding: '1rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
        }}>
          {/* Search Summary - Clickable to edit */}
          <div 
            onClick={handleNewSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.875rem 1.25rem',
              background: 'hsl(30 20% 96%)',
              border: '1px solid hsl(30 15% 88%)',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 300ms',
              flexWrap: 'wrap',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'hsl(var(--gold))';
              e.currentTarget.style.boxShadow = '0 2px 12px hsl(var(--gold) / 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'hsl(30 15% 88%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Destination */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin style={{ width: '1rem', height: '1rem', color: 'hsl(var(--gold))' }} />
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                fontWeight: 400,
                color: 'hsl(30 20% 15%)',
              }}>
                {destination}
              </span>
            </div>

            <div style={{ width: '1px', height: '1.5rem', background: 'hsl(30 15% 85%)' }} />

            {/* Dates */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar style={{ width: '1rem', height: '1rem', color: 'hsl(var(--gold))' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'hsl(30 20% 25%)',
              }}>
                {formatDateDisplay(checkIn)} — {formatDateDisplay(checkOut)}
              </span>
            </div>

            <div style={{ width: '1px', height: '1.5rem', background: 'hsl(30 15% 85%)' }} />

            {/* Guests */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users style={{ width: '1rem', height: '1rem', color: 'hsl(var(--gold))' }} />
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'hsl(30 20% 25%)',
              }}>
                {guests} guests, {rooms} room{parseInt(rooms) > 1 ? 's' : ''}
              </span>
            </div>

            {/* Edit indicator */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 300,
                letterSpacing: '0.05em',
                color: 'hsl(var(--gold))',
              }}>
                Edit Search
              </span>
              <Search style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(var(--gold))' }} />
            </div>
          </div>

          {/* Filters & Search Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
            flexWrap: 'wrap',
          }}>
            {/* Quick search within results */}
            <div style={{
              flex: '1 1 300px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              background: 'hsl(30 20% 96%)',
              border: '1px solid hsl(30 15% 88%)',
              borderRadius: '10px',
              transition: 'all 300ms',
            }}>
              <Search style={{ width: '1rem', height: '1rem', color: 'hsl(30 15% 55%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search within results..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  color: 'hsl(30 20% 15%)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem',
                  }}
                >
                  <X style={{ width: '0.875rem', height: '0.875rem', color: 'hsl(30 15% 55%)' }} />
                </button>
              )}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger style={{
                width: 'auto',
                minWidth: '160px',
                background: 'hsl(30 20% 96%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
              }}>
                <ArrowUpDown style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.5rem', color: 'hsl(var(--gold))' }} />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent style={{
                background: 'hsl(30 25% 98%)',
                border: '1px solid hsl(30 15% 88%)',
                borderRadius: '10px',
              }}>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: showFilters ? 'hsl(var(--gold) / 0.15)' : 'hsl(30 20% 96%)',
                border: `1px solid ${showFilters ? 'hsl(var(--gold) / 0.5)' : 'hsl(30 15% 88%)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 300ms',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 400,
                color: showFilters ? 'hsl(var(--gold))' : 'hsl(30 20% 25%)',
              }}
            >
              <SlidersHorizontal style={{ width: '0.875rem', height: '0.875rem' }} />
              Filters
            </button>
          </div>

          {/* Filter Pills */}
          {showFilters && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '1rem',
              flexWrap: 'wrap',
              animation: 'fadeIn 300ms ease-out',
            }}>
              {[
                { value: 'all', label: 'All' },
                { value: 'spa', label: 'Spa' },
                { value: 'beach', label: 'Beach' },
                { value: 'city', label: 'City' },
                { value: 'pool', label: 'Pool' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterBy(filter.value as FilterOption)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: filterBy === filter.value ? 'hsl(var(--gold))' : 'hsl(30 20% 96%)',
                    border: `1px solid ${filterBy === filter.value ? 'hsl(var(--gold))' : 'hsl(30 15% 88%)'}`,
                    borderRadius: '9999px',
                    cursor: 'pointer',
                    transition: 'all 300ms',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    color: filterBy === filter.value ? 'white' : 'hsl(30 20% 25%)',
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '1.5rem 1.5rem 0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 300,
              color: 'hsl(30 20% 15%)',
            }}>
              {isLoading ? 'Finding hotels...' : `${filteredResorts.length} properties found`}
            </span>
            {isLoading && loadedCount > 0 && (
              <span style={{
                marginLeft: '0.75rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'hsl(var(--gold))',
              }}>
                ({loadedCount} loaded)
              </span>
            )}
          </div>
        </div>

        {/* Results Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {/* Loaded cards */}
          {filteredResorts.map((resort, index) => (
            <AnimatedResortCard 
              key={resort.id}
              resort={resort}
              index={index}
              isNewlyLoaded={true}
            />
          ))}

          {/* Loading skeletons */}
          {isLoading && (
            <>
              {Array.from({ length: 6 - loadedCount }).map((_, i) => (
                <HotelCardSkeleton key={`skeleton-${i}`} />
              ))}
            </>
          )}
        </div>

        {/* Empty state */}
        {!isLoading && filteredResorts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'hsl(30 20% 94%)',
              borderRadius: '50%',
            }}>
              <Search style={{ width: '1.5rem', height: '1.5rem', color: 'hsl(30 15% 55%)' }} />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontWeight: 300,
              color: 'hsl(30 20% 25%)',
              marginBottom: '0.5rem',
            }}>
              No matching properties
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              fontWeight: 300,
              color: 'hsl(30 15% 50%)',
            }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
