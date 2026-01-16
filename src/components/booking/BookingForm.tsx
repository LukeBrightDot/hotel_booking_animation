import React, { useState } from 'react';
import { Calendar, MapPin, Users, Home, Search, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface BookingFormProps {
  onSearch?: (data: BookingData) => void;
  className?: string;
}

export interface BookingData {
  destination: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  rooms: number;
  guests: number;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSearch, className = '' }) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);

  const handleSearch = () => {
    onSearch?.({
      destination,
      checkIn,
      checkOut,
      rooms,
      guests,
    });
  };

  const inputContainerStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(205, 188, 174, 0.15)',
    borderRadius: '16px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const inputContainerHoverStyle: React.CSSProperties = {
    ...inputContainerStyle,
    border: '1px solid rgba(205, 188, 174, 0.3)',
    background: 'rgba(255, 255, 255, 0.05)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'rgba(205, 188, 174, 0.7)',
    marginBottom: '4px',
  };

  const valueStyle: React.CSSProperties = {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: '15px',
    fontWeight: 400,
    color: '#F5F0EB',
  };

  const placeholderStyle: React.CSSProperties = {
    ...valueStyle,
    color: 'rgba(205, 188, 174, 0.5)',
  };

  const iconStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    color: 'rgba(212, 175, 55, 0.8)',
    flexShrink: 0,
  };

  return (
    <div className={className} style={{
      width: '100%',
      maxWidth: '900px',
    }}>
      {/* Main Form Card */}
      <div style={{
        background: 'rgba(45, 35, 28, 0.6)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        border: '1px solid rgba(205, 188, 174, 0.12)',
        borderRadius: '24px',
        padding: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
      }}>
        {/* Form Title */}
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '28px',
          fontWeight: 300,
          letterSpacing: '0.02em',
          color: '#F5F0EB',
          marginBottom: '28px',
          textAlign: 'center',
        }}>
          Find Your Perfect Stay
        </h2>

        {/* Form Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}>
          {/* Destination Input */}
          <div style={{ gridColumn: 'span 2' }}>
            <div 
              style={inputContainerStyle}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, inputContainerHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, inputContainerStyle);
              }}
            >
              <MapPin style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Destination</div>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="City or hotel name"
                  style={{
                    ...valueStyle,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    padding: 0,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Check In */}
          <Popover>
            <PopoverTrigger asChild>
              <div 
                style={inputContainerStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, inputContainerHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, inputContainerStyle);
                }}
              >
                <Calendar style={iconStyle} />
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Check In</div>
                  <div style={checkIn ? valueStyle : placeholderStyle}>
                    {checkIn ? format(checkIn, 'MMM dd, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              align="start"
              style={{
                background: 'rgba(45, 35, 28, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(205, 188, 174, 0.2)',
                borderRadius: '16px',
              }}
            >
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Check Out */}
          <Popover>
            <PopoverTrigger asChild>
              <div 
                style={inputContainerStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, inputContainerHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, inputContainerStyle);
                }}
              >
                <Calendar style={iconStyle} />
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Check Out</div>
                  <div style={checkOut ? valueStyle : placeholderStyle}>
                    {checkOut ? format(checkOut, 'MMM dd, yyyy') : 'Select date'}
                  </div>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0" 
              align="start"
              style={{
                background: 'rgba(45, 35, 28, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(205, 188, 174, 0.2)',
                borderRadius: '16px',
              }}
            >
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < (checkIn || new Date())}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Rooms */}
          <div style={{ position: 'relative' }}>
            <div 
              style={inputContainerStyle}
              onClick={() => {
                setShowRoomsDropdown(!showRoomsDropdown);
                setShowGuestsDropdown(false);
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, inputContainerHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, inputContainerStyle);
              }}
            >
              <Home style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Rooms</div>
                <div style={valueStyle}>{rooms} {rooms === 1 ? 'Room' : 'Rooms'}</div>
              </div>
              <ChevronDown style={{ ...iconStyle, color: 'rgba(205, 188, 174, 0.5)' }} />
            </div>
            
            {showRoomsDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'rgba(45, 35, 28, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(205, 188, 174, 0.2)',
                borderRadius: '12px',
                padding: '8px',
                zIndex: 50,
              }}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setRooms(num);
                      setShowRoomsDropdown(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      ...valueStyle,
                      background: rooms === num ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (rooms !== num) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = rooms === num ? 'rgba(212, 175, 55, 0.15)' : 'transparent';
                    }}
                  >
                    {num} {num === 1 ? 'Room' : 'Rooms'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests */}
          <div style={{ position: 'relative' }}>
            <div 
              style={inputContainerStyle}
              onClick={() => {
                setShowGuestsDropdown(!showGuestsDropdown);
                setShowRoomsDropdown(false);
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, inputContainerHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, inputContainerStyle);
              }}
            >
              <Users style={iconStyle} />
              <div style={{ flex: 1 }}>
                <div style={labelStyle}>Guests</div>
                <div style={valueStyle}>{guests} {guests === 1 ? 'Guest' : 'Guests'}</div>
              </div>
              <ChevronDown style={{ ...iconStyle, color: 'rgba(205, 188, 174, 0.5)' }} />
            </div>
            
            {showGuestsDropdown && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'rgba(45, 35, 28, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(205, 188, 174, 0.2)',
                borderRadius: '12px',
                padding: '8px',
                zIndex: 50,
              }}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <div
                    key={num}
                    onClick={() => {
                      setGuests(num);
                      setShowGuestsDropdown(false);
                    }}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      ...valueStyle,
                      background: guests === num ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (guests !== num) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = guests === num ? 'rgba(212, 175, 55, 0.15)' : 'transparent';
                    }}
                  >
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          style={{
            width: '100%',
            padding: '18px 32px',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.9) 0%, rgba(180, 140, 40, 0.9) 100%)',
            border: 'none',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(212, 175, 55, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(212, 175, 55, 0.3)';
          }}
        >
          <Search style={{ width: '20px', height: '20px', color: '#1A1510' }} />
          <span style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '18px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: '#1A1510',
          }}>
            Search Hotels
          </span>
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
