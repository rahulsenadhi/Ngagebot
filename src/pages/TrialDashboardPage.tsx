import { useEffect, useState } from 'react';
import { MessageSquare, TrendingUp, Zap, Crown, ArrowRight, Clock, Upload } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TrialBanner from '../components/trial/TrialBanner';
import UsageBar from '../components/trial/UsageBar';
import UpgradeModal from '../components/trial/UpgradeModal';
import { useTrial } from '../contexts/TrialContext';
import { supabase } from '../lib/supabase';
import { Conversation } from '../types';
import { Link } from 'react-router-dom';

export default function TrialDashboardPage() {
  const { trialStatus, usageStats, workspace } = useTrial();
  const [recentConversations, setRecentConversations] = useState<Conversation[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const fetchRecentConversations = async () => {
      if (!workspace) return;

      const { data } = await supabase
        .from('conversations')
        .select('*')
        .eq('workspace_id', workspace.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) {
        setRecentConversations(data);
      }
    };

    fetchRecentConversations();
  }, [workspace]);

  const metrics = [
    {
      label: 'Conversations Today',
      value: usageStats?.conversationsToday || 0,
      icon: MessageSquare,
      color: 'blue',
      trend: '+12%',
    },
    {
      label: 'AI Handled',
      value: `${usageStats?.aiHandledPercentage || 0}%`,
      icon: Zap,
      color: 'green',
      trend: '+8%',
    },
    {
      label: 'Remaining Quota',
      value: `${(trialStatus?.limits.maxReplies || 20) - (usageStats?.repliesUsed || 0)}`,
      icon: TrendingUp,
      color: 'violet',
      subtext: 'manual replies left',
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <TrialBanner />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-dark-surface border border-dark-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    metric.color === 'blue'
                      ? 'bg-primary-blue/20'
                      : metric.color === 'green'
                      ? 'bg-accent-green/20'
                      : 'bg-accent-violet/20'
                  }`}
                >
                  <metric.icon
                    className={`w-6 h-6 ${
                      metric.color === 'blue'
                        ? 'text-primary-blue'
                        : metric.color === 'green'
                        ? 'text-accent-green'
                        : 'text-accent-violet'
                    }`}
                  />
                </div>
                {metric.trend && (
                  <span className="text-accent-green text-sm font-semibold">
                    {metric.trend}
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <p className="text-gray-400 text-sm">{metric.label}</p>
              {metric.subtext && (
                <p className="text-gray-500 text-xs mt-1">{metric.subtext}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/conversations"
                className="flex items-center justify-between p-4 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-blue/20 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">View Conversations</h3>
                    <p className="text-sm text-gray-400">Manage customer messages</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>

              <Link
                to="/business-brain"
                className="flex items-center justify-between p-4 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent-violet/20 rounded-lg">
                    <Upload className="w-5 h-5 text-accent-violet" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Upload Documents</h3>
                    <p className="text-sm text-gray-400">Train your AI assistant</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Trial Usage</h2>
            <div className="space-y-4">
              <UsageBar
                current={usageStats?.conversationsToday || 0}
                max={trialStatus?.limits.maxConversationsPerDay || 50}
                label="Conversations Today"
              />
              <UsageBar
                current={usageStats?.repliesUsed || 0}
                max={trialStatus?.limits.maxReplies || 20}
                label="Manual Replies"
              />
              <UsageBar
                current={usageStats?.documentsUploaded || 0}
                max={trialStatus?.limits.maxDocuments || 5}
                label="Documents Uploaded"
              />
              <UsageBar
                current={usageStats?.excelUploaded || 0}
                max={trialStatus?.limits.maxExcelFiles || 1}
                label="Excel Files"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-dark-surface border border-dark-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <Link
                to="/conversations"
                className="text-sm text-primary-blue hover:text-primary-light transition-colors"
              >
                View All
              </Link>
            </div>

            {recentConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">
                  No conversations yet
                </h3>
                <p className="text-gray-500 text-sm">
                  Your customer conversations will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center justify-between p-4 bg-dark-bg rounded-lg hover:bg-dark-bg/50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-blue/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{conv.customer_name}</h3>
                        <p className="text-sm text-gray-400">{conv.preview_text}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          conv.ai_handled
                            ? 'bg-accent-green/20 text-accent-green'
                            : 'bg-primary-blue/20 text-primary-blue'
                        }`}
                      >
                        {conv.ai_handled ? 'AI Handled' : 'Open'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(conv.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-primary-blue/20 to-accent-violet/20 border border-primary-blue/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-primary-blue" />
              <h2 className="text-xl font-bold text-white">Upgrade to Pro</h2>
            </div>
            <p className="text-gray-300 mb-6 text-sm">
              Unlock unlimited conversations, advanced AI features, and comprehensive reports
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                Unlimited replies
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                Unlimited documents
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                Advanced reports
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 bg-primary-blue rounded-full" />
                Priority support
              </li>
            </ul>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all"
            >
              View Plans
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              <Clock className="w-3 h-3 inline mr-1" />
              {trialStatus?.daysRemaining} days left in trial
            </p>
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </DashboardLayout>
  );
}
