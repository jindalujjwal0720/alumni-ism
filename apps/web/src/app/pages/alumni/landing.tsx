import { useGetMyAlumniDataQuery } from '@/features/alumni/api/alumni';
import { AlumniFooter } from '@/features/alumni/components/footer';
import { AlumniDonationsSection } from '@/features/alumni/components/landing/donation';
import { AlumniFAQSection } from '@/features/alumni/components/landing/faq';
import { AlumniHeroSection } from '@/features/alumni/components/landing/hero';
import { AlumniNavigation } from '@/features/alumni/components/landing/nav';
// import { AlumniBrandPartnersSection } from '@/features/alumni/components/landing/partners';
import { AlumniPricingSection } from '@/features/alumni/components/landing/pricing';
// import { AlumniStatsSection } from '@/features/alumni/components/landing/stats';
// import { AlumniTestimonialsSection } from '@/features/alumni/components/landing/testimonials';
import { AlumniValuePropositionSection } from '@/features/alumni/components/landing/value-proposition';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AlumniCardLanding = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: { alumni } = {}, isLoading } = useGetMyAlumniDataQuery(
    undefined,
    {
      skip: !isAuthenticated,
    },
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/10 -mb-16">
      <AlumniNavigation />
      {isAuthenticated && !isLoading && (!alumni || !alumni.isVerified) && (
        <div className="bg-yellow-600 text-sm text-primary-foreground text-center p-3">
          Your alumni account is not verified. Please{' '}
          <Link to="/settings/alumni" className="underline">
            complete your profile and request verification
          </Link>
        </div>
      )}
      <AlumniHeroSection />
      {/* <AlumniStatsSection /> */}
      <div id="benefits">
        {/* <AlumniBrandPartnersSection /> */}
        <AlumniValuePropositionSection />
      </div>
      {/* <AlumniTestimonialsSection /> */}
      <AlumniPricingSection />
      <AlumniDonationsSection />
      <AlumniFAQSection />
      <AlumniFooter />
    </div>
  );
};

export default AlumniCardLanding;
