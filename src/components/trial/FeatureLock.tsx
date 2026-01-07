import { Lock } from 'lucide-react';
import { useState } from 'react';
import UpgradeModal from './UpgradeModal';

interface FeatureLockProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  locked?: boolean;
  blur?: boolean;
}

export default function FeatureLock({ title, description, children, locked = true, blur = true }: FeatureLockProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="relative">
        <div className={blur ? 'filter blur-sm pointer-events-none select-none' : ''}>
          {children}
        </div>
        <div className="absolute inset-0 bg-dark-surface/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-primary-blue/20 p-4 rounded-full mb-4">
            <Lock className="w-8 h-8 text-primary-blue" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 mb-6 max-w-md">{description}</p>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-6 py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all"
          >
            Upgrade to Unlock
          </button>
        </div>
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  );
}
