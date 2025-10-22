import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mb-12">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <div className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-4 prose-li:text-muted-foreground">
                
                <h2>1. Introduction</h2>
                <p>
                  Welcome to WanderStories ("we," "our," or "us"). We respect your privacy and are 
                  committed to protecting your personal data. This privacy policy explains how we 
                  collect, use, and safeguard your information when you visit our website.
                </p>

                <h2>2. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li><strong>Email Address:</strong> When you subscribe to our newsletter</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website (pages visited, time spent, etc.)</li>
                  <li><strong>Cookies:</strong> Small data files stored on your device to improve your experience</li>
                  <li><strong>Trip Signup Information:</strong> Name, email, and preferences when you sign up for group trips</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Send you travel tips, destination guides, and newsletter content</li>
                  <li>Process trip signups and communicate trip-related information</li>
                  <li>Improve our website and user experience</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Analyze website traffic and user behavior</li>
                </ul>

                <h2>4. Data Sharing</h2>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may 
                  share your information with:
                </p>
                <ul>
                  <li><strong>Service Providers:</strong> Email marketing platforms (e.g., Mailchimp, ConvertKit) and form processors (e.g., Tally, Typeform)</li>
                  <li><strong>Analytics Services:</strong> Google Analytics to understand website usage</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                </ul>

                <h2>5. Cookies</h2>
                <p>
                  We use cookies to enhance your browsing experience. You can control cookie settings 
                  through your browser preferences. Disabling cookies may affect website functionality.
                </p>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Unsubscribe from our newsletter at any time</li>
                  <li>Object to processing of your personal data</li>
                </ul>

                <h2>7. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information. 
                  However, no method of transmission over the internet is 100% secure, and we cannot 
                  guarantee absolute security.
                </p>

                <h2>8. Third-Party Links</h2>
                <p>
                  Our website may contain links to external sites. We are not responsible for the 
                  privacy practices of these third-party websites.
                </p>

                <h2>9. Children's Privacy</h2>
                <p>
                  Our website is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. Changes will be posted on this 
                  page with an updated revision date.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or your personal data, please 
                  contact us at:
                </p>
                <p>
                  <strong>Email:</strong> privacy@wanderstories.com<br />
                  <strong>Website:</strong> www.wanderstories.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
