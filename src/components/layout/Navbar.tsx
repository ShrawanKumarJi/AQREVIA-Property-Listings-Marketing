import React, { useState } from 'react';
import { useRouter } from '../../services/router';
import { useStore } from '../../services/useStore';
import { UserRole } from '../../types';
import { Menu, X, ArrowUpRight, Scale, Shield, User, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const store = useStore();
  const currentUser = store.getCurrentUser();
  const compareCount = store.getComparePropertyIds().length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const navLinks = [
    { label: 'Properties', path: '/properties' },
    { label: 'Projects', path: '/projects' },
    { label: 'For Business', path: '/for-business' },
    { label: 'Growth Services', path: '/services' },
    { label: 'Insights', path: '/resources' },
  ];

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'BUYER', label: 'Buyer / Tenant', desc: 'Browse, save, compare, book visits' },
    { role: 'PROPERTY_OWNER', label: 'Property Owner', desc: 'List & track your own properties' },
    { role: 'BROKER', label: 'Licensed Broker', desc: 'Manage client listings & enquiries' },
    { role: 'DEVELOPER', label: 'Developer / Builder', desc: 'Manage projects, leads & growth services' },
    { role: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full marketplace moderation & lead CRM' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E8E8E2] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text wordmark in display face */}
          <button
            onClick={() => router.navigate('/')}
            className="text-2xl font-bold tracking-tight text-[#121316] font-display hover:opacity-90 transition-opacity flex items-center gap-2 text-left"
          >
            <span>AQREVIA</span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-600">
            {navLinks.map((link) => {
              const isActive = router.path === link.path || (link.path !== '/' && router.path.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => router.navigate(link.path)}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#121316] font-semibold' : 'text-neutral-600 hover:text-[#121316]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E3A8A] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Compare Link with counter */}
            {compareCount > 0 && (
              <button
                onClick={() => router.navigate('/compare')}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-[#1E3A8A]/10 px-2.5 py-1 rounded transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({compareCount})</span>
              </button>
            )}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Persona Switcher Pill */}
            <button
              onClick={() => setRoleModalOpen(true)}
              className="text-xs font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-300 rounded px-2.5 py-1.5 flex items-center gap-1.5 transition-colors bg-white hover:bg-neutral-50"
              title="Click to simulate different platform roles"
            >
              <User className="w-3.5 h-3.5 text-neutral-500" />
              <span className="max-w-[100px] truncate">{currentUser.role.replace('_', ' ')}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {/* Primary CTA: List Property */}
            <button
              onClick={() => router.navigate('/list-property')}
              className="text-xs font-semibold text-neutral-800 hover:text-neutral-950 border border-neutral-300 hover:border-neutral-400 px-3.5 py-2 rounded transition-all whitespace-nowrap bg-white"
            >
              List Property
            </button>

            {/* Dashboard / Admin Portal */}
            <button
              onClick={() =>
                router.navigate(
                  currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'
                )
              }
              className="text-xs font-semibold text-white bg-[#121316] hover:bg-[#23252a] px-4 py-2 rounded transition-all flex items-center gap-1.5 whitespace-nowrap shadow-sm"
            >
              {currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? (
                <>
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <span>My Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </>
              )}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => router.navigate('/list-property')}
              className="text-xs font-semibold text-neutral-900 border border-neutral-300 px-2.5 py-1.5 rounded bg-white"
            >
              List
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-[#E8E8E2] bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.navigate(link.path);
                  }}
                  className="text-left py-2 text-sm font-medium text-neutral-800 hover:text-[#1E3A8A]"
                >
                  {link.label}
                </button>
              ))}
              {compareCount > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.navigate('/compare');
                  }}
                  className="text-left py-2 text-sm font-semibold text-[#1E3A8A]"
                >
                  Compare ({compareCount} properties)
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setRoleModalOpen(true);
                }}
                className="w-full text-left py-2 text-xs text-neutral-600 flex items-center justify-between"
              >
                <span>Active Persona: <strong>{currentUser.role.replace('_', ' ')}</strong></span>
                <span className="text-[#1E3A8A] font-medium">Switch</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.navigate(
                    currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'
                  );
                }}
                className="w-full text-center text-xs font-semibold text-white bg-[#121316] py-2.5 rounded"
              >
                {currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' ? 'Open Admin Panel' : 'My Workspace'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Role Switcher Modal (Allows testing all platform roles) */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-neutral-200 max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Switch User Persona</h3>
                <p className="text-xs text-neutral-500">Test AQREVIA under different perspective permissions</p>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 py-4">
              {roles.map((item) => {
                const isSelected = currentUser.role === item.role;
                return (
                  <button
                    key={item.role}
                    onClick={() => {
                      store.updateUserRole(item.role);
                      setRoleModalOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5 ring-1 ring-[#1E3A8A]'
                        : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{item.label}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{item.desc}</div>
                    </div>
                    {isSelected && (
                      <span className="text-[11px] font-semibold text-[#1E3A8A] mt-0.5">Active</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
