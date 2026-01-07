import { User, Bell, Shield, CreditCard, Mail, MessageSquare, Phone, Headphones, Link as LinkIcon, Check, X, Palette, Sun, Moon, Monitor } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';
import { useTrial } from '../contexts/TrialContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, workspace } = useTrial();
  const { theme, setTheme } = useTheme();
  const [channelStates, setChannelStates] = useState({
    email: false,
    whatsapp: false,
    sms: false,
    chat: false,
  });

  const toggleChannel = (channel: keyof typeof channelStates) => {
    setChannelStates(prev => ({ ...prev, [channel]: !prev[channel] }));
  };

  const themes = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Bright and clean interface' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto', icon: Monitor, description: 'Matches system preference' },
  ] as const;

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
                <Palette className="w-6 h-6 text-accent-violet" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Appearance</h2>
                <p className="text-sm text-gray-400 mt-1">Customize your interface theme</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themes.map((themeOption) => {
                const isSelected = theme === themeOption.value;
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => setTheme(themeOption.value)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-primary-blue bg-primary-blue/10'
                        : 'border-dark-border bg-dark-bg hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-primary-blue/20' : 'bg-dark-surface'
                        }`}
                      >
                        <themeOption.icon
                          className={`w-5 h-5 ${
                            isSelected ? 'text-primary-blue' : 'text-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{themeOption.label}</h3>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary-blue" />}
                    </div>
                    <p className="text-sm text-gray-400 ml-11">{themeOption.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent-green/20 rounded-lg">
                <Bell className="w-6 h-6 text-accent-green" />
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
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">Channel Integrations</h2>
                <p className="text-sm text-gray-400 mt-1">Connect your communication channels</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { id: 'email', icon: Mail, name: 'Email', description: 'Connect your email inbox', color: 'blue' },
                { id: 'whatsapp', icon: MessageSquare, name: 'WhatsApp Business', description: 'Integrate WhatsApp messaging', color: 'green' },
                { id: 'sms', icon: Phone, name: 'SMS', description: 'Enable text message support', color: 'violet' },
                { id: 'chat', icon: Headphones, name: 'Live Chat Widget', description: 'Add chat to your website', color: 'cyan' },
              ].map((channel) => {
                const isConnected = channelStates[channel.id as keyof typeof channelStates];
                return (
                  <div key={channel.name} className="p-4 bg-dark-bg rounded-lg border border-dark-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-primary-blue/20 rounded-lg`}>
                          <channel.icon className="w-5 h-5 text-primary-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{channel.name}</h3>
                          <p className="text-sm text-gray-400">{channel.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleChannel(channel.id as keyof typeof channelStates)}
                        className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                          isConnected
                            ? 'bg-accent-green/20 text-accent-green border border-accent-green/30'
                            : 'bg-primary-blue text-white hover:shadow-glow-sm'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <Check className="w-4 h-4" />
                            Connected
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-4 h-4" />
                            Connect
                          </>
                        )}
                      </button>
                    </div>
                    {isConnected && (
                      <div className="pl-11 space-y-2">
                        <div className="text-sm text-gray-400">
                          <span className="text-white font-medium">Status:</span> Active and receiving messages
                        </div>
                        <button
                          onClick={() => toggleChannel(channel.id as keyof typeof channelStates)}
                          className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          Disconnect
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 bg-primary-blue/10 border border-primary-blue/30 rounded-lg text-sm text-gray-300">
              <strong className="text-white">Trial Note:</strong> You can test all channels during your trial. Connected channels will continue working after upgrade.
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
