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
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Trusted by Forward-Thinking Teams
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            See how businesses transformed their customer communication.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-primary-blue/50 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              <div>
                <p className="text-white font-semibold text-sm">{testimonial.author}</p>
                <p className="text-gray-400 text-xs">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
