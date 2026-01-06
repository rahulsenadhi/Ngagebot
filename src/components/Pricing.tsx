import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Individual',
      description: 'For solo founders',
      price: 'Custom',
      features: [
        'AI replies across all channels',
        'Daily activity summaries',
        'Upload documents & data',
        'Basic escalation rules',
        'Email support',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Team',
      description: 'Add users & workflows',
      price: 'Custom',
      features: [
        'Everything in Individual',
        'Multiple team members',
        'Custom workflows',
        'Multi-language support',
        'Advanced analytics',
        'Priority support',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'Full control & scale',
      price: 'Custom',
      features: [
        'Everything in Team',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Advanced security & compliance',
        'SLA guarantees',
        'On-premise deployment option',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your business. Start with a free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-dark-surface border rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? 'border-electric-blue shadow-glow-md relative'
                  : 'border-dark-border hover:border-electric-blue/50 transition-all'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1 bg-electric-blue rounded-full text-white text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-electric-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block text-center py-4 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-electric-blue hover:bg-electric-cyan text-white shadow-glow-sm hover:shadow-glow-md'
                    : 'bg-dark-border hover:bg-electric-blue/20 text-white border border-dark-border hover:border-electric-blue/50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent"></div>
    </section>
  );
}
