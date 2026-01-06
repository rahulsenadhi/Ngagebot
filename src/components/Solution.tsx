import { Ear, Database, MessageCircle, AlertCircle, Mail } from 'lucide-react';

export default function Solution() {
  const features = [
    {
      icon: Ear,
      title: 'Listens to customer questions',
      description: 'Understands what customers need across all channels in real-time.',
    },
    {
      icon: Database,
      title: 'Uses only your information',
      description: 'Replies are based strictly on your uploaded documents and business data.',
    },
    {
      icon: MessageCircle,
      title: 'Replies on the best channel',
      description: 'Automatically chooses the right channel to respond — or uses a different one if needed.',
    },
    {
      icon: AlertCircle,
      title: 'Escalates when needed',
      description: 'Recognizes complex situations and brings in your team at the right time.',
    },
    {
      icon: Mail,
      title: 'Sends you daily updates',
      description: 'Get a complete summary of customer activity delivered to you every day.',
    },
  ];

  return (
    <section id="solution" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/30 rounded-full text-electric-cyan text-sm font-medium">
              The Solution
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Your AI Business Assistant
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Think of it as your most reliable team member who never sleeps, never forgets, and always has the right answer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl p-8 hover:border-electric-blue/50 transition-all hover:shadow-glow-sm group"
            >
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
                <feature.icon className="w-6 h-6 text-electric-cyan" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-electric-blue/10 to-electric-cyan/10 border border-electric-blue/30 rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            The Result?
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your customers get instant, accurate answers. Your team focuses on what matters. You finally have complete visibility and control over every customer interaction.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
