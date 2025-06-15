
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Treatments from "./pages/Treatments";
import TreatmentDetail from "./pages/TreatmentDetail";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import BookAppointment from "./pages/BookAppointment";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/treatments/:id" element={<TreatmentDetail />} />
              <Route path="/treatments/:id/book" element={<BookAppointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
