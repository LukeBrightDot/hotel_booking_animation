import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import HotelDetail from "./pages/HotelDetail";
import RoomRates from "./pages/RoomRates";
import Booking from "./pages/Booking";
import LoaderDemo from "./pages/LoaderDemo";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProfilePreferences from "./pages/ProfilePreferences";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/preferences" element={<ProfilePreferences />} />
          <Route path="/hotel/:hotelId" element={<HotelDetail />} />
          <Route path="/hotel/:hotelId/room/:roomId/rates" element={<RoomRates />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/loader-demo" element={<LoaderDemo />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
