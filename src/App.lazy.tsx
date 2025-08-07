import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { SecurityHeaders } from "./components/security/SecurityHeaders";
import ScrollToTop from "./components/ScrollToTop";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Auth = lazy(() => import("./pages/Auth"));
const Account = lazy(() => import("./pages/Account"));
const CustomerAppointments = lazy(() => import("./pages/CustomerAppointments"));
const Treatments = lazy(() => import("./pages/Treatments"));
const TreatmentDetail = lazy(() => import("./pages/TreatmentDetail"));
const BookAppointment = lazy(() => import("./pages/BookAppointment"));
const ManageAppointment = lazy(() => import("./pages/ManageAppointment"));
const ConfirmAppointment = lazy(() => import("./pages/ConfirmAppointment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SecurityHeaders />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <ScrollToTop />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/my-appointments" element={<CustomerAppointments />} />
                    <Route path="/treatments" element={<Treatments />} />
                    <Route path="/treatments/:id" element={<TreatmentDetail />} />
                    <Route path="/treatments/:id/book" element={<BookAppointment />} />
                    <Route path="/book/:id" element={<BookAppointment />} />
                    <Route path="/manage/:token" element={<ManageAppointment />} />
                    <Route path="/confirm-appointment" element={<ConfirmAppointment />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;