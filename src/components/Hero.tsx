import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg pt-20">
      <div className="absolute inset-0 bg-glow-gradient opacity-30"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-block mb-6">
          <div className="px-4 py-2 bg-electric-blue/10 border border-electric-blue/30 rounded-full text-electric-cyan text-sm font-medium">
            AI-Powered Customer Communication Platform
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          One Assistant for All Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-electric-cyan">
            Customer Conversations
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Calls, WhatsApp, Email, and Telegram — handled automatically using your business data.
        </p>

        <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
          No wrong answers. No missed messages. Fully under your control.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/signup"
            className="group px-8 py-4 bg-electric-blue hover:bg-electric-cyan text-white rounded-lg font-semibold transition-all shadow-glow-md hover:shadow-glow-lg flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="px-8 py-4 bg-dark-surface hover:bg-dark-border text-white rounded-lg font-semibold transition-all border border-dark-border hover:border-electric-blue/50 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            See How It Works
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-gray-400">Always Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4+</div>
            <div className="text-sm text-gray-400">Channels Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-sm text-gray-400">Your Data Only</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">Instant</div>
            <div className="text-sm text-gray-400">Response Time</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
