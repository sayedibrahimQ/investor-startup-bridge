
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const moveX = x * 20;
      const moveY = y * 20;
      
      const glowElements = heroRef.current.querySelectorAll('.glow-effect');
      
      glowElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] opacity-60 glow-effect"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] opacity-60 glow-effect"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 border border-border rounded-full text-sm font-medium bg-background/50 backdrop-blur-sm animate-in slide-in-from-bottom">
            Connecting Startups with Smart Capital
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-in slide-in-from-bottom" style={{ "--index": 1 } as any}>
            <span className="text-balance">The Intelligent Bridge Between</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Startups & Investors</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance animate-in slide-in-from-bottom opacity-80" style={{ "--index": 2 } as any}>
            AI-powered analysis to boost investment readiness for startups and 
            intelligent matching to help investors find their next unicorn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in slide-in-from-bottom" style={{ "--index": 3 } as any}>
            <Link to="/signup?role=startup">
              <Button size="lg" className="rounded-full px-8 w-full sm:w-auto">
                For Startups
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup?role=investor">
              <Button variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto">
                For Investors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-muted rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
