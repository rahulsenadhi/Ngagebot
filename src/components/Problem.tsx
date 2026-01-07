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
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full mb-4 shadow-glow-sm">
            <AlertTriangle className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Sound Familiar?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Running a business shouldn't mean constantly putting out fires in customer communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-dark-surface/50 backdrop-blur-sm border border-dark-border rounded-xl p-6 hover:border-primary-light/50 transition-all hover:shadow-glow-md group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-blue/5 rounded-full blur-3xl group-hover:bg-primary-blue/10 transition-colors"></div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-blue/10 to-primary-light/20 rounded-lg flex items-center justify-center group-hover:from-primary-blue/20 group-hover:to-primary-light/30 transition-all">
                  <problem.icon className="w-6 h-6 text-primary-lighter" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            These problems cost you money, reputation, and peace of mind.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-lighter to-accent-cyan font-semibold">There's a better way.</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
