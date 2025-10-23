import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, MapPin } from "lucide-react";
import destination1 from "@/assets/destination-1.jpg";
import destination2 from "@/assets/destination-2.jpg";
import { toast } from "sonner";
import { z } from "zod";

// Validate signup URLs are from trusted domains
const urlSchema = z.string().url().refine(
  (url) => url.startsWith('https://tally.so/') || url.startsWith('https://forms.gle/'),
  { message: 'Signup URL must be from approved domain (tally.so or forms.gle)' }
);

const handleSignup = (signupUrl: string) => {
  const result = urlSchema.safeParse(signupUrl);
  if (!result.success) {
    toast.error("Invalid signup URL");
    console.error(result.error);
    return;
  }
  window.open(result.data, '_blank');
};

const trips = [
  {
    id: 1,
    title: "Mediterranean Coast Explorer",
    destination: "Italy & Croatia",
    image: destination1,
    dates: "June 15-25, 2024",
    duration: "10 days",
    price: "€2,499",
    groupSize: "8-12 people",
    difficulty: "Easy",
    description: "Experience the magic of the Adriatic coast with visits to hidden villages, coastal hikes, and authentic local cuisine.",
    signupUrl: "https://tally.so/r/your-mediterranean-trip-form",
  },
  {
    id: 2,
    title: "Southeast Asia Adventure",
    destination: "Thailand & Cambodia",
    image: destination2,
    dates: "September 10-24, 2024",
    duration: "14 days",
    price: "€2,899",
    groupSize: "10-15 people",
    difficulty: "Moderate",
    description: "Explore ancient temples, vibrant markets, and pristine beaches in this comprehensive Southeast Asian journey.",
    signupUrl: "https://tally.so/r/your-asia-trip-form",
  },
];

const Trips = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Join Our Trips
              </h1>
              <p className="text-lg text-muted-foreground">
                Small group adventures led by experienced travelers. Make new friends while exploring the world's most incredible destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Trips Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {trips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden bg-card shadow-medium hover:shadow-strong transition-all duration-300">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground shadow-medium">
                        {trip.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">{trip.destination}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-3">
                      {trip.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {trip.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-accent" />
                        <div>
                          <div className="font-medium text-card-foreground">{trip.dates}</div>
                          <div className="text-muted-foreground text-xs">{trip.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-accent" />
                        <div>
                          <div className="font-medium text-card-foreground">{trip.groupSize}</div>
                          <div className="text-muted-foreground text-xs">Small group</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-border">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-accent" />
                        <span className="text-2xl font-bold text-card-foreground">{trip.price}</span>
                        <span className="text-sm text-muted-foreground">per person</span>
                      </div>
                      <Button 
                        onClick={() => handleSignup(trip.signupUrl)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all hover:scale-105"
                      >
                        Sign Up for This Trip
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Trips;
