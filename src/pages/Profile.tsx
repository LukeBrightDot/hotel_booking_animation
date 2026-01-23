"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { 
  User, 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Save,
  Mail,
  Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Header, BottomNav } from "@/components/layout";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "user@example.com",
    phone: "",
  });

  // Mock stats - would come from API
  const stats = {
    searches: 0,
    bookings: 0,
    memberSince: "Jan 2026",
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast.success("Profile updated successfully", {
      description: "Your personal information has been saved.",
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 25% 98%) 100%)",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
        paddingTop: "5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        paddingBottom: "6rem", // Space for bottom nav on mobile
      }}
    >
      {/* Unified Header */}
      <Header />

      {/* Bottom Navigation (Mobile only) */}
      <BottomNav />
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
              width: "4.5rem",
              height: "4.5rem",
              borderRadius: "50%",
              background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.15) 0%, hsla(40, 45%, 55%, 0.05) 100%)",
              marginBottom: "1.5rem",
              border: "2px solid hsla(40, 45%, 55%, 0.2)",
            }}
          >
            <User style={{ width: "2rem", height: "2rem", color: "hsl(40 45% 45%)" }} />
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
            My Profile
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
            Manage your account information and preferences
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <StatCard icon={<Search />} value={stats.searches} label="SEARCHES" />
          <StatCard icon={<Calendar />} value={stats.bookings} label="BOOKINGS" />
          <StatCard icon={<Clock />} value={stats.memberSince} label="MEMBER SINCE" />
        </div>

        {/* Travel Preferences Link Card */}
        <Link to="/profile/preferences" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.12) 0%, hsla(40, 45%, 55%, 0.06) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid hsla(40, 45%, 55%, 0.25)",
              borderRadius: "1.25rem",
              padding: "1.25rem 1.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, hsla(40, 45%, 55%, 0.18) 0%, hsla(40, 45%, 55%, 0.10) 100%)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px -8px hsla(40, 45%, 40%, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, hsla(40, 45%, 55%, 0.12) 0%, hsla(40, 45%, 55%, 0.06) 100%)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 12px -4px hsla(40, 45%, 40%, 0.4)",
                }}
              >
                <svg
                  style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 30% 98%)" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "hsl(30 15% 20%)",
                    marginBottom: "0.125rem",
                  }}
                >
                  Travel Preferences
                </h3>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "hsl(30 10% 45%)",
                    fontWeight: 300,
                  }}
                >
                  Room, amenities, loyalty programs & more
                </p>
              </div>
            </div>
            <ChevronRight style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />
          </div>
        </Link>

        {/* Personal Information Card */}
        <div
          style={{
            background: "hsla(30, 25%, 99%, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid hsla(40, 30%, 85%, 0.5)",
            borderRadius: "1.25rem",
            padding: "1.75rem",
            boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <User style={{ width: "1.25rem", height: "1.25rem", color: "hsl(40 45% 45%)" }} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.375rem",
                fontWeight: 400,
                color: "hsl(30 15% 20%)",
                letterSpacing: "-0.01em",
              }}
            >
              Personal Information
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
            <InputField
              label="FIRST NAME"
              value={personalInfo.firstName}
              onChange={(v) => setPersonalInfo({ ...personalInfo, firstName: v })}
              placeholder="Enter your first name"
              icon={<User style={{ width: "1rem", height: "1rem" }} />}
            />
            <InputField
              label="LAST NAME"
              value={personalInfo.lastName}
              onChange={(v) => setPersonalInfo({ ...personalInfo, lastName: v })}
              placeholder="Enter your last name"
              icon={<User style={{ width: "1rem", height: "1rem" }} />}
            />
            <InputField
              label="EMAIL ADDRESS"
              value={personalInfo.email}
              onChange={() => {}}
              placeholder="Your email"
              icon={<Mail style={{ width: "1rem", height: "1rem" }} />}
              disabled
              helperText="Email cannot be changed"
            />
            <InputField
              label="PHONE NUMBER"
              value={personalInfo.phone}
              onChange={(v) => setPersonalInfo({ ...personalInfo, phone: v })}
              placeholder="+1 (555) 000-0000"
              icon={<Phone style={{ width: "1rem", height: "1rem" }} />}
            />
          </div>

          {/* Save Button */}
          <div style={{ marginTop: "1.75rem", display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              style={{
                background: "linear-gradient(135deg, hsl(40 45% 50%) 0%, hsl(40 45% 42%) 100%)",
                color: "hsl(40 30% 98%)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                letterSpacing: "0.02em",
                padding: "0.75rem 1.75rem",
                borderRadius: "0.75rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                boxShadow: "0 4px 20px -4px hsla(40, 45%, 40%, 0.35)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {isLoading ? (
                <div
                  style={{
                    width: "1rem",
                    height: "1rem",
                    border: "2px solid hsla(40, 30%, 98%, 0.3)",
                    borderTopColor: "hsl(40 30% 98%)",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                <Save style={{ width: "1rem", height: "1rem" }} />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
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

/* Stat Card Component */
const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) => (
  <div
    style={{
      background: "hsla(30, 25%, 99%, 0.7)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid hsla(40, 30%, 85%, 0.5)",
      borderRadius: "1rem",
      padding: "1.25rem",
      textAlign: "center",
      boxShadow: "0 4px 24px -8px hsla(30, 20%, 30%, 0.06)",
    }}
  >
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "0.625rem",
        background: "linear-gradient(135deg, hsla(40, 45%, 55%, 0.12) 0%, hsla(40, 45%, 55%, 0.06) 100%)",
        marginBottom: "0.75rem",
        color: "hsl(40 45% 45%)",
      }}
    >
      {React.cloneElement(icon as React.ReactElement, { style: { width: "1.125rem", height: "1.125rem" } })}
    </div>
    <div
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: "1.5rem",
        fontWeight: 500,
        color: "hsl(30 15% 20%)",
        marginBottom: "0.25rem",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: "0.625rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "hsl(30 10% 50%)",
      }}
    >
      {label}
    </div>
  </div>
);

/* Input Field Component */
const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  disabled = false,
  helperText,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  helperText?: string;
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
    <div style={{ position: "relative" }}>
      {icon && (
        <div
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: disabled ? "hsl(30 10% 60%)" : "hsl(30 10% 45%)",
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          background: disabled ? "hsla(30, 20%, 95%, 0.8)" : "hsla(30, 25%, 98%, 0.8)",
          border: "1px solid hsla(40, 30%, 75%, 0.4)",
          borderRadius: "0.75rem",
          padding: icon ? "0.75rem 1rem 0.75rem 2.75rem" : "0.75rem 1rem",
          fontSize: "0.9375rem",
          color: disabled ? "hsl(30 10% 50%)" : "hsl(30 15% 20%)",
          fontFamily: "'Inter', sans-serif",
          height: "3rem",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.8 : 1,
        }}
      />
    </div>
    {helperText && (
      <p
        style={{
          fontSize: "0.75rem",
          color: "hsl(30 10% 55%)",
          marginTop: "0.375rem",
          fontStyle: "italic",
        }}
      >
        {helperText}
      </p>
    )}
  </div>
);

export default Profile;
