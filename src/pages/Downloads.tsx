import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, MapPin } from "lucide-react";

interface DownloadItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileSize: string;
  pages: number;
  destination: string;
  downloadUrl: string;
}

const downloads: DownloadItem[] = [
  {
    id: 1,
    title: "Ultimate Southeast Asia Backpacking Guide",
    description: "Complete 50-page guide covering Thailand, Vietnam, Cambodia, and Laos. Includes budget breakdowns, itineraries, packing lists, and cultural tips.",
    category: "Travel Guide",
    fileSize: "8.5 MB",
    pages: 50,
    destination: "Southeast Asia",
    downloadUrl: "/downloads/southeast-asia-guide.pdf",
  },
  {
    id: 2,
    title: "Mediterranean Island Hopping Itinerary",
    description: "7-day, 14-day, and 21-day itineraries for Greece and Croatia. Ferry schedules, accommodation recommendations, and hidden beach locations.",
    category: "Itinerary",
    fileSize: "4.2 MB",
    pages: 28,
    destination: "Mediterranean",
    downloadUrl: "/downloads/mediterranean-itinerary.pdf",
  },
  {
    id: 3,
    title: "Photography Tips for Travel Bloggers",
    description: "Master travel photography with this comprehensive guide. Camera settings, composition techniques, editing workflows, and gear recommendations.",
    category: "Photography",
    fileSize: "12.3 MB",
    pages: 65,
    destination: "Worldwide",
    downloadUrl: "/downloads/photography-guide.pdf",
  },
  {
    id: 4,
    title: "Budget Travel Hacks & Money-Saving Tips",
    description: "Learn how to travel longer for less. Flight deals, accommodation hacks, food budgeting, and strategies I've used to visit 47 countries.",
    category: "Budget Travel",
    fileSize: "3.8 MB",
    pages: 22,
    destination: "Worldwide",
    downloadUrl: "/downloads/budget-travel-hacks.pdf",
  },
  {
    id: 5,
    title: "Minimalist Packing Checklist",
    description: "The ultimate carry-on only packing list. Tested over 6 years of full-time travel. Printable checklist and product recommendations.",
    category: "Packing Guide",
    fileSize: "1.5 MB",
    pages: 10,
    destination: "Worldwide",
    downloadUrl: "/downloads/packing-checklist.pdf",
  },
  {
    id: 6,
    title: "Northern Lights Photography & Viewing Guide",
    description: "Everything you need to know about chasing the Aurora Borealis. Best locations, camera settings, seasonal tips, and booking recommendations.",
    category: "Travel Guide",
    fileSize: "9.7 MB",
    pages: 42,
    destination: "Scandinavia",
    downloadUrl: "/downloads/northern-lights-guide.pdf",
  },
];

const Downloads = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-accent-foreground" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Free Travel Resources
              </h1>
              <p className="text-lg text-muted-foreground">
                Downloadable guides, itineraries, checklists, and tips to help plan your next adventure. 
                All resources are completely free and based on real travel experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads Grid */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {downloads.map((item) => (
                <Card
                  key={item.id}
                  className="p-6 bg-card shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-accent/10 text-accent border-accent/20">
                      {item.category}
                    </Badge>
                    <FileText className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{item.destination}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.pages} pages</span>
                      <span>{item.fileSize}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      // In production, this would trigger actual file download
                      // For now, show a message
                      alert('Download functionality will be available soon! These PDFs are currently being finalized.');
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Free PDF
                  </Button>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="mt-16 p-8 lg:p-12 bg-gradient-card shadow-medium max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-card-foreground mb-4">
                Want More Resources?
              </h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to my newsletter to get notified when new guides are released, 
                plus exclusive content and travel tips delivered straight to your inbox.
              </p>
              <Button
                onClick={() => window.open('https://tally.so/r/your-newsletter-form', '_blank')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all hover:scale-105"
              >
                Subscribe to Newsletter
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Downloads;
