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
import { RejectedAlumni } from './rejected-alumni';

export const AdminHome = () => {
  return (
    <PageLayout>
      <PageHeader>
        <Navbar />
      </PageHeader>
      <PageBody>
        <PageSidebar className="bg-card">
          <AdminSidebar />
        </PageSidebar>
        <PageContent>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/admins" element={<div>Admins</div>} />
            <Route path="/alumni">
              <Route path="" element={<div>Alumni</div>} />
              <Route path=":id" element={<UnverifiedAlumniDetailsPage />} />
              <Route path="unverified" element={<UnverifiedAlumni />} />
              <Route path="rejected" element={<RejectedAlumni />} />
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
