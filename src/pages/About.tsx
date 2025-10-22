import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card } from "@/components/ui/card";
import { Mail, Instagram, Youtube, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Hi, I'm Violeta 👋</h1>
              <p className="text-xl text-muted-foreground">Travel blogger, adventure seeker, and citizen of the world</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 lg:p-12 bg-gradient-card shadow-medium">
                <h2 className="text-3xl font-bold text-card-foreground mb-6">My Story</h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    What started as a spontaneous backpacking trip through Southeast Asia in 2018 
                    turned into a life-changing journey that I haven't stopped since. I quit my 
                    corporate job, sold most of my possessions, and set out to explore the world 
                    with just a backpack and a camera.
                  </p>
                  <p>Over the past ten years, I've visited 48 countries across 5 continents, hiked through remote mountain villages, swam with whale sharks, tasted street food in bustling night markets, and made friends from every corner of the globe.</p>
                  <p>
                    WanderStories was born from my desire to share these experiences with others 
                    and inspire more people to step outside their comfort zones. Through detailed 
                    guides, honest reviews, and personal stories, I hope to make travel more 
                    accessible and help you plan your own unforgettable adventures.
                  </p>
                </div>
              </Card>

              {/* Mission Section */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-card text-center shadow-medium hover:shadow-strong transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">Authentic Travel</h3>
                  <p className="text-muted-foreground">
                    Real experiences, honest reviews, no sponsored fluff
                  </p>
                </Card>

                <Card className="p-6 bg-card text-center shadow-medium hover:shadow-strong transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">Hidden Gems</h3>
                  <p className="text-muted-foreground">
                    Discover places off the beaten path
                  </p>
                </Card>

                <Card className="p-6 bg-card text-center shadow-medium hover:shadow-strong transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Join fellow travelers on group adventures
                  </p>
                </Card>
              </div>

              {/* Contact Section */}
              <Card className="mt-12 p-8 bg-gradient-card shadow-medium">
                <h2 className="text-3xl font-bold text-card-foreground mb-6 text-center">
                  Let's Connect
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  Follow my adventures, ask questions, or just say hi!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" className="gap-2" onClick={() => window.open('mailto:hello@wanderstories.com', '_blank')}>
                    <Mail className="w-4 h-4" />
                    Email Me
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => window.open('https://instagram.com/wanderstories', '_blank')}>
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => window.open('https://youtube.com/wanderstories', '_blank')}>
                    <Youtube className="w-4 h-4" />
                    YouTube
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;