import React from 'react';
import { LayoutDashboard, Receipt, Layers, Clock, ShieldAlert } from 'lucide-react';

export type NavTab = 'overview' | 'generator' | 'facets' | 'timeline' | 'audit';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'overview' as NavTab, label: 'Overview Ledger', icon: LayoutDashboard },
    { id: 'generator' as NavTab, label: 'Thermal Receipt Generator', icon: Receipt },
    { id: 'facets' as NavTab, label: 'The 3 Facets', icon: Layers },
    { id: 'timeline' as NavTab, label: 'Timeline Ledger', icon: Clock },
    { id: 'audit' as NavTab, label: 'Dataset Risk Audit', icon: ShieldAlert },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-label={`Switch to ${tab.label}`}
              aria-selected={isActive}
              role="tab"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.875rem 1.125rem',
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-accent-primary)' : 'var(--color-ink-secondary)',
                borderBottom: isActive ? '3px solid var(--color-accent-primary)' : '3px solid transparent',
                borderRadius: '0',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
