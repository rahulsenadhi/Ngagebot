import { Phone, Mail, MessageCircle, Send, ArrowRight } from 'lucide-react';

export default function ChannelDifferentiator() {
  const inputChannels = [
    { icon: Phone, name: 'Phone Call', color: 'text-green-400' },
    { icon: MessageCircle, name: 'WhatsApp', color: 'text-green-400' },
    { icon: Mail, name: 'Email', color: 'text-blue-400' },
    { icon: Send, name: 'Telegram', color: 'text-sky-400' },
  ];

  const outputChannels = [
    { icon: MessageCircle, name: 'WhatsApp', color: 'text-green-400' },
    { icon: Mail, name: 'Email', color: 'text-blue-400' },
    { icon: Send, name: 'Telegram', color: 'text-sky-400' },
    { icon: Phone, name: 'Phone', color: 'text-green-400' },
  ];

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-primary-lighter/10 border border-primary-lighter/30 rounded-full text-primary-lighter text-sm font-medium">
              Game-Changing Feature
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            True Omni-Channel Intelligence
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Customer contacts you on one channel? Your AI can respond on any other channel automatically.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-4 text-center">Customer Contacts Via</h3>
              <div className="grid grid-cols-2 gap-3">
                {inputChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="bg-dark-surface border border-dark-border rounded-lg p-4 hover:border-primary-blue/50 transition-all text-center group"
                  >
                    <channel.icon className={`w-8 h-8 ${channel.color} mx-auto mb-2`} />
                    <p className="text-white text-sm font-semibold">{channel.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary-blue/20 border-2 border-primary-blue rounded-full flex items-center justify-center animate-pulse-glow">
                <ArrowRight className="w-8 h-8 text-primary-lighter" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-4 text-center">AI Responds Via</h3>
              <div className="grid grid-cols-2 gap-3">
                {outputChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-primary-blue/10 to-primary-lighter/10 border border-primary-blue/50 rounded-lg p-4 hover:border-primary-lighter transition-all text-center group shadow-glow-sm"
                  >
                    <channel.icon className={`w-8 h-8 ${channel.color} mx-auto mb-2`} />
                    <p className="text-white text-sm font-semibold">{channel.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary-blue/10 to-primary-lighter/10 border border-primary-blue/30 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Why This Matters
            </h3>
            <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Customer calls but you need to send them a document? AI sends it via email automatically.
              WhatsApp inquiry needs a follow-up? AI can call them back. This is true flexibility that matches how business actually works.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
