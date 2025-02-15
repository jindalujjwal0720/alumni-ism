import {
  PageBody,
  PageContent,
  PageHeader,
  PageLayout,
  PageSidebar,
} from '@/components/better-page-layout';
import { AdminSidebar } from '@/features/admin/components/sidebar';
import Navbar from '@/features/navbar/components/navbar';
import { Route, Routes } from 'react-router-dom';
import { Partners } from './partners';
import { UnverifiedAlumni } from './unverified-alumni';
import { UnverifiedAlumniDetailsPage } from './unverified-alumni-details';
import { AlumniPaymentsPage } from './payments';
import { AlumniPaymentDetailsPage } from './payment-details';

export const AdminHome = () => {
  return (
    <PageLayout>
      <PageHeader>
        <Navbar />
      </PageHeader>
      <PageBody>
        <PageSidebar>
          <AdminSidebar />
        </PageSidebar>
        <PageContent>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/admins" element={<div>Admins</div>} />
            <Route path="/alumni">
              <Route path="" element={<div>Alumni</div>} />
              <Route path="unverified" element={<UnverifiedAlumni />} />
              <Route
                path="unverified/:id"
                element={<UnverifiedAlumniDetailsPage />}
              />
              <Route path="payments" element={<AlumniPaymentsPage />} />
              <Route
                path="payments/:id"
                element={<AlumniPaymentDetailsPage />}
              />
            </Route>
          </Routes>
        </PageContent>
      </PageBody>
    </PageLayout>
  );
};
