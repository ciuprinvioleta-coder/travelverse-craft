import { useState, useEffect } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, CloudRain, CalendarDays, Sparkles, MapPin } from "lucide-react";

interface Destination {
  name: string;
  temperature: string;
  rainfall: string;
  reason: string;
  highlight: string;
}

interface DestinationsData {
  currentMonth: string;
  destinations: Destination[];
}

const Destinations = () => {
  const [data, setData] = useState<DestinationsData | null>(null);

  useEffect(() => {
    fetch('/content/destinations-this-month.json')
      .then((res) => res.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error('Error loading destinations:', error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <CalendarDays className="w-8 h-8 text-accent-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Best Destinations This Month
              </h1>
              <p className="text-lg text-muted-foreground">
                Handpicked destinations with perfect weather, unique experiences, and ideal travel conditions for {data?.currentMonth || 'this month'}.
              </p>
            </div>
          </div>
        </section>

        {/* Current Month Destinations */}
        {data && (
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <Badge className="bg-accent text-accent-foreground shadow-medium mb-4 text-base px-6 py-2">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {data.currentMonth}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Where to Go Right Now
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These destinations are at their absolute best this month—perfect weather, fewer crowds, and unforgettable experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.destinations.map((dest, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{dest.name.split(',')[1]?.trim() || 'International'}</span>
                      </div>
                      <Badge variant="outline" className="border-accent/30 text-accent">
                        #{index + 1}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold text-card-foreground mb-4">
                      {dest.name}
                    </h3>
                    
                    <div className="space-y-3 mb-4 p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Thermometer className="w-5 h-5 text-sunset" />
                        <span className="text-sm font-medium">{dest.temperature}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CloudRain className="w-5 h-5 text-ocean" />
                        <span className="text-sm font-medium">{dest.rainfall} rainfall</span>
                      </div>
                    </div>

                    <p className="text-card-foreground mb-4 leading-relaxed">
                      {dest.reason}
                    </p>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-semibold text-accent">
                          {dest.highlight}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Additional Info Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Planning Your Next Adventure?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our monthly destination guide is updated regularly to reflect the best times to visit based on weather patterns, 
                local events, seasonal highlights, and crowd levels. Each recommendation is based on firsthand travel experience 
                and thorough research to ensure you get the most out of your journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <Thermometer className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-bold text-card-foreground mb-2">Perfect Weather</h3>
                  <p className="text-sm text-muted-foreground">
                    Ideal temperatures and minimal rainfall
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <CalendarDays className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-bold text-card-foreground mb-2">Seasonal Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Festivals, harvest seasons, and local celebrations
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg shadow-soft">
                  <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
                  <h3 className="font-bold text-card-foreground mb-2">Unique Experiences</h3>
                  <p className="text-sm text-muted-foreground">
                    Once-in-a-lifetime opportunities and highlights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
