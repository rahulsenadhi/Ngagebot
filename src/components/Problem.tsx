import { MessageSquareOff, Users, PhoneOff, Eye } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      icon: MessageSquareOff,
      title: 'Customers message from everywhere',
      description: 'WhatsApp, email, phone calls, Telegram — your team is drowning in channels.',
    },
    {
      icon: Users,
      title: 'Teams give inconsistent answers',
      description: 'Different people say different things. Customers get confused. Trust gets damaged.',
    },
    {
      icon: PhoneOff,
      title: "Calls don't get logged",
      description: 'Customer conversations disappear. No one knows what was promised or discussed.',
    },
    {
      icon: Eye,
      title: 'Owners lack visibility',
      description: "You have no idea what's happening with your customers until it's too late.",
    },
  ];

  return (
    <section className="py-24 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Sound Familiar?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Running a business shouldn't mean constantly putting out fires in customer communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-electric-blue/50 transition-all group"
            >
              <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
                <problem.icon className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400 text-lg leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These problems cost you money, reputation, and peace of mind.{' '}
            <span className="text-electric-cyan font-semibold">There's a better way.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
