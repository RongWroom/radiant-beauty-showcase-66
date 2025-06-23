
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-brand-off-white to-brand-light-gray">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-6xl font-serif font-bold mb-4 text-brand-charcoal">404</h1>
          <h2 className="text-2xl font-serif mb-4 text-brand-charcoal">Page Not Found</h2>
          <p className="text-lg text-brand-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Link to="/">
            <Button className="bg-brand-slate-blue hover:bg-brand-slate-blue-light text-white text-lg py-3 px-8">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
