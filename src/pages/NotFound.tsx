import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Home, Search, Map, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Icon */}
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Map className="w-12 h-12 text-accent" />
            </div>

            {/* Error Message */}
            <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Lost in Transit
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you've wandered off the beaten path. The page you're looking for doesn't exist or has been moved to a new destination.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                asChild 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              >
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
              >
                <Link to="/articles">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Articles
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Maybe you were looking for one of these?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link 
                  to="/destinations" 
                  className="text-sm text-accent hover:underline"
                >
                  This Month's Destinations
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/trips" 
                  className="text-sm text-accent hover:underline"
                >
                  Join Our Trips
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/downloads" 
                  className="text-sm text-accent hover:underline"
                >
                  Free Downloads
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/about" 
                  className="text-sm text-accent hover:underline"
                >
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
