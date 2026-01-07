export interface UserProfile {
  id: string;
  trial_start_date: string;
  trial_end_date: string;
  plan_type: 'trial' | 'starter' | 'growth' | 'enterprise';
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  workspace_id: string;
  customer_name: string;
  customer_email: string;
  channel: 'email' | 'whatsapp' | 'sms' | 'chat';
  status: 'open' | 'ai_handled' | 'manual_handled' | 'closed';
  ai_handled: boolean;
  preview_text: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  sender_type: 'customer' | 'ai' | 'agent';
  created_at: string;
}

export interface Document {
  id: string;
  workspace_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  document_type: 'document' | 'excel';
  created_at: string;
}

export interface UsageTracking {
  id: string;
  workspace_id: string;
  date: string;
  conversations_count: number;
  replies_count: number;
  documents_count: number;
  created_at: string;
  updated_at: string;
}

export interface TrialLimits {
  maxConversationsPerDay: number;
  maxReplies: number;
  maxDocuments: number;
  maxExcelFiles: number;
}

export interface TrialStatus {
  isActive: boolean;
  daysRemaining: number;
  trialEndDate: string;
  planType: string;
  limits: TrialLimits;
}

export interface UsageStats {
  conversationsToday: number;
  repliesUsed: number;
  documentsUploaded: number;
  excelUploaded: number;
  aiHandledPercentage: number;
}
