import { Link2, Upload, Settings, Bot, BarChart3 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Link2,
      title: 'Connect your channels',
      description: 'Link WhatsApp, email, phone, and Telegram in minutes. No technical setup required.',
    },
    {
      number: '02',
      icon: Upload,
      title: 'Upload your information',
      description: 'Add your documents, FAQs, price lists, or connect your existing systems.',
    },
    {
      number: '03',
      icon: Settings,
      title: 'Set simple rules',
      description: 'Define when to escalate, how to respond, and what tone to use. Simple switches, no coding.',
    },
    {
      number: '04',
      icon: Bot,
      title: 'AI handles conversations',
      description: 'Your assistant starts working immediately, responding accurately across all channels.',
    },
    {
      number: '05',
      icon: BarChart3,
      title: 'You receive daily insights',
      description: 'Get a summary of all customer activity delivered to your preferred channel every morning.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get started in five simple steps. No technical expertise needed.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 bg-electric-blue/10 border-2 border-electric-blue rounded-2xl flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-electric-cyan" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-dark-surface border border-dark-border rounded-2xl p-8 hover:border-electric-blue/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block flex-shrink-0 w-px h-20 bg-gradient-to-b from-electric-blue to-transparent mx-auto"></div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-300 mb-8">
            Most customers are live and handling conversations within 24 hours.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
