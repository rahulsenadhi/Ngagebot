import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How secure is my business data?',
      answer: 'Your data is encrypted at rest and in transit using industry-standard encryption. We never share your data with third parties, and you maintain complete ownership. You can export or delete your data at any time.',
    },
    {
      question: 'Can I control what the AI says?',
      answer: 'Absolutely. The AI only uses information you upload or connect. You set the tone, define escalation rules, and can review all conversations. If the AI doesn\'t know something, it will escalate to your team rather than guess.',
    },
    {
      question: 'Which languages are supported?',
      answer: 'The AI can communicate in over 50 languages and automatically detects the customer\'s language. Your daily summaries can be delivered in your preferred language, regardless of what language customers used.',
    },
    {
      question: 'Can I add team members?',
      answer: 'Yes. On Team and Enterprise plans, you can add multiple users with different permission levels. Team members can review conversations, update business information, and receive notifications.',
    },
    {
      question: 'Will the AI sound like my brand?',
      answer: 'Yes. During setup, you define the tone and personality you want. The AI adapts to match your brand voice — whether that\'s formal, casual, technical, or friendly.',
    },
    {
      question: 'What happens if the AI can\'t answer a question?',
      answer: 'The AI will immediately escalate to your team. You\'ll get a notification with the customer\'s question and context. The customer will be informed that a team member will follow up shortly.',
    },
  ];

  return (
    <section className="py-20 bg-dark-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-bg to-black opacity-50"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300">
            Everything you need to know about how it works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-dark-surface border border-dark-border rounded-xl overflow-hidden hover:border-primary-blue/50 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-semibold text-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-lighter flex-shrink-0 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-blue to-transparent"></div>
    </section>
  );
}
