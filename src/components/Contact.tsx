import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Let's Get In Touch</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">I'd love to hear from you</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          I design and code beautifully simple things and I love what I do. Have a project in mind? Let's work together to bring your vision to life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-xl mb-2">Phone</h4>
            <a href="tel:01907934007" className="text-muted-foreground hover:text-primary transition-colors">
              01907934007
            </a>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Email</h4>
            <a href="mailto:talhazobayed7@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
              talhazobayed7@gmail.com
            </a>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-2">Address</h4>
            <p className="text-muted-foreground">Dhaka, Bangladesh</p>
          </div>
        </div>
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="First Name*"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="bg-card/50 border-border focus:border-primary"
            />
            <Input
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="bg-card/50 border-border focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email*"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-card/50 border-border focus:border-primary"
            />
            <Input
              type="tel"
              placeholder="Phone*"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="bg-card/50 border-border focus:border-primary"
            />
          </div>
          <Textarea
            placeholder="Message*"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="bg-card/50 border-border focus:border-primary"
          />
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;