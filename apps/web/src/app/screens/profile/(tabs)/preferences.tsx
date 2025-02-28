import { PublicProfilePreferencesForm } from '@/features/standalone-profile/components/forms/public-profile-preferences';
import { VerificationDetailsForm } from '@/features/standalone-profile/components/forms/verification';

export const PreferencesScreenContent = () => {
  return (
    <div className="space-y-6 p-4">
      <VerificationDetailsForm />
      <PublicProfilePreferencesForm />
    </div>
  );
};
