import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductCards from "@/components/ProductCards";
import DocumentAnalysisSection from "@/components/DocumentAnalysisSection";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <>
      <Hero />
      
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Financial Assistant</h2>
            <p className="text-muted-foreground text-lg">
              Experience the future of financial guidance with our intelligent chatbot that helps you understand documents and discover the right products.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 order-2 lg:order-1">
              <ChatInterface />
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-xl mb-2">Document Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload financial documents like 10-Ks, 10-Qs, annual reports, and more for instant AI-powered analysis and insights.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Extract key financial metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Identify trends and patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Receive customized insights</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border rounded-lg p-5">
                  <h3 className="font-semibold text-xl mb-2">Financial Product Guidance</h3>
                  <p className="text-muted-foreground mb-4">
                    Get personalized recommendations for JP Morgan's financial products based on your needs and document insights.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Personalized product recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Compare features and benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                        <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm">Make informed financial decisions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <DocumentAnalysisSection />
      <Features />
      <ProductCards />
      
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Journey?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of customers who are making smarter financial decisions with JP Morgan's AI-powered assistant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors">
              Get Started Today
            </button>
            <button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-md font-medium transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}