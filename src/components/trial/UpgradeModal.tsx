import { X, Check, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      features: [
        'Unlimited conversations',
        'Unlimited manual replies',
        '20 documents',
        '5 Excel files',
        'Email + Chat support',
        'Weekly reports',
      ],
    },
    {
      name: 'Growth',
      price: '$99',
      popular: true,
      features: [
        'Everything in Starter',
        'Unlimited documents',
        'Unlimited Excel files',
        'All channels (WhatsApp, SMS)',
        'Advanced AI training',
        'Custom reports',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Growth',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Advanced security',
        'On-premise deployment',
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-surface border border-dark-border rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-dark-surface border-b border-dark-border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Upgrade Your Plan</h2>
            <p className="text-gray-400">Unlock all features and scale your customer support</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl p-6 border ${
                plan.popular
                  ? 'border-primary-blue bg-primary-blue/5'
                  : 'border-dark-border bg-dark-bg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-gradient px-4 py-1 rounded-full text-sm font-semibold text-white flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-400">/month</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-blue-gradient text-white hover:shadow-glow-md'
                    : 'bg-dark-border text-white hover:bg-dark-border/70'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-border p-6 bg-dark-bg">
          <p className="text-center text-gray-400 text-sm">
            All plans include a 14-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
