import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenContact: () => void;
}

export default function Navigation({ onOpenContact }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-bg/95 backdrop-blur-lg border-b border-dark-border shadow-glow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white group">
            <Sparkles className="w-7 h-7 text-primary-lighter group-hover:text-primary-light transition-colors" />
            <span>AI Assistant</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('solution')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2.5 bg-primary-blue hover:bg-primary-lighter text-white rounded-lg font-semibold transition-all shadow-glow-sm hover:shadow-glow-md"
            >
              Get Started Free
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-surface border-t border-dark-border">
          <div className="px-4 py-6 space-y-4">
            <button
              onClick={() => scrollToSection('solution')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              Pricing
            </button>
            <Link
              to="/login"
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-6 py-3 bg-primary-blue hover:bg-primary-lighter text-white rounded-lg font-semibold transition-all shadow-glow-sm hover:shadow-glow-md text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
