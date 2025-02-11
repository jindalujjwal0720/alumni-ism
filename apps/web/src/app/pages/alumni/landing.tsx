import { AlumniFooter } from '@/features/alumni/components/footer';
import { AlumniDonationsSection } from '@/features/alumni/components/landing/donation';
import { AlumniFAQSection } from '@/features/alumni/components/landing/faq';
import { AlumniHeroSection } from '@/features/alumni/components/landing/hero';
import { AlumniNavigation } from '@/features/alumni/components/landing/nav';
import { AlumniBrandPartnersSection } from '@/features/alumni/components/landing/partners';
import { AlumniPricingSection } from '@/features/alumni/components/landing/pricing';
import { AlumniStatsSection } from '@/features/alumni/components/landing/stats';
import { AlumniTestimonialsSection } from '@/features/alumni/components/landing/testimonials';
import { AlumniValuePropositionSection } from '@/features/alumni/components/landing/value-proposition';

const AlumniCardLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/10">
      <AlumniNavigation />
      <AlumniHeroSection />
      <AlumniStatsSection />
      <div id="benefits">
        <AlumniBrandPartnersSection />
        <AlumniValuePropositionSection />
      </div>
      <AlumniTestimonialsSection />
      <AlumniPricingSection />
      <AlumniDonationsSection />
      <AlumniFAQSection />
      <AlumniFooter />
    </div>
  );
};

export default AlumniCardLanding;
