import { ChevronDown, LogOut, User, Crown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTrial } from '../../contexts/TrialContext';
import { useNavigate } from 'react-router-dom';
import UpgradeModal from '../trial/UpgradeModal';

export default function TopNav() {
  const { user, signOut } = useAuth();
  const { workspace, trialStatus } = useTrial();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <>
      <div className="h-16 bg-dark-surface border-b border-dark-border px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {workspace?.name || 'My Workspace'}
            </h2>
            <p className="text-xs text-gray-400">{workspace?.industry || 'Getting started'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {trialStatus?.isActive && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-dark-bg border border-primary-blue/30 rounded-lg text-sm hover:bg-dark-bg/50 transition-all"
            >
              <Crown className="w-4 h-4 text-primary-blue" />
              <span className="text-white font-medium">
                {trialStatus.daysRemaining} days left in trial
              </span>
              <span className="px-2 py-0.5 bg-blue-gradient text-xs text-white rounded-full font-semibold">
                Upgrade
              </span>
            </button>
          )}

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all"
            >
              <div className="w-8 h-8 bg-primary-blue/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-blue" />
              </div>
              <span className="text-sm text-white">{user?.email?.split('@')[0]}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-xl py-1 z-10">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-dark-bg flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  );
}
