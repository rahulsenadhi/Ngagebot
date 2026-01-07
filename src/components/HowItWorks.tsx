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
    <section id="how-it-works" className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            How It Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get started in five simple steps. No technical expertise needed.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-primary-blue/50 transition-all group text-center h-full flex flex-col">
                <div className="relative mb-4">
                  <div className="w-16 h-16 bg-primary-blue/10 border-2 border-primary-blue rounded-xl flex items-center justify-center mx-auto group-hover:bg-primary-blue/20 transition-colors">
                    <step.icon className="w-8 h-8 text-primary-lighter" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-primary-blue rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary-blue to-primary-blue/20"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-base text-gray-300">
            Most customers are live and handling conversations within 24 hours.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
