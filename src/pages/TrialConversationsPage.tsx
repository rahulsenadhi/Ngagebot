import { useEffect, useState } from 'react';
import { MessageSquare, Mail, Phone, Send, Lock, AlertCircle } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import TrialBanner from '../components/trial/TrialBanner';
import UpgradeModal from '../components/trial/UpgradeModal';
import { useTrial } from '../contexts/TrialContext';
import { supabase } from '../lib/supabase';
import { Conversation, Message } from '../types';

const channelIcons = {
  email: Mail,
  whatsapp: MessageSquare,
  sms: Phone,
  chat: MessageSquare,
};

export default function TrialConversationsPage() {
  const { workspace, usageStats, trialStatus, canUseFeature, refreshData } = useTrial();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'ai_handled'>('all');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [workspace, filter]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    if (!workspace) return;

    let query = supabase
      .from('conversations')
      .select('*')
      .eq('workspace_id', workspace.id)
      .order('updated_at', { ascending: false });

    if (filter === 'ai_handled') {
      query = query.eq('ai_handled', true);
    } else if (filter === 'unread') {
      query = query.eq('status', 'open');
    }

    const { data } = await query;
    if (data) {
      setConversations(data);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data);
    }
  };

  const handleSendReply = async () => {
    if (!selectedConversation || !newMessage.trim()) return;

    if (!canUseFeature('send_reply')) {
      setShowUpgradeModal(true);
      return;
    }

    setSending(true);
    try {
      await supabase.from('messages').insert({
        conversation_id: selectedConversation.id,
        content: newMessage,
        sender_type: 'agent',
      });

      const today = new Date().toISOString().split('T')[0];
      await supabase.from('usage_tracking').upsert({
        workspace_id: workspace?.id,
        date: today,
        replies_count: (usageStats?.repliesUsed || 0) + 1,
      }, {
        onConflict: 'workspace_id,date',
      });

      await supabase.from('conversations').update({
        status: 'manual_handled',
        updated_at: new Date().toISOString(),
      }).eq('id', selectedConversation.id);

      setNewMessage('');
      fetchMessages(selectedConversation.id);
      refreshData();
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setSending(false);
    }
  };

  const canSendReply = canUseFeature('send_reply');
  const repliesRemaining = (trialStatus?.limits.maxReplies || 20) - (usageStats?.repliesUsed || 0);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-dark-border">
          <TrialBanner />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Conversations</h1>
              <p className="text-gray-400">Manage all customer conversations in one place</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-surface rounded-lg border border-dark-border">
              <Send className="w-4 h-4 text-primary-blue" />
              <span className="text-sm text-gray-300">
                {repliesRemaining} replies remaining
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r border-dark-border flex flex-col">
            <div className="p-4 border-b border-dark-border">
              <div className="flex gap-2">
                {['all', 'unread', 'ai_handled'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f as typeof filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === f
                        ? 'bg-primary-blue/20 text-primary-blue'
                        : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : 'AI Handled'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">
                    No conversations
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Customer conversations will appear here
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-dark-border">
                  {conversations.map((conv) => {
                    const ChannelIcon = channelIcons[conv.channel];
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full p-4 text-left hover:bg-dark-bg transition-all ${
                          selectedConversation?.id === conv.id ? 'bg-dark-bg' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <ChannelIcon className="w-5 h-5 text-primary-blue" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-white truncate">
                                {conv.customer_name}
                              </h3>
                              <span className="text-xs text-gray-500">
                                {new Date(conv.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 truncate">
                              {conv.preview_text}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  conv.ai_handled
                                    ? 'bg-accent-green/20 text-accent-green'
                                    : 'bg-primary-blue/20 text-primary-blue'
                                }`}
                              >
                                {conv.ai_handled ? 'AI' : 'Open'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-dark-bg">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-dark-border bg-dark-surface">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-blue/20 rounded-full flex items-center justify-center">
                      {React.createElement(channelIcons[selectedConversation.channel], {
                        className: 'w-5 h-5 text-primary-blue',
                      })}
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">
                        {selectedConversation.customer_name}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {selectedConversation.customer_email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_type === 'agent' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-md px-4 py-3 rounded-lg ${
                          message.sender_type === 'agent'
                            ? 'bg-primary-blue text-white'
                            : message.sender_type === 'ai'
                            ? 'bg-accent-violet/20 text-white border border-accent-violet/30'
                            : 'bg-dark-surface text-white'
                        }`}
                      >
                        {message.sender_type === 'ai' && (
                          <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-3 h-3 text-accent-violet" />
                            <span className="text-xs text-accent-violet font-semibold">
                              AI Response
                            </span>
                          </div>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-dark-border bg-dark-surface">
                  {!canSendReply && (
                    <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-orange-400 font-semibold">
                          Reply limit reached
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Upgrade to send unlimited replies
                        </p>
                      </div>
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="ml-auto px-3 py-1 bg-orange-500 text-white rounded text-xs font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Upgrade
                      </button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendReply()}
                      placeholder={
                        canSendReply
                          ? 'Type your message...'
                          : 'Upgrade to send more replies'
                      }
                      disabled={!canSendReply || sending}
                      className="flex-1 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!canSendReply || !newMessage.trim() || sending}
                      className="px-6 py-3 bg-blue-gradient text-white rounded-lg font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {!canSendReply ? (
                        <Lock className="w-5 h-5" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      Send
                    </button>
                  </div>

                  {canSendReply && repliesRemaining <= 5 && (
                    <p className="text-xs text-orange-400 mt-2 text-center">
                      {repliesRemaining} replies remaining
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">
                    No conversation selected
                  </h3>
                  <p className="text-gray-500">
                    Select a conversation from the list to view messages
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </DashboardLayout>
  );
}
