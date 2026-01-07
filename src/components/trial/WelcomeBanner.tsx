import { useState } from 'react';
import { X, Rocket, MessageSquare, Database, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: MessageSquare,
    title: 'Check out your conversations',
    description: 'View sample conversations and see how AI handles customer queries',
    link: '/conversations',
    color: 'blue',
  },
  {
    icon: Database,
    title: 'Upload your business data',
    description: 'Add documents to train your AI assistant with your knowledge',
    link: '/business-brain',
    color: 'violet',
  },
  {
    icon: BarChart3,
    title: 'Explore reports',
    description: 'See how analytics can help you understand customer interactions',
    link: '/reports',
    color: 'green',
  },
];

export default function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('welcomeBannerDismissed') === 'true';
  });

  const handleDismiss = () => {
    localStorage.setItem('welcomeBannerDismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-br from-primary-blue/10 to-accent-violet/10 border border-primary-blue/30 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-gradient rounded-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to your free trial!</h2>
            <p className="text-gray-300 text-sm">
              Get started with these quick steps to explore Ngagebot
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, idx) => (
          <Link
            key={idx}
            to={step.link}
            className="group p-4 bg-dark-surface/50 border border-dark-border rounded-lg hover:border-primary-blue/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  step.color === 'blue'
                    ? 'bg-primary-blue/20'
                    : step.color === 'violet'
                    ? 'bg-accent-violet/20'
                    : 'bg-accent-green/20'
                }`}
              >
                <step.icon
                  className={`w-5 h-5 ${
                    step.color === 'blue'
                      ? 'text-primary-blue'
                      : step.color === 'violet'
                      ? 'text-accent-violet'
                      : 'text-accent-green'
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1 group-hover:text-primary-blue transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
