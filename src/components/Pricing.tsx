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
    <section id="pricing" className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your business. Start with a free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-dark-surface border rounded-xl p-6 flex flex-col ${
                plan.popular
                  ? 'border-primary-blue shadow-glow-md relative'
                  : 'border-dark-border hover:border-primary-blue/50 transition-all'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="px-3 py-1 bg-primary-blue rounded-full text-white text-xs font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary-lighter flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`block text-center py-3 rounded-lg font-semibold transition-all text-sm ${
                  plan.popular
                    ? 'bg-primary-blue hover:bg-primary-lighter text-white shadow-glow-sm hover:shadow-glow-md'
                    : 'bg-dark-border hover:bg-primary-blue/20 text-white border border-dark-border hover:border-primary-blue/50'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
