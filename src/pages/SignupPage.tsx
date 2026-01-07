import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState<'free' | 'paid'>('free');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            plan,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('This email is already registered.');
        } else {
          setError(signUpError.message);
        }
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/welcome');
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-dark-bg to-black relative overflow-hidden flex items-center justify-center px-4">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-md w-full">
          <div className="bg-dark-surface/50 backdrop-blur-sm border border-dark-border rounded-2xl p-8 text-center shadow-glow-md">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-blue/10 to-accent-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent-cyan" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Account Created Successfully!</h2>
            <p className="text-gray-400 mb-6">
              Welcome to Ngagebot! Redirecting you to onboarding...
            </p>
            <div className="inline-block px-6 py-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-dark-bg to-black relative overflow-hidden flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white mb-6 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-light rounded-lg flex items-center justify-center shadow-glow-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-lighter to-accent-cyan">
              Ngagebot
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400">Start managing customer communications smarter</p>
        </div>

        <div className="bg-dark-surface/50 backdrop-blur-sm border border-dark-border rounded-2xl p-8 shadow-glow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="••••••••"
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose Your Plan
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlan('free')}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    plan === 'free'
                      ? 'border-primary-blue bg-primary-blue/10'
                      : 'border-dark-border bg-dark-bg hover:border-dark-border/80'
                  }`}
                >
                  <div className="text-center">
                    <Sparkles className={`w-6 h-6 mx-auto mb-2 ${plan === 'free' ? 'text-primary-lighter' : 'text-gray-400'}`} />
                    <p className="font-semibold text-white mb-1">Free Trial</p>
                    <p className="text-xs text-gray-400">14 days free</p>
                  </div>
                  {plan === 'free' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPlan('paid')}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    plan === 'paid'
                      ? 'border-primary-blue bg-primary-blue/10'
                      : 'border-dark-border bg-dark-bg hover:border-dark-border/80'
                  }`}
                >
                  <div className="text-center">
                    <Bot className={`w-6 h-6 mx-auto mb-2 ${plan === 'paid' ? 'text-primary-lighter' : 'text-gray-400'}`} />
                    <p className="font-semibold text-white mb-1">Paid Plan</p>
                    <p className="text-xs text-gray-400">Full access</p>
                  </div>
                  {plan === 'paid' && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-primary-blue to-primary-light hover:from-primary-light hover:to-accent-cyan text-white rounded-lg font-semibold transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-lighter hover:text-accent-cyan transition-colors font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
