import { supabase } from './supabase';

export async function generateDemoData(workspaceId: string) {
  const demoConversations = [
    {
      workspace_id: workspaceId,
      customer_name: 'Sarah Johnson',
      customer_email: 'sarah.j@example.com',
      channel: 'email',
      status: 'ai_handled',
      ai_handled: true,
      preview_text: 'Hi, I need help with my recent order #12345...',
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      workspace_id: workspaceId,
      customer_name: 'Michael Chen',
      customer_email: 'mchen@example.com',
      channel: 'whatsapp',
      status: 'open',
      ai_handled: false,
      preview_text: 'Can you tell me about your pricing plans?',
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    },
    {
      workspace_id: workspaceId,
      customer_name: 'Emily Rodriguez',
      customer_email: 'emily.r@example.com',
      channel: 'chat',
      status: 'ai_handled',
      ai_handled: true,
      preview_text: 'What are your business hours?',
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    },
    {
      workspace_id: workspaceId,
      customer_name: 'David Thompson',
      customer_email: 'dthompson@example.com',
      channel: 'email',
      status: 'manual_handled',
      ai_handled: false,
      preview_text: 'I have a question about custom enterprise features...',
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      workspace_id: workspaceId,
      customer_name: 'Lisa Anderson',
      customer_email: 'lisa.a@example.com',
      channel: 'sms',
      status: 'ai_handled',
      ai_handled: true,
      preview_text: 'How do I reset my password?',
      created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { data: conversations, error: convError } = await supabase
    .from('conversations')
    .insert(demoConversations)
    .select();

  if (convError || !conversations) {
    console.error('Error creating demo conversations:', convError);
    return;
  }

  const demoMessages = conversations.flatMap((conv, idx) => {
    const baseMessages = [
      {
        conversation_id: conv.id,
        content: conv.preview_text,
        sender_type: 'customer',
        created_at: conv.created_at,
      },
    ];

    if (conv.ai_handled) {
      const aiResponses = [
        "Thank you for reaching out! I'd be happy to help you with that. Let me look into your order details right away.",
        'Our pricing plans start at $49/month for the Starter plan. Would you like me to provide more details about what each plan includes?',
        'We are available Monday through Friday from 9 AM to 6 PM EST, and Saturday from 10 AM to 4 PM EST. We are closed on Sundays.',
        'You can easily reset your password by clicking the "Forgot Password" link on the login page. Would you like me to send you a reset link?',
      ];

      baseMessages.push({
        conversation_id: conv.id,
        content: aiResponses[idx] || 'I understand your concern. Let me assist you with that right away.',
        sender_type: 'ai',
        created_at: new Date(new Date(conv.created_at).getTime() + 30000).toISOString(),
      });
    }

    return baseMessages;
  });

  const { error: msgError } = await supabase.from('messages').insert(demoMessages);

  if (msgError) {
    console.error('Error creating demo messages:', msgError);
  }

  const today = new Date().toISOString().split('T')[0];
  await supabase.from('usage_tracking').upsert({
    workspace_id: workspaceId,
    date: today,
    conversations_count: 5,
    replies_count: 2,
    documents_count: 0,
  }, {
    onConflict: 'workspace_id,date',
  });
}

export async function hasDemoData(workspaceId: string): Promise<boolean> {
  const { count } = await supabase
    .from('conversations')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', workspaceId);

  return (count || 0) > 0;
}
