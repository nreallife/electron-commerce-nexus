
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-shop-primary text-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with RBVichElectronics</h2>
          <p className="text-white/80 mb-6">
            Subscribe to our newsletter and be the first to know about new products, special offers, and exclusive deals.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button 
              type="submit" 
              className="bg-shop-accent hover:bg-shop-accent/90 text-white"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-sm text-white/60 mt-4">
            We respect your privacy. No spam, just updates on products and deals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
