import { Calendar, TrendingUp, Clock, Users, Download, BarChart3 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TrialBanner from '../components/trial/TrialBanner';
import FeatureLock from '../components/trial/FeatureLock';
import { useTrial } from '../contexts/TrialContext';

export default function TrialReportsPage() {
  const { usageStats } = useTrial();

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <TrialBanner />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">
            Analyze your customer support performance and trends
          </p>
        </div>

        <div className="bg-dark-surface border border-dark-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Daily Summary</h2>
              <p className="text-gray-400 text-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <button className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white hover:bg-dark-bg/50 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-dark-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary-blue/20 rounded-lg">
                  <Users className="w-5 h-5 text-primary-blue" />
                </div>
                <span className="text-sm text-gray-400">Total Conversations</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {usageStats?.conversationsToday || 0}
              </div>
              <p className="text-xs text-accent-green mt-1">+12% from yesterday</p>
            </div>

            <div className="bg-dark-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-accent-green/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent-green" />
                </div>
                <span className="text-sm text-gray-400">AI Handled</span>
              </div>
              <div className="text-3xl font-bold text-white">
                {usageStats?.aiHandledPercentage || 0}%
              </div>
              <p className="text-xs text-accent-green mt-1">+8% from yesterday</p>
            </div>

            <div className="bg-dark-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-accent-violet/20 rounded-lg">
                  <Clock className="w-5 h-5 text-accent-violet" />
                </div>
                <span className="text-sm text-gray-400">Avg Response Time</span>
              </div>
              <div className="text-3xl font-bold text-white">2.5m</div>
              <p className="text-xs text-accent-green mt-1">-15% from yesterday</p>
            </div>

            <div className="bg-dark-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>
                <span className="text-sm text-gray-400">Satisfaction</span>
              </div>
              <div className="text-3xl font-bold text-white">4.8</div>
              <p className="text-xs text-gray-400 mt-1">out of 5.0</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-border">
            <h3 className="text-lg font-semibold text-white mb-4">Today's Activity</h3>
            <div className="h-48 flex items-end gap-2">
              {[30, 45, 38, 55, 48, 60, 52, 48, 42, 50, 45, 40].map((height, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary-blue/30 rounded-t hover:bg-primary-blue/50 transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">{idx + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Hours of the day</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <FeatureLock
            title="Weekly Reports"
            description="Upgrade to access weekly performance reports and trends"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Weekly Report</h2>
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-dark-bg rounded-lg" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-dark-bg rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">245</div>
                    <div className="text-xs text-gray-400">Conversations</div>
                  </div>
                  <div className="bg-dark-bg rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">82%</div>
                    <div className="text-xs text-gray-400">AI Handled</div>
                  </div>
                  <div className="bg-dark-bg rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">4.7</div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </FeatureLock>

          <FeatureLock
            title="Monthly Trends"
            description="Upgrade to view monthly performance trends and comparisons"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Monthly Trends</h2>
                <TrendingUp className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-dark-bg rounded-lg" />
                <div className="space-y-2">
                  {['Response Time', 'Resolution Rate', 'Customer Satisfaction'].map((metric) => (
                    <div key={metric} className="flex items-center justify-between p-2 bg-dark-bg rounded">
                      <span className="text-sm text-gray-400">{metric}</span>
                      <span className="text-sm text-gray-300">--</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FeatureLock>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeatureLock
            title="Custom Reports"
            description="Create custom reports with your preferred metrics and date ranges"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Custom Report Builder</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date Range</label>
                  <div className="h-10 bg-dark-bg rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Metrics</label>
                  <div className="h-10 bg-dark-bg rounded-lg" />
                </div>
                <button className="w-full py-2 bg-dark-bg rounded-lg text-gray-400">
                  Generate Report
                </button>
              </div>
            </div>
          </FeatureLock>

          <FeatureLock
            title="Channel Performance"
            description="Compare performance across different communication channels"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Channel Breakdown</h2>
              <div className="space-y-3">
                {['Email', 'WhatsApp', 'SMS', 'Live Chat'].map((channel) => (
                  <div key={channel} className="p-3 bg-dark-bg rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{channel}</span>
                      <span className="text-sm text-gray-400">--</span>
                    </div>
                    <div className="h-2 bg-dark-surface rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </FeatureLock>

          <FeatureLock
            title="AI Performance"
            description="Track AI accuracy, confidence scores, and learning progress"
            locked={true}
          >
            <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">AI Analytics</h2>
              <div className="space-y-3">
                <div className="p-3 bg-dark-bg rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">--</div>
                  <div className="text-xs text-gray-400">Accuracy Rate</div>
                </div>
                <div className="p-3 bg-dark-bg rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">--</div>
                  <div className="text-xs text-gray-400">Confidence Score</div>
                </div>
                <div className="p-3 bg-dark-bg rounded-lg">
                  <div className="text-2xl font-bold text-white mb-1">--</div>
                  <div className="text-xs text-gray-400">Learning Progress</div>
                </div>
              </div>
            </div>
          </FeatureLock>
        </div>
      </div>
    </DashboardLayout>
  );
}
