import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

interface FinalCTAProps {
  onOpenContact: () => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Stop Managing Conversations.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-blue to-primary-lighter">
            Start Controlling Them.
          </span>
        </h2>

        <p className="text-base text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join hundreds of businesses that transformed their customer communication. Start your free trial today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            to="/signup"
            className="group px-8 py-3 bg-primary-blue hover:bg-primary-lighter text-white rounded-lg font-semibold transition-all shadow-glow-md hover:shadow-glow-lg flex items-center gap-2"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={onOpenContact}
            className="px-8 py-3 bg-dark-surface hover:bg-dark-border text-white rounded-lg font-semibold transition-all border border-dark-border hover:border-primary-blue/50 flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Book a Demo
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
