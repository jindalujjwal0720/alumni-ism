import {
  PageBody,
  PageContent,
  PageHeader,
  PageLayout,
  PageSidebar,
} from '@/components/better-page-layout';
import Navbar from '@/features/navbar/components/navbar';
import { Route, Routes } from 'react-router-dom';
import { OffersPage } from './offers';
import { PartnerSidebar } from '@/features/partner/components/sidebar';
import { ValidatePage } from './validate';

export const PartnerHome = () => {
  return (
    <PageLayout>
      <PageHeader>
        <Navbar />
      </PageHeader>
      <PageBody>
        <PageSidebar>
          <PartnerSidebar />
        </PageSidebar>
        <PageContent>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/validate" element={<ValidatePage />} />
          </Routes>
        </PageContent>
      </PageBody>
    </PageLayout>
  );
};
