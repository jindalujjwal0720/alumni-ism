import SidebarNav from '@/features/settings/components/sidebar-nav';
import { Routes, Route } from 'react-router-dom';
import Account from './account';
import Security from './security';
import Preferences from './preferences';
import SetupTwoFactorAuthentication from './security/setup-2fa';
import SetupAuthenticator from './security/setup-authenticator';
import UpdateRecoveryEmail from './security/update-recovery-email';
import RegenerateBackupCodes from './security/regenerate-backup-codes';
import { useSelector } from 'react-redux';
import { selectRole } from '@/features/auth/stores/auth';
import { AlumniDetails } from '@/features/alumni/components/settings/alumni-details';
import ProtectedRoute from '@/features/auth/components/protected-route';
import { useMemo } from 'react';
import { PledgesAndDonationsPage } from '../alumni/pledges-and-donations';
import { useIsMobile } from '@/hooks/useIsMobile';
import { ContactAndLicenses } from './contact-and-licenses';

const sidebarNavItems = [
  { href: '/settings', title: 'Account' },
  { href: '/settings/security', title: 'Security' },
  { href: '/settings/preferences', title: 'Preferences' },
  { href: '/settings/contacts', title: 'Contact & Licenses' },
];

const Settings = () => {
  const role = useSelector(selectRole);
  const isMobile = useIsMobile();
  const items = useMemo(() => {
    if (role === 'alumni' && !isMobile) {
      return [
        { href: '/settings/details', title: 'Alumni Details' },
        { href: '/settings/donations', title: 'Pledge & Donations' },
        { href: '/settings/payments', title: 'Payments' },
        ...sidebarNavItems,
      ];
    }
    return sidebarNavItems;
  }, [role, isMobile]);

  return (
    <div className="space-y-6 pt-5 pb-12 md:px-10 md:pb-16 md:block">
      <div className="space-y-0.5 px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
      </div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5 px-2">
          <SidebarNav items={items} />
        </aside>
        <div className="flex-1 w-full px-6">
          <Routes>
            <Route path="" element={<Account />} />
            {!isMobile && (
              <>
                <Route
                  path="/details"
                  element={<ProtectedRoute roles={['alumni']} />}
                >
                  <Route path="" element={<AlumniDetails />} />
                </Route>
                <Route
                  path="/donations"
                  element={<ProtectedRoute roles={['alumni']} />}
                >
                  <Route path="" element={<PledgesAndDonationsPage />} />
                </Route>
              </>
            )}
            <Route path="/security">
              <Route path="" element={<Security />} />
              <Route path="2fa" element={<SetupTwoFactorAuthentication />} />
              <Route path="authenticator" element={<SetupAuthenticator />} />
              <Route path="recovery/email" element={<UpdateRecoveryEmail />} />
              <Route
                path="recovery/codes"
                element={<RegenerateBackupCodes />}
              />
            </Route>
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/contacts" element={<ContactAndLicenses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Settings;
