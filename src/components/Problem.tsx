import { MessageSquareOff, Users, PhoneOff, Eye, AlertTriangle } from 'lucide-react';

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
    <section className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Sound Familiar?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Running a business shouldn't mean constantly putting out fires in customer communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-red-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-colors"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            These problems cost you money, reputation, and peace of mind.{' '}
            <span className="text-electric-cyan font-semibold">There's a better way.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
