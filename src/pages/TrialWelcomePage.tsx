import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, Mail, MessageSquare, Phone, Headphones, FileText, Upload, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { generateDemoData } from '../lib/demoData';

const steps = ['Create Workspace', 'Connect Channels', 'Upload Data'];

const industries = [
  'E-commerce',
  'Healthcare',
  'Finance',
  'Real Estate',
  'Education',
  'Technology',
  'Hospitality',
  'Other',
];

const channels = [
  { id: 'email', name: 'Email', icon: Mail, available: true },
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageSquare, available: true },
  { id: 'sms', name: 'SMS', icon: Phone, available: true },
  { id: 'chat', name: 'Live Chat', icon: Headphones, available: true },
];

export default function TrialWelcomePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [workspaceName, setWorkspaceName] = useState('');
  const [industry, setIndustry] = useState('');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generateDemo, setGenerateDemo] = useState(true);
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (currentStep === 0) {
      if (!workspaceName || !industry) return;

      try {
        await supabase.from('user_profiles').upsert({
          id: user?.id,
          onboarding_completed: false,
        });

        const { data: workspace } = await supabase.from('workspaces').insert({
          user_id: user?.id,
          name: workspaceName,
          industry: industry,
        }).select().single();

        if (workspace) {
          setWorkspaceId(workspace.id);
        }

        setCurrentStep(1);
      } catch (error) {
        console.error('Error creating workspace:', error);
      }
    } else if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      await completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      if (generateDemo && workspaceId) {
        await generateDemoData(workspaceId);
      }

      await supabase.from('user_profiles').update({
        onboarding_completed: true,
      }).eq('id', user?.id);

      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <div className="border-b border-dark-border bg-dark-surface">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-gradient rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Ngagebot</span>
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step, idx) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                        idx <= currentStep
                          ? 'bg-blue-gradient text-white'
                          : 'bg-dark-surface text-gray-400 border border-dark-border'
                      }`}
                    >
                      {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span
                      className={`text-sm ${
                        idx <= currentStep ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 mb-8 ${
                        idx < currentStep ? 'bg-primary-blue' : 'bg-dark-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-2xl p-8">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 bg-primary-blue/20 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Create Your Workspace
                  </h2>
                  <p className="text-gray-400">
                    Set up your workspace to start managing customer conversations
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="My Company"
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Industry
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {industries.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => setIndustry(ind)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          industry === ind
                            ? 'border-primary-blue bg-primary-blue/20 text-primary-blue'
                            : 'border-dark-border bg-dark-bg text-gray-300 hover:border-gray-600'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 bg-primary-blue/20 rounded-full mb-4">
                    <MessageSquare className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Connect Your Channels
                  </h2>
                  <p className="text-gray-400">
                    Select the channels where you want to manage conversations
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`p-6 rounded-xl border transition-all ${
                        selectedChannels.includes(channel.id)
                          ? 'border-primary-blue bg-primary-blue/10'
                          : 'border-dark-border bg-dark-bg hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${
                            selectedChannels.includes(channel.id)
                              ? 'bg-primary-blue/20'
                              : 'bg-dark-surface'
                          }`}
                        >
                          <channel.icon
                            className={`w-6 h-6 ${
                              selectedChannels.includes(channel.id)
                                ? 'text-primary-blue'
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-white">{channel.name}</h3>
                          <p className="text-xs text-gray-400">
                            {channel.available ? 'Available' : 'Coming soon'}
                          </p>
                        </div>
                        {selectedChannels.includes(channel.id) && (
                          <Check className="w-5 h-5 text-primary-blue" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="bg-primary-blue/10 border border-primary-blue/30 rounded-lg p-4 text-sm text-gray-300">
                  <strong className="text-white">Note:</strong> You can configure channel integrations
                  later in Settings
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-flex p-3 bg-primary-blue/20 rounded-full mb-4">
                    <FileText className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Upload Your Data
                  </h2>
                  <p className="text-gray-400">
                    Add documents to help AI understand your business (optional)
                  </p>
                </div>

                <div className="border-2 border-dashed border-dark-border rounded-xl p-12 text-center hover:border-primary-blue/50 transition-all cursor-pointer bg-dark-bg">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Drag and drop files here
                  </h3>
                  <p className="text-gray-400 mb-4">
                    or click to browse (PDF, DOCX, TXT, XLSX)
                  </p>
                  <button className="px-6 py-2 bg-dark-surface border border-dark-border rounded-lg text-white hover:bg-dark-surface/50 transition-all">
                    Choose Files
                  </button>
                </div>

                <div className="bg-accent-green/10 border border-accent-green/30 rounded-lg p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={generateDemo}
                      onChange={(e) => setGenerateDemo(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-600 text-primary-blue focus:ring-primary-blue focus:ring-offset-dark-bg"
                    />
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        Generate sample conversations
                      </h3>
                      <p className="text-sm text-gray-300">
                        We'll create 5 sample conversations to help you explore Ngagebot's features
                        right away. You can delete these anytime.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="bg-primary-blue/10 border border-primary-blue/30 rounded-lg p-4 text-sm text-gray-300">
                  <strong className="text-white">Free Trial Limits:</strong> Up to 5 documents and 1 Excel file
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-dark-border">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border border-dark-border rounded-lg text-white hover:bg-dark-bg transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={currentStep === 0 && (!workspaceName || !industry)}
                className="ml-auto px-8 py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === 2 ? 'Start Using Ngagebot' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
