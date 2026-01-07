import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { UserProfile, Workspace, TrialStatus, UsageStats, TrialLimits } from '../types';

interface TrialContextType {
  profile: UserProfile | null;
  workspace: Workspace | null;
  trialStatus: TrialStatus | null;
  usageStats: UsageStats | null;
  loading: boolean;
  refreshData: () => Promise<void>;
  canUseFeature: (feature: string) => boolean;
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

const TRIAL_LIMITS: TrialLimits = {
  maxConversationsPerDay: 50,
  maxReplies: 20,
  maxDocuments: 5,
  maxExcelFiles: 1,
};

export function TrialProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);

        const trialEnd = new Date(profileData.trial_end_date);
        const now = new Date();
        const daysRemaining = Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

        setTrialStatus({
          isActive: profileData.plan_type === 'trial' && daysRemaining > 0,
          daysRemaining,
          trialEndDate: profileData.trial_end_date,
          planType: profileData.plan_type,
          limits: TRIAL_LIMITS,
        });
      }

      const { data: workspaceData } = await supabase
        .from('workspaces')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (workspaceData) {
        setWorkspace(workspaceData);

        const today = new Date().toISOString().split('T')[0];
        const { data: usageData } = await supabase
          .from('usage_tracking')
          .select('*')
          .eq('workspace_id', workspaceData.id)
          .eq('date', today)
          .maybeSingle();

        const { data: conversations } = await supabase
          .from('conversations')
          .select('ai_handled')
          .eq('workspace_id', workspaceData.id);

        const aiHandledCount = conversations?.filter(c => c.ai_handled).length || 0;
        const totalConversations = conversations?.length || 0;
        const aiHandledPercentage = totalConversations > 0 ? Math.round((aiHandledCount / totalConversations) * 100) : 0;

        const { count: documentsCount } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .eq('workspace_id', workspaceData.id)
          .eq('document_type', 'document');

        const { count: excelCount } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .eq('workspace_id', workspaceData.id)
          .eq('document_type', 'excel');

        setUsageStats({
          conversationsToday: usageData?.conversations_count || 0,
          repliesUsed: usageData?.replies_count || 0,
          documentsUploaded: documentsCount || 0,
          excelUploaded: excelCount || 0,
          aiHandledPercentage,
        });
      }
    } catch (error) {
      console.error('Error fetching trial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const canUseFeature = (feature: string): boolean => {
    if (!trialStatus || !usageStats) return false;

    if (trialStatus.planType !== 'trial') return true;

    switch (feature) {
      case 'send_reply':
        return usageStats.repliesUsed < TRIAL_LIMITS.maxReplies;
      case 'upload_document':
        return usageStats.documentsUploaded < TRIAL_LIMITS.maxDocuments;
      case 'upload_excel':
        return usageStats.excelUploaded < TRIAL_LIMITS.maxExcelFiles;
      case 'advanced_reports':
      case 'weekly_reports':
      case 'custom_reports':
        return false;
      default:
        return true;
    }
  };

  return (
    <TrialContext.Provider
      value={{
        profile,
        workspace,
        trialStatus,
        usageStats,
        loading,
        refreshData: fetchData,
        canUseFeature,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
}

export function useTrial() {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
}
