import { Clock, X } from 'lucide-react';
import { useState } from 'react';
import { useTrial } from '../../contexts/TrialContext';
import UpgradeModal from './UpgradeModal';

export default function TrialBanner() {
  const { trialStatus } = useTrial();
  const [dismissed, setDismissed] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (!trialStatus?.isActive || dismissed) return null;

  const isUrgent = trialStatus.daysRemaining <= 3;

  return (
    <>
      <div
        className={`${
          isUrgent ? 'bg-orange-500/10 border-orange-500/30' : 'bg-primary-blue/10 border-primary-blue/30'
        } border rounded-lg p-4 mb-6 flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-full ${
              isUrgent ? 'bg-orange-500/20' : 'bg-primary-blue/20'
            }`}
          >
            <Clock className={`w-5 h-5 ${isUrgent ? 'text-orange-400' : 'text-primary-blue'}`} />
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {trialStatus.daysRemaining} day{trialStatus.daysRemaining !== 1 ? 's' : ''} remaining in your free trial
            </h3>
            <p className="text-gray-400 text-sm">
              Upgrade now to continue enjoying all features without interruption
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="px-6 py-2 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all"
          >
            Upgrade Now
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  );
}
