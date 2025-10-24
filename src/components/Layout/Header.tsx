import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo-colored.png";
const languages = [{
  code: "en",
  label: "English"
}, {
  code: "ro",
  label: "Română"
}, {
  code: "ru",
  label: "Русский"
}];
export const Header = () => {
  const [currentLang, setCurrentLang] = useState("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Travel with Violeta" 
              className="w-12 h-12 transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-foreground hidden sm:inline">Travel with Violeta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/articles" className="text-foreground hover:text-accent transition-colors font-medium">
              Articles
            </Link>
            <Link to="/destinations" className="text-foreground hover:text-accent transition-colors font-medium">
              This Month
            </Link>
            <Link to="/trips" className="text-foreground hover:text-accent transition-colors font-medium">
              Trips
            </Link>
            <Link to="/downloads" className="text-foreground hover:text-accent transition-colors font-medium">
              Downloads
            </Link>
            <Link to="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              About
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">{currentLang.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map(lang => <DropdownMenuItem key={lang.code} onClick={() => setCurrentLang(lang.code)} className={currentLang === lang.code ? "bg-accent/10" : ""}>
                    {lang.label}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link to="/articles" className="text-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Articles
              </Link>
              <Link to="/destinations" className="text-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                This Month
              </Link>
              <Link to="/trips" className="text-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Trips
              </Link>
              <Link to="/downloads" className="text-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                Downloads
              </Link>
              <Link to="/about" className="text-foreground hover:text-accent transition-colors font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </div>
          </nav>}
      </div>
    </header>;
};