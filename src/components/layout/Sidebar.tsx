import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Database, BarChart3, Settings, Sparkles } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Conversations', href: '/conversations', icon: MessageSquare },
  { name: 'Business Brain', href: '/business-brain', icon: Database },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-dark-surface border-r border-dark-border h-screen flex flex-col">
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-gradient rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Ngagebot</h1>
            <p className="text-xs text-gray-400">AI Support Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-blue/20 text-primary-blue'
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-dark-border">
        <div className="bg-blue-gradient/10 border border-primary-blue/30 rounded-lg p-4">
          <p className="text-sm text-gray-300 mb-2">
            Need help getting started?
          </p>
          <button className="text-sm text-primary-blue hover:text-primary-light transition-colors font-semibold">
            View Documentation →
          </button>
        </div>
      </div>
    </div>
  );
}
