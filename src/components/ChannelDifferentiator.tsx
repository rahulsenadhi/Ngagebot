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
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/30 rounded-full text-electric-cyan text-sm font-medium">
              Game-Changing Feature
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            True Omni-Channel Intelligence
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Customer contacts you on one channel? Your AI can respond on any other channel automatically.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Customer Contacts Via</h3>
              <div className="grid grid-cols-2 gap-4">
                {inputChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-electric-blue/50 transition-all text-center group"
                  >
                    <channel.icon className={`w-10 h-10 ${channel.color} mx-auto mb-3`} />
                    <p className="text-white font-semibold">{channel.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-electric-blue/20 border-2 border-electric-blue rounded-full flex items-center justify-center animate-pulse-glow">
                <ArrowRight className="w-10 h-10 text-electric-cyan" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">AI Responds Via</h3>
              <div className="grid grid-cols-2 gap-4">
                {outputChannels.map((channel, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-electric-blue/10 to-electric-cyan/10 border border-electric-blue/50 rounded-xl p-6 hover:border-electric-cyan transition-all text-center group shadow-glow-sm"
                  >
                    <channel.icon className={`w-10 h-10 ${channel.color} mx-auto mb-3`} />
                    <p className="text-white font-semibold">{channel.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-electric-blue/10 to-electric-cyan/10 border border-electric-blue/30 rounded-2xl p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why This Matters
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Customer calls but you need to send them a document? AI sends it via email automatically.
              WhatsApp inquiry needs a follow-up? AI can call them back. This is true flexibility that matches how business actually works.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
