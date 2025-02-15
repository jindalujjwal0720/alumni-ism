import { Route, Routes } from 'react-router-dom';
import Settings from './settings';
import Auth from './auth';
import ProtectedRoute from '@/features/auth/components/protected-route';
import BenefitsPage from './alumni/benefits';
import { useIsMobile } from '@/hooks/useIsMobile';
import { lazy, Suspense } from 'react';
import Loading from '@/components/loading';
import { AlumniMobileLayout } from './alumni/mobile-layout';
import { AlumniLayout } from './alumni/layout';
import { AlumniDetailsPage } from './alumni/details';
import { AlumniHome } from './alumni/home';
import AlumniCardLanding from './alumni/landing';
import { PledgesAndDonationsPage } from './alumni/pledges-and-donations';

// Lazy load the admin and partner pages
const AdminHome = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminHome })),
);
const PartnerHome = lazy(() =>
  import('./partner').then((module) => ({ default: module.PartnerHome })),
);

const Pages = () => {
  const isMobileDevice = useIsMobile();

  return (
    <Routes>
      {!isMobileDevice && (
        <>
          <Route path="/admin/*" element={<ProtectedRoute roles={['admin']} />}>
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <AdminHome />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="/partner/*"
            element={<ProtectedRoute roles={['partner']} />}
          >
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <PartnerHome />
                </Suspense>
              }
            />
          </Route>
        </>
      )}
      <Route
        path="/*"
        element={isMobileDevice ? <AlumniMobileLayout /> : <AlumniLayout />}
      >
        <Route
          path=""
          element={isMobileDevice ? <AlumniHome /> : <AlumniCardLanding />}
        />
        {isMobileDevice && (
          <>
            <Route path="details" element={<AlumniDetailsPage />} />
            <Route path="donations" element={<PledgesAndDonationsPage />} />
          </>
        )}
        <Route path="benefits" element={<BenefitsPage />} />
        <Route path="settings/*" element={<ProtectedRoute />}>
          <Route path="*" element={<Settings />} />
        </Route>
      </Route>
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default Pages;
