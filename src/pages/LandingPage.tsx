import { useState } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import HowItWorks from '../components/HowItWorks';
import ChannelDifferentiator from '../components/ChannelDifferentiator';
import DataTrust from '../components/DataTrust';
import DailyIntelligence from '../components/DailyIntelligence';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import ContactModal from '../components/ContactModal';

export default function LandingPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="bg-black min-h-screen">
      <Navigation onOpenContact={() => setIsContactModalOpen(true)} />
      <Hero onOpenContact={() => setIsContactModalOpen(true)} />
      <Problem />
      <Solution />
      <HowItWorks />
      <ChannelDifferentiator />
      <DataTrust />
      <DailyIntelligence />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenContact={() => setIsContactModalOpen(true)} />
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
