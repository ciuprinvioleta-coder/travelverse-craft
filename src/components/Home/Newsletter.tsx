import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing! Check your inbox for confirmation.");
      setEmail("");
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Travel Tips in Your Inbox
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Subscribe to receive exclusive destination guides, travel hacks, and early access to our upcoming trips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-medium transition-all hover:scale-105"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-primary-foreground/70 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </div>
    </section>
  );
};
