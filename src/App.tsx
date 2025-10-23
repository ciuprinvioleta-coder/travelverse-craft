import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Destinations from "./pages/Destinations";
import Trips from "./pages/Trips";
import About from "./pages/About";
import Downloads from "./pages/Downloads";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";


const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Articles without locale (defaults to 'en') */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          {/* Articles with locale */}
          <Route path="/:locale/articles" element={<Articles />} />
          <Route path="/:locale/articles/:slug" element={<ArticleDetail />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/about" element={<About />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
