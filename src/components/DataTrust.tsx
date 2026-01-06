import { FileText, Database, Shield, CheckCircle2 } from 'lucide-react';

export default function DataTrust() {
  const features = [
    {
      icon: FileText,
      title: 'Upload documents & Excel',
      description: 'Simply drag and drop your business information, price lists, or any documents.',
    },
    {
      icon: Database,
      title: 'Connect your systems',
      description: 'Integrate with your CRM, inventory, or any existing business system.',
    },
    {
      icon: Shield,
      title: 'AI answers from your data only',
      description: 'Every response is based strictly on the information you provided. Nothing else.',
    },
    {
      icon: CheckCircle2,
      title: 'No hallucinations',
      description: "If the AI doesn't know the answer, it escalates to your team instead of guessing.",
    },
  ];

  return (
    <section className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Your Data. Your AI.
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete control over what your AI knows and says. No surprises, no mistakes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 hover:border-electric-blue/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center group-hover:bg-electric-blue/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-electric-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">
            Security You Can Trust
          </h3>
          <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your business information is encrypted, never shared, and used exclusively for your customer conversations. You maintain full ownership and can export or delete anytime.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
