import { User, Bell, Shield, CreditCard, Mail, MessageSquare, Phone, Headphones, Lock } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, workspace } = useTrial();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-blue/20 rounded-lg">
                <User className="w-6 h-6 text-primary-blue" />
              </div>
              <h2 className="text-xl font-bold text-white">Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Workspace Name</label>
                <input
                  type="text"
                  value={workspace?.name || ''}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Industry</label>
                <input
                  type="text"
                  value={workspace?.industry || ''}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white"
                />
              </div>

              <button className="px-6 py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all">
                Save Changes
              </button>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-violet/20 rounded-lg">
                <Bell className="w-6 h-6 text-accent-violet" />
              </div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-border rounded-full peer peer-checked:bg-primary-blue transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Trial Reminders</h3>
                  <p className="text-sm text-gray-400">Get notified about trial expiration</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-dark-border rounded-full peer peer-checked:bg-primary-blue transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-blue/20 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary-blue" />
              </div>
              <h2 className="text-xl font-bold text-white">Channel Integrations</h2>
            </div>

            <div className="space-y-3">
              {[
                { icon: Mail, name: 'Email', status: 'Available in paid plans', color: 'blue' },
                { icon: MessageSquare, name: 'WhatsApp', status: 'Available in paid plans', color: 'green' },
                { icon: Phone, name: 'SMS', status: 'Available in paid plans', color: 'violet' },
                { icon: Headphones, name: 'Live Chat', status: 'Available in paid plans', color: 'cyan' },
              ].map((channel) => (
                <div key={channel.name} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-${channel.color}-500/20 rounded-lg`}>
                      <channel.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{channel.name}</h3>
                      <p className="text-sm text-gray-400">{channel.status}</p>
                    </div>
                  </div>
                  <button
                    disabled
                    className="px-4 py-2 bg-dark-border/50 text-gray-500 rounded-lg font-medium flex items-center gap-2 cursor-not-allowed"
                  >
                    <Lock className="w-4 h-4" />
                    Locked
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-primary-blue/10 border border-primary-blue/30 rounded-lg text-sm text-gray-300">
              <strong className="text-white">Note:</strong> Channel integrations are available in Starter and higher plans. Upgrade to connect your channels.
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-green/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-accent-green" />
              </div>
              <h2 className="text-xl font-bold text-white">Plan & Billing</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-dark-bg rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Current Plan</span>
                  <span className="px-3 py-1 bg-primary-blue/20 text-primary-blue rounded-full text-sm font-semibold">
                    {profile?.plan_type || 'Trial'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Enjoy all features during your free trial period
                </p>
              </div>

              <button className="w-full py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all">
                Upgrade Plan
              </button>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Danger Zone</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg font-semibold hover:bg-red-500/20 transition-all">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
