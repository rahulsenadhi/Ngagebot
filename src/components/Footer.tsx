import { Link } from 'react-router-dom';
import { Bot, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-primary-light rounded-lg flex items-center justify-center shadow-glow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-lighter to-accent-cyan">
                Ngagebot
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              One assistant for all your customer conversations across every channel.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('solution');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('pricing');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Ngagebot. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
