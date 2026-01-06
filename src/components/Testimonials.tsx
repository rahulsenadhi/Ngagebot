import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "We went from drowning in customer messages to having complete control. Our response time went from hours to seconds, and customers love it.",
      author: "Sarah Chen",
      role: "Founder",
      company: "TechFlow Solutions",
    },
    {
      quote: "Finally, I can see what's happening with customers without micromanaging. The daily summaries give me peace of mind and let me focus on growing the business.",
      author: "Michael Rodriguez",
      role: "CEO",
      company: "BrightPath Logistics",
    },
    {
      quote: "The omni-channel capability is brilliant. A customer calls with a question, and the AI sends them detailed documentation via email automatically. It just works.",
      author: "Emma Thompson",
      role: "Operations Director",
      company: "GlobalTrade Inc",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Trusted by Forward-Thinking Teams
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how businesses transformed their customer communication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-electric-blue/50 transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
