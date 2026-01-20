"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "signup";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return false;
    }

    if (mode === "signup") {
      if (!formData.name.trim()) {
        toast({
          title: "Name Required",
          description: "Please enter your full name.",
          variant: "destructive",
        });
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Passwords Don't Match",
          description: "Please ensure both passwords are identical.",
          variant: "destructive",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mode === "login") {
      toast({
        title: "Welcome Back",
        description: "You have successfully signed in.",
      });
    } else {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
    }

    setIsLoading(false);
    navigate("/");
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(30 25% 98%) 0%, hsl(35 30% 95%) 50%, hsl(30 20% 96%) 100%)",
      }}
    >
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div
          className="absolute animate-float"
          style={{
            top: "15%",
            left: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(40 45% 55% / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute animate-float-delayed"
          style={{
            bottom: "20%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(15 45% 65% / 0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute animate-pulse-soft"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, hsl(35 50% 75% / 0.04) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        {/* Decorative particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-breathe"
            style={{
              top: `${20 + i * 12}%`,
              left: `${5 + i * 15}%`,
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "hsl(40 45% 55% / 0.4)",
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 animate-fade-rise"
        style={{
          animationDuration: "0.8s",
        }}
      >
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: "hsl(30 25% 98% / 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid hsl(30 20% 88% / 0.6)",
            boxShadow: "0 25px 80px hsl(30 15% 15% / 0.08), 0 10px 30px hsl(30 15% 15% / 0.04)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
              style={{
                background: "linear-gradient(135deg, hsl(40 45% 55% / 0.15) 0%, hsl(35 50% 75% / 0.1) 100%)",
                border: "1px solid hsl(40 45% 55% / 0.2)",
              }}
            >
              <Sparkles
                className="w-6 h-6"
                style={{ color: "hsl(40 45% 55%)" }}
              />
            </div>
            <h1
              className="text-luxury text-3xl mb-2"
              style={{ color: "hsl(30 15% 15%)" }}
            >
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p
              className="text-elegant"
              style={{ color: "hsl(30 10% 50%)" }}
            >
              {mode === "login"
                ? "Sign in to continue your journey"
                : "Begin your luxury experience"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Signup only) */}
            {mode === "signup" && (
              <div className="space-y-2 animate-fade-rise" style={{ animationDuration: "0.4s" }}>
                <Label
                  htmlFor="name"
                  className="text-elegant"
                  style={{ color: "hsl(30 15% 25%)" }}
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "hsl(30 10% 50%)" }}
                  />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-0"
                    style={{
                      background: "hsl(30 20% 96%)",
                      color: "hsl(30 15% 15%)",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-elegant"
                style={{ color: "hsl(30 15% 25%)" }}
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "hsl(30 10% 50%)" }}
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 h-12 border-0"
                  style={{
                    background: "hsl(30 20% 96%)",
                    color: "hsl(30 15% 15%)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-elegant"
                style={{ color: "hsl(30 15% 25%)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "hsl(30 10% 50%)" }}
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-12 border-0"
                  style={{
                    background: "hsl(30 20% 96%)",
                    color: "hsl(30 15% 15%)",
                    fontSize: "0.95rem",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" style={{ color: "hsl(30 10% 50%)" }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: "hsl(30 10% 50%)" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {mode === "signup" && (
              <div className="space-y-2 animate-fade-rise" style={{ animationDuration: "0.4s" }}>
                <Label
                  htmlFor="confirmPassword"
                  className="text-elegant"
                  style={{ color: "hsl(30 15% 25%)" }}
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "hsl(30 10% 50%)" }}
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-0"
                    style={{
                      background: "hsl(30 20% 96%)",
                      color: "hsl(30 15% 15%)",
                      fontSize: "0.95rem",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Forgot Password (Login only) */}
            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs hover:opacity-70 transition-opacity"
                  style={{ 
                    color: "hsl(40 45% 55%)",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => {
                    toast({
                      title: "Password Reset",
                      description: "Check your email for reset instructions.",
                    });
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-sm font-light tracking-widest uppercase group relative overflow-hidden"
              style={{
                background: isLoading
                  ? "hsl(30 15% 90%)"
                  : "linear-gradient(135deg, hsl(40 45% 55%) 0%, hsl(35 50% 60%) 100%)",
                color: isLoading ? "hsl(30 10% 50%)" : "hsl(30 25% 98%)",
                border: "none",
                boxShadow: isLoading ? "none" : "0 8px 25px hsl(40 45% 55% / 0.25)",
              }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: "hsl(30 10% 50%)",
                      borderTopColor: "transparent",
                    }}
                  />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: "hsl(30 20% 88%)" }} />
            <span
              className="text-elegant text-xs"
              style={{ color: "hsl(30 10% 50%)" }}
            >
              or
            </span>
            <div className="flex-1 h-px" style={{ background: "hsl(30 20% 88%)" }} />
          </div>

          {/* Toggle Mode */}
          <p className="text-center text-sm" style={{ color: "hsl(30 10% 50%)" }}>
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-medium hover:opacity-70 transition-opacity"
              style={{ color: "hsl(40 45% 55%)" }}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p
          className="text-center mt-6 text-elegant text-xs"
          style={{ color: "hsl(30 10% 60%)" }}
        >
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
};

export default Auth;
