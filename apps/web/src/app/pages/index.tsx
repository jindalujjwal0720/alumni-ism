import { Route, Routes } from 'react-router-dom';
import Settings from './settings';
import Auth from './auth';
import ProtectedRoute from '@/features/auth/components/protected-route';
// import BenefitsPage from './alumni/benefits';
import { lazy, Suspense } from 'react';
import Loading from '@/components/loading';
import { AlumniLayout } from './alumni/layout';
import { AlumniDetailsPage } from './alumni/details';
import AlumniCardLanding from './alumni/landing';
import { PledgesAndDonationsPage } from './alumni/pledges-and-donations';
import { PublicAlumniProfilePage } from './public/alumni';

// Lazy load the admin and partner pages
const AdminHome = lazy(() =>
  import('./admin').then((module) => ({ default: module.AdminHome })),
);
const PartnerHome = lazy(() =>
  import('./partner').then((module) => ({ default: module.PartnerHome })),
);

const WebPages = () => {
  return (
    <Routes>
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
      <Route path="/partner/*" element={<ProtectedRoute roles={['partner']} />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <PartnerHome />
            </Suspense>
          }
        />
      </Route>
      <Route path="/*" element={<AlumniLayout />}>
        <Route path="" element={<AlumniCardLanding />} />

        <Route path="details" element={<AlumniDetailsPage />} />
        <Route path="donations" element={<PledgesAndDonationsPage />} />

        {/* <Route path="benefits" element={<BenefitsPage />} /> */}
        <Route path="settings/*" element={<ProtectedRoute />}>
          <Route path="*" element={<Settings />} />
        </Route>
      </Route>
      <Route path="/auth/*" element={<Auth />} />

      {/* Public routes: IMPORTANT: DO NOT REMOVE*/}
      <Route path="/p/*" element={<AlumniLayout />}>
        <Route path="alumni/:id" element={<PublicAlumniProfilePage />} />
      </Route>
    </Routes>
  );
};

export default WebPages;
