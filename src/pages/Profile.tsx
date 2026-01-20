"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { User, Bed, Eye, Building, Wallet, Heart, Award, FileText, Save, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    floorPreference: "",
    bedType: "",
    viewPreference: "",
    quietRoom: false,
    accessibleRoom: false,
    smokingRoom: false,
    travelPurpose: "",
    budgetRange: "",
    amenities: [] as string[],
    loyaltyPrograms: [] as string[],
    dietaryRestrictions: "",
    specialNeeds: "",
  });

  const handleAmenityToggle = (amenity: string) => {
    setPreferences((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleLoyaltyToggle = (program: string) => {
    setPreferences((prev) => ({
      ...prev,
      loyaltyPrograms: prev.loyaltyPrograms.includes(program)
        ? prev.loyaltyPrograms.filter((p) => p !== program)
        : [...prev.loyaltyPrograms, program],
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Preferences saved successfully", {
      description: "Your travel preferences have been updated.",
    });
  };

  const floorOptions = ["No Preference", "High Floor", "Low Floor"];
  const bedOptions = ["No Preference", "King Bed", "Queen Bed", "Double Beds", "Twin Beds"];
  const viewOptions = ["No Preference", "Ocean View", "City View", "Garden View", "Pool View"];
  const travelPurposeOptions = ["No Preference", "Business Travel", "Leisure/Vacation", "Family Travel", "Romantic Getaway"];
  const budgetOptions = [
    "No Preference",
    "Budget-Friendly (Under $150/night)",
    "Moderate ($150-300/night)",
    "Luxury ($300-600/night)",
    "Ultra-Luxury ($600+/night)",
  ];
  const amenitiesOptions = [
    "Gym/Fitness",
    "Swimming Pool",
    "Spa & Wellness",
    "On-site Restaurant",
    "Business Center",
    "Concierge Service",
  ];
  const loyaltyOptions = [
    "Marriott Bonvoy",
    "Hilton Honors",
    "IHG One Rewards",
    "World of Hyatt",
    "Wyndham Rewards",
    "Accor Live Limitless",
    "Best Western Rewards",
    "Radisson Rewards",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 25% 98%) 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "2rem 1rem",
      }}
    >
      {/* Ambient background elements */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-10%",
          width: "40rem",
          height: "40rem",
          background: "radial-gradient(circle, hsla(40, 45%, 55%, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
          animation: "float 20s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-5%",
          width: "35rem",
          height: "35rem",
          background: "radial-gradient(circle, hsla(25, 35%, 60%, 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
          animation: "float 25s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              borderRadius: "50%",
              background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.15) 0%, hsla(40, 45%, 55%, 0.05) 100%)",
              marginBottom: "1.5rem",
            }}
          >
            <User style={{ width: "1.75rem", height: "1.75rem", color: "hsl(40 45% 45%)" }} />
          </div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "2.25rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "hsl(30 15% 20%)",
              marginBottom: "0.75rem",
            }}
          >
            Travel Preferences
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "hsl(30 10% 45%)",
              fontWeight: 300,
              letterSpacing: "0.01em",
              maxWidth: "28rem",
              margin: "0 auto",
            }}
          >
            Customize your hotel search experience. These preferences will be used by our voice assistant.
          </p>
        </div>

        {/* Room Preferences Section */}
        <SectionCard
          icon={<Bed style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Room Preferences"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <SelectField
              label="FLOOR PREFERENCE"
              value={preferences.floorPreference}
              onChange={(v) => setPreferences({ ...preferences, floorPreference: v })}
              options={floorOptions}
            />
            <SelectField
              label="BED TYPE"
              value={preferences.bedType}
              onChange={(v) => setPreferences({ ...preferences, bedType: v })}
              options={bedOptions}
            />
            <SelectField
              label="VIEW PREFERENCE"
              value={preferences.viewPreference}
              onChange={(v) => setPreferences({ ...preferences, viewPreference: v })}
              options={viewOptions}
            />
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <CheckboxField
              id="quietRoom"
              checked={preferences.quietRoom}
              onChange={(c) => setPreferences({ ...preferences, quietRoom: c })}
              label="Quiet Room (away from elevators, ice machines)"
            />
            <CheckboxField
              id="accessibleRoom"
              checked={preferences.accessibleRoom}
              onChange={(c) => setPreferences({ ...preferences, accessibleRoom: c })}
              label="Accessible Room"
            />
            <CheckboxField
              id="smokingRoom"
              checked={preferences.smokingRoom}
              onChange={(c) => setPreferences({ ...preferences, smokingRoom: c })}
              label="Smoking Room"
            />
          </div>
        </SectionCard>

        {/* Travel Style Section */}
        <SectionCard
          icon={<Building style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Travel Style"
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <SelectField
              label="PRIMARY TRAVEL PURPOSE"
              value={preferences.travelPurpose}
              onChange={(v) => setPreferences({ ...preferences, travelPurpose: v })}
              options={travelPurposeOptions}
            />
            <SelectField
              label="BUDGET RANGE"
              value={preferences.budgetRange}
              onChange={(v) => setPreferences({ ...preferences, budgetRange: v })}
              options={budgetOptions}
            />
          </div>
        </SectionCard>

        {/* Preferred Amenities Section */}
        <SectionCard
          icon={<Heart style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Preferred Amenities"
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {amenitiesOptions.map((amenity) => (
              <ChipCheckbox
                key={amenity}
                label={amenity}
                checked={preferences.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
            ))}
          </div>
        </SectionCard>

        {/* Loyalty Programs Section */}
        <SectionCard
          icon={<Award style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Loyalty Programs"
          subtitle="Select the loyalty programs you're a member of"
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {loyaltyOptions.map((program) => (
              <ChipCheckbox
                key={program}
                label={program}
                checked={preferences.loyaltyPrograms.includes(program)}
                onChange={() => handleLoyaltyToggle(program)}
              />
            ))}
          </div>
        </SectionCard>

        {/* Special Requirements Section */}
        <SectionCard
          icon={<FileText style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />}
          title="Special Requirements"
        >
          <div style={{ display: "grid", gap: "1.25rem" }}>
            <div>
              <Label
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "hsl(30 10% 45%)",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                DIETARY RESTRICTIONS
              </Label>
              <Textarea
                value={preferences.dietaryRestrictions}
                onChange={(e) => setPreferences({ ...preferences, dietaryRestrictions: e.target.value })}
                placeholder="e.g., Vegetarian, Vegan, Gluten-free, Allergies..."
                style={{
                  background: "hsla(30, 25%, 98%, 0.8)",
                  border: "1px solid hsla(40, 30%, 75%, 0.4)",
                  borderRadius: "0.75rem",
                  padding: "0.875rem 1rem",
                  fontSize: "0.9375rem",
                  color: "hsl(30 15% 20%)",
                  fontFamily: "'Inter', sans-serif",
                  minHeight: "5rem",
                  resize: "vertical",
                }}
              />
            </div>
            <div>
              <Label
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "hsl(30 10% 45%)",
                  marginBottom: "0.5rem",
                  display: "block",
                }}
              >
                SPECIAL NEEDS OR REQUESTS
              </Label>
              <Textarea
                value={preferences.specialNeeds}
                onChange={(e) => setPreferences({ ...preferences, specialNeeds: e.target.value })}
                placeholder="Any additional requirements or preferences..."
                style={{
                  background: "hsla(30, 25%, 98%, 0.8)",
                  border: "1px solid hsla(40, 30%, 75%, 0.4)",
                  borderRadius: "0.75rem",
                  padding: "0.875rem 1rem",
                  fontSize: "0.9375rem",
                  color: "hsl(30 15% 20%)",
                  fontFamily: "'Inter', sans-serif",
                  minHeight: "5rem",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </SectionCard>

        {/* Save Button */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            style={{
              background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
              color: "hsl(40 30% 98%)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              fontWeight: 400,
              letterSpacing: "0.02em",
              padding: "1rem 2.5rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              boxShadow: "0 4px 20px -4px hsla(40, 45%, 40%, 0.35)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: "1.125rem",
                  height: "1.125rem",
                  border: "2px solid hsla(40, 30%, 98%, 0.3)",
                  borderTopColor: "hsl(40 30% 98%)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            ) : (
              <Save style={{ width: "1.125rem", height: "1.125rem" }} />
            )}
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(3deg); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

/* Section Card Component */
const SectionCard = ({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      background: "hsla(30, 25%, 99%, 0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid hsla(40, 30%, 85%, 0.5)",
      borderRadius: "1.25rem",
      padding: "1.75rem",
      marginBottom: "1.25rem",
      boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.08)",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: subtitle ? "0.375rem" : "1.25rem" }}>
      {icon}
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.375rem",
          fontWeight: 400,
          color: "hsl(30 15% 20%)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
    </div>
    {subtitle && (
      <p
        style={{
          fontSize: "0.8125rem",
          color: "hsl(30 10% 50%)",
          fontWeight: 300,
          marginBottom: "1.25rem",
          marginLeft: "2rem",
        }}
      >
        {subtitle}
      </p>
    )}
    {children}
  </div>
);

/* Select Field Component */
const SelectField = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => (
  <div>
    <Label
      style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "hsl(30 10% 45%)",
        marginBottom: "0.5rem",
        display: "block",
      }}
    >
      {label}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        style={{
          background: "hsla(30, 25%, 98%, 0.8)",
          border: "1px solid hsla(40, 30%, 75%, 0.4)",
          borderRadius: "0.75rem",
          padding: "0.75rem 1rem",
          fontSize: "0.9375rem",
          color: value ? "hsl(30 15% 20%)" : "hsl(30 10% 55%)",
          fontFamily: "'Inter', sans-serif",
          height: "3rem",
        }}
      >
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent
        style={{
          background: "hsl(30 25% 98%)",
          border: "1px solid hsla(40, 30%, 75%, 0.5)",
          borderRadius: "0.75rem",
          boxShadow: "0 8px 32px -8px hsla(30, 20%, 30%, 0.15)",
        }}
      >
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "hsl(30 15% 25%)",
              padding: "0.625rem 1rem",
            }}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

/* Checkbox Field Component */
const CheckboxField = ({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: (c: boolean) => void;
  label: string;
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onChange}
      style={{
        width: "1.125rem",
        height: "1.125rem",
        borderRadius: "0.25rem",
        border: "1.5px solid hsla(40, 30%, 60%, 0.6)",
        background: checked ? "hsl(40 45% 50%)" : "transparent",
      }}
    />
    <Label
      htmlFor={id}
      style={{
        fontSize: "0.875rem",
        color: "hsl(30 15% 30%)",
        fontWeight: 400,
        cursor: "pointer",
      }}
    >
      {label}
    </Label>
  </div>
);

/* Chip Checkbox Component */
const ChipCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    style={{
      background: checked
        ? "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 45%) 100%)"
        : "hsla(30, 25%, 98%, 0.8)",
      color: checked ? "hsl(40 30% 98%)" : "hsl(30 15% 35%)",
      border: checked ? "1px solid hsl(40 45% 45%)" : "1px solid hsla(40, 30%, 75%, 0.5)",
      borderRadius: "2rem",
      padding: "0.5rem 1rem",
      fontSize: "0.8125rem",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 400,
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: checked ? "0 2px 8px -2px hsla(40, 45%, 40%, 0.3)" : "none",
    }}
  >
    {label}
  </button>
);

export default Profile;
