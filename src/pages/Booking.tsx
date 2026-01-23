'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, Phone, Lock, AlertCircle, Clock, X, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Header, BottomNav } from '@/components/layout';

// Types
interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardholderFirstName: string;
  cardholderLastName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  specialRequests: string;
}

interface BookingSummary {
  hotelName: string;
  roomType: string;
  rateType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  nightlyRate: number;
  taxesAndFees: number;
  total: number;
  currency: string;
}

// Sample booking data
const SAMPLE_BOOKING: BookingSummary = {
  hotelName: 'Holiday Inn Exp Times Square',
  roomType: 'Accessible room',
  rateType: 'BEST FLEXIBLE RATE',
  checkIn: 'Thu, Jan 22, 2026',
  checkOut: 'Sun, Jan 25, 2026',
  nights: 3,
  guests: '2 adults',
  nightlyRate: 149.00,
  taxesAndFees: 128.06,
  total: 575.06,
  currency: 'USD'
};

// Timer component
const CountdownTimer: React.FC<{ 
  initialSeconds: number; 
  onExpire: () => void;
  compact?: boolean;
}> = ({ initialSeconds, onExpire, compact = false }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  const isWarning = seconds < 60;

  if (compact) {
    return (
      <span className={`font-mono text-lg font-semibold ${isWarning ? 'text-destructive' : 'text-foreground'}`}>
        {formattedTime}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Clock className={`h-4 w-4 ${isWarning ? 'text-destructive' : 'text-muted-foreground'}`} />
      <div className="text-sm text-muted-foreground">Rate expires in</div>
      <div className={`font-mono text-lg font-semibold ${isWarning ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
        {formattedTime}
      </div>
    </div>
  );
};

// Rate Expired Modal
const RateExpiredModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}> = ({ isOpen, onClose, onRefresh }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" style={{ backgroundColor: 'hsl(30 25% 98%)' }}>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <Clock className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center font-serif text-xl">Rate Has Expired</DialogTitle>
          <DialogDescription className="text-center">
            The selected rate is no longer available due to timeout. Click "Refresh Rate" to check current availability and pricing.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={onRefresh} className="w-full sm:w-auto gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh Rate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Error Alert
const BookingError: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
    <div>
      <div className="font-medium text-destructive">Booking Failed</div>
      <div className="text-sm text-muted-foreground mt-1">{message}</div>
    </div>
  </div>
);

// Form Section Component
const FormSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
    <CardHeader className="pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <div>
          <CardTitle className="font-serif text-lg">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-0.5">{description}</CardDescription>
          )}
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

// Input Field Component
const FormField: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ label, required, children, icon }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium flex items-center gap-2">
      {icon}
      {label}
      {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
  </div>
);

// Card type detection
const getCardType = (number: string): string => {
  const cleaned = number.replace(/\s/g, '');
  if (cleaned.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(cleaned)) return 'Mastercard';
  if (/^3[47]/.test(cleaned)) return 'Amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
  return '';
};

// Format card number
const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(' ') : cleaned;
};

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: 'test@test.com',
    phone: '',
    cardholderFirstName: '',
    cardholderLastName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>('General problem with SabreCommandLLSRQ service.');
  const [isRateExpired, setIsRateExpired] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const booking = SAMPLE_BOOKING;

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      handleInputChange('cardNumber', formatted);
    }
  };

  const handleRateExpire = useCallback(() => {
    setIsRateExpired(true);
  }, []);

  const handleRefreshRate = () => {
    setIsRateExpired(false);
    setTimerKey(prev => prev + 1);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate error for demo
    setError('General problem with SabreCommandLLSRQ service.');
    setIsSubmitting(false);
  };

  const cardType = getCardType(formData.cardNumber);

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, '0');
    return { value: month, label: month };
  });

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Sub-header with back button and timer */}
      <div 
        className="fixed top-[4.5rem] left-0 right-0 z-40 border-b border-border/50"
        style={{ 
          backgroundColor: 'hsl(30 25% 98% / 0.95)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to hotel
          </Button>
          <CountdownTimer 
            key={timerKey}
            initialSeconds={180} 
            onExpire={handleRateExpire} 
          />
        </div>
      </div>

      {/* Main Content */}
      <main 
        className="container mx-auto px-4 pb-24 md:pb-8"
        style={{ paddingTop: '8.5rem' }}
      >
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel - Form */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-foreground">
                Complete Your Booking
              </h1>
            </div>

            {error && <BookingError message={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Information */}
              <FormSection
                icon={<User className="h-5 w-5 text-primary" />}
                title="Guest Information"
                description="Details for the primary guest on this reservation"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First Name" required>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="bg-background"
                    />
                  </FormField>
                  <FormField label="Last Name" required>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className="bg-background"
                    />
                  </FormField>
                </div>
                <FormField label="Email Address" required icon={<Mail className="h-4 w-4 text-muted-foreground" />}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="bg-background"
                  />
                </FormField>
                <FormField label="Phone Number" required icon={<Phone className="h-4 w-4 text-muted-foreground" />}>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="bg-background"
                  />
                </FormField>
              </FormSection>

              {/* Payment Information */}
              <FormSection
                icon={<CreditCard className="h-5 w-5 text-primary" />}
                title="Payment Information"
                description="Your payment is secure and encrypted"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Cardholder First Name" required>
                    <Input
                      value={formData.cardholderFirstName}
                      onChange={(e) => handleInputChange('cardholderFirstName', e.target.value)}
                      placeholder="John"
                      className="bg-background"
                    />
                  </FormField>
                  <FormField label="Cardholder Last Name" required>
                    <Input
                      value={formData.cardholderLastName}
                      onChange={(e) => handleInputChange('cardholderLastName', e.target.value)}
                      placeholder="Doe"
                      className="bg-background"
                    />
                  </FormField>
                </div>
                
                <FormField label="Card Number" required>
                  <div className="relative">
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="bg-background pr-16"
                    />
                    {cardType && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-primary">
                        {cardType}
                      </span>
                    )}
                  </div>
                </FormField>

                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField label="Month" required>
                    <Select 
                      value={formData.expiryMonth} 
                      onValueChange={(value) => handleInputChange('expiryMonth', value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {months.map(m => (
                          <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="Year" required>
                    <Select 
                      value={formData.expiryYear} 
                      onValueChange={(value) => handleInputChange('expiryYear', value)}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {years.map(y => (
                          <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                  <FormField label="CVV" required icon={<Lock className="h-4 w-4 text-muted-foreground" />}>
                    <Input
                      type="password"
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 4) handleInputChange('cvv', value);
                      }}
                      placeholder="•••"
                      className="bg-background"
                      maxLength={4}
                    />
                  </FormField>
                </div>

                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <Lock className="h-3 w-3 mt-0.5 shrink-0" />
                  Your card will be charged after booking confirmation. We use industry-standard encryption to protect your payment information.
                </p>
              </FormSection>

              {/* Special Requests */}
              <FormSection
                icon={<Mail className="h-5 w-5 text-primary" />}
                title="Special Requests"
                description="Optional"
              >
                <Textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requests or preferences for your stay..."
                  className="bg-background min-h-[100px] resize-none"
                />
              </FormSection>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Processing...
                  </div>
                ) : (
                  'Complete Booking'
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                By completing this booking, you agree to our{' '}
                <a href="#" className="text-primary underline-offset-4 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-primary underline-offset-4 hover:underline">Privacy Policy</a>.
                {' '}You will receive a confirmation email at{' '}
                <span className="font-medium text-foreground">{formData.email}</span>.
              </p>
            </form>
          </div>

          {/* Right Panel - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-36">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden">
                {/* Timer Header */}
                <div className="bg-primary/5 px-6 py-3 flex items-center justify-center gap-2 border-b border-border/50">
                  <Clock className="h-4 w-4 text-primary" />
                  <CountdownTimer 
                    key={`summary-${timerKey}`}
                    initialSeconds={180} 
                    onExpire={handleRateExpire}
                    compact
                  />
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Hotel Info */}
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {booking.hotelName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{booking.roomType}</p>
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-gold/10 text-gold rounded">
                      {booking.rateType}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-in</p>
                        <p className="font-medium text-foreground">{booking.checkIn}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Check-out</p>
                        <p className="font-medium text-foreground">{booking.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Nights</p>
                        <p className="font-medium text-foreground">{booking.nights} nights</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Guests</p>
                        <p className="font-medium text-foreground">{booking.guests}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    <h4 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wide">
                      Price Summary
                    </h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {booking.nights} nights × ${booking.nightlyRate.toFixed(2)}
                      </span>
                      <span className="font-medium text-foreground">
                        ${(booking.nights * booking.nightlyRate).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes & fees</span>
                      <span className="font-medium text-foreground">
                        ${booking.taxesAndFees.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border/50">
                      <span className="font-serif font-semibold text-lg text-foreground">Total</span>
                      <span className="font-serif font-semibold text-lg text-foreground">
                        ${booking.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Charge Notice */}
                  <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
                    You will be charged <span className="font-medium text-foreground">${booking.total.toFixed(2)} {booking.currency}</span> after booking confirmation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Rate Expired Modal */}
      <RateExpiredModal
        isOpen={isRateExpired}
        onClose={() => navigate(-1)}
        onRefresh={handleRefreshRate}
      />
    </div>
  );
};

export default Booking;
