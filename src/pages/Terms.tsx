import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mb-12">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <div className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-4 prose-li:text-muted-foreground">
                
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using WanderStories ("the Website"), you accept and agree to be 
                  bound by these Terms of Service. If you do not agree to these terms, please do not 
                  use the Website.
                </p>

                <h2>2. Use of Website</h2>
                <p>You agree to use the Website only for lawful purposes and in a way that does not:</p>
                <ul>
                  <li>Infringe on the rights of others</li>
                  <li>Restrict or inhibit anyone else's use of the Website</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit harmful or malicious code</li>
                  <li>Collect or harvest information about other users</li>
                </ul>

                <h2>3. Intellectual Property</h2>
                <p>
                  All content on this Website, including text, images, photographs, videos, graphics, 
                  and logos, is the property of WanderStories and is protected by copyright and 
                  intellectual property laws. You may not reproduce, distribute, or create derivative 
                  works without our express written permission.
                </p>

                <h2>4. User Content</h2>
                <p>
                  If you submit comments, reviews, or other content to the Website, you grant us a 
                  non-exclusive, royalty-free, perpetual license to use, modify, and display that 
                  content. You retain ownership of your content.
                </p>

                <h2>5. Travel Information Disclaimer</h2>
                <p>
                  The travel information, tips, and recommendations provided on this Website are based 
                  on personal experiences and research. We strive for accuracy but cannot guarantee 
                  that all information is current, complete, or error-free.
                </p>
                <ul>
                  <li>Travel conditions, prices, and availability may change</li>
                  <li>You are responsible for verifying all information before making travel decisions</li>
                  <li>We are not liable for any losses or damages resulting from use of information on this Website</li>
                  <li>Always check official sources for visa requirements, safety warnings, and travel advisories</li>
                </ul>

                <h2>6. Affiliate Links</h2>
                <p>
                  This Website may contain affiliate links to products and services. If you purchase 
                  through these links, we may earn a commission at no additional cost to you. This 
                  does not affect our recommendations, which are always honest and based on personal 
                  experience.
                </p>

                <h2>7. Group Trips</h2>
                <p>
                  When you sign up for group trips organized by WanderStories:
                </p>
                <ul>
                  <li>Trip details, itineraries, and prices are subject to change</li>
                  <li>Separate trip-specific terms and conditions will apply</li>
                  <li>Cancellation policies will be provided at the time of booking</li>
                  <li>We reserve the right to cancel or modify trips due to unforeseen circumstances</li>
                  <li>Travel insurance is strongly recommended</li>
                </ul>

                <h2>8. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, WanderStories shall not be liable for any 
                  direct, indirect, incidental, consequential, or punitive damages arising from:
                </p>
                <ul>
                  <li>Use or inability to use the Website</li>
                  <li>Reliance on information provided on the Website</li>
                  <li>Travel decisions made based on Website content</li>
                  <li>Unauthorized access to or alteration of your data</li>
                </ul>

                <h2>9. External Links</h2>
                <p>
                  The Website may contain links to third-party websites. We are not responsible for 
                  the content, accuracy, or practices of these external sites. Visiting these links is 
                  at your own risk.
                </p>

                <h2>10. Newsletter and Communications</h2>
                <p>
                  By subscribing to our newsletter, you consent to receive email communications from 
                  us. You can unsubscribe at any time using the link provided in every email.
                </p>

                <h2>11. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be 
                  effective immediately upon posting to the Website. Your continued use of the Website 
                  after changes are posted constitutes acceptance of the modified terms.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the 
                  laws of [Your Country/State], without regard to its conflict of law provisions.
                </p>

                <h2>13. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p>
                  <strong>Email:</strong> legal@wanderstories.com<br />
                  <strong>Website:</strong> www.wanderstories.com
                </p>

                <h2>14. Severability</h2>
                <p>
                  If any provision of these Terms of Service is found to be unenforceable or invalid, 
                  that provision shall be limited or eliminated to the minimum extent necessary, and 
                  the remaining provisions shall remain in full force and effect.
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

export default Terms;
