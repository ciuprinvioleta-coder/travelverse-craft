import { Card } from "@/components/ui/card";
import { Thermometer, CloudRain, CalendarDays } from "lucide-react";

const destinations = [
  {
    name: "Santorini, Greece",
    temperature: "18-22°C",
    rainfall: "Low",
    reason: "Perfect weather for exploring whitewashed villages and stunning sunsets",
    highlight: "Wine tasting season begins",
  },
  {
    name: "Kyoto, Japan",
    temperature: "15-20°C",
    rainfall: "Moderate",
    reason: "Cherry blossom season in full bloom",
    highlight: "Traditional tea ceremonies",
  },
  {
    name: "Patagonia, Argentina",
    temperature: "10-15°C",
    rainfall: "Low",
    reason: "Ideal hiking conditions and fewer crowds",
    highlight: "Glacier trekking season",
  },
];

export const ThisMonth = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <CalendarDays className="w-5 h-5" />
            <span className="font-semibold">March 2024</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Best Places to Visit This Month
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked destinations with perfect weather and unique experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {destinations.map((dest, index) => (
            <Card
              key={index}
              className="p-6 bg-gradient-card shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                {dest.name}
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Thermometer className="w-5 h-5 text-sunset" />
                  <span className="text-sm">{dest.temperature}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CloudRain className="w-5 h-5 text-ocean" />
                  <span className="text-sm">{dest.rainfall} rainfall</span>
                </div>
              </div>

              <p className="text-card-foreground mb-3">
                {dest.reason}
              </p>

              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-accent">
                  ✨ {dest.highlight}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
