import { BarChart3, Clock, MessageCircle, Mail, Send, Globe } from 'lucide-react';

export default function DailyIntelligence() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Daily Intelligence Delivered to You
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Wake up every morning knowing exactly what happened with your customers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary-lighter" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Complete Activity Summary
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Total conversations, common questions, sentiment trends, and escalations that needed attention.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-lighter" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Delivered Every Morning
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Choose your preferred time. Get your summary before your first coffee.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary-lighter" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Auto-Translated to Your Language
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Customers speak many languages? Your summary comes in the language you prefer.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-2xl p-6 shadow-glow-md">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">Choose Your Delivery Method</h3>
              <p className="text-gray-400 text-sm">Pick the channel that works best for you.</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 bg-dark-bg border border-dark-border rounded-lg hover:border-primary-blue/50 transition-all cursor-pointer">
                <MessageCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-white font-semibold text-sm">WhatsApp</p>
                  <p className="text-xs text-gray-400">Get your summary via WhatsApp message</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-dark-bg border border-dark-border rounded-lg hover:border-primary-blue/50 transition-all cursor-pointer">
                <Mail className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-white font-semibold text-sm">Email</p>
                  <p className="text-xs text-gray-400">Receive a detailed email report</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-dark-bg border border-dark-border rounded-lg hover:border-primary-blue/50 transition-all cursor-pointer">
                <Send className="w-6 h-6 text-sky-400" />
                <div>
                  <p className="text-white font-semibold text-sm">Telegram</p>
                  <p className="text-xs text-gray-400">Quick summary via Telegram</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
