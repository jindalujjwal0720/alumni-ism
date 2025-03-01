import { Show } from '@/components/show';
import {
  ScreenContent,
  ScreenTitleBar,
} from '@/components/standalone/screen-layout';
import { setInitialized } from '@/features/auth/stores/auth';
import { useReadMyAlumniDetailsQuery } from '@/features/standalone-profile/api/details';
import { ContactDetailsForm } from '@/features/standalone-profile/components/forms/contact';
import { EducationDetailsForm } from '@/features/standalone-profile/components/forms/education';
import { PersonalDetailsForm } from '@/features/standalone-profile/components/forms/personal';
import { ProfessionalDetailsForm } from '@/features/standalone-profile/components/forms/professional';
import { VerificationDetailsForm } from '@/features/standalone-profile/components/forms/verification';
import { AlumniVerificationStatus } from '@/types/models/alumni';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const InitScreen = () => {
  const { data: { alumni } = {}, isLoading } =
    useReadMyAlumniDetailsQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // having a ucn means the user has already completed their profile
    // so we redirect them to the home screen
    if (
      alumni &&
      alumni.ucn &&
      alumni.verificationStatus === AlumniVerificationStatus.VERIFIED
    ) {
      console.log('Redirecting to home screen');
      // Redirect to the home screen
      dispatch(setInitialized(true));
      navigate('/');
    }
  }, [alumni, dispatch, navigate]);

  return (
    <>
      <Show when={isLoading}>Loading...</Show>
      <Show
        when={
          !isLoading &&
          (!alumni?.ucn ||
            alumni?.verificationStatus !== AlumniVerificationStatus.VERIFIED)
        }
      >
        <ScreenTitleBar title="Complete Your Profile" />
        <ScreenContent>
          <div className="space-y-4 p-4 pb-24">
            <div className="text-sm bg-primary/5 text-primary p-4 rounded-md space-y-2">
              <p>Please complete your profile to send it for verification.</p>
              <p>
                Note that you will be notified automatically once your profile
                is verified. This process usually takes 1-2 days.
              </p>
              <p>
                All fields are required. Please make sure to fill them
                accurately. You can always edit your profile later.
              </p>
            </div>
            <Show
              when={
                alumni?.rejectionReason &&
                alumni?.verificationStatus === AlumniVerificationStatus.REJECTED
              }
            >
              <div className="text-destructive bg-red-100 p-4 rounded-md">
                <p className="text-sm">
                  Your profile was rejected for the following reason:
                </p>
                <p className="font-medium">{alumni?.rejectionReason}</p>
                <p className="text-sm">
                  Let us know once you are done, via email (ariraa@iitism.ac.in)
                </p>
              </div>
            </Show>
            <PersonalDetailsForm minimal />
            <ContactDetailsForm minimal />
            <ProfessionalDetailsForm minimal />
            <EducationDetailsForm minimal />
            <VerificationDetailsForm />
            <div className="text-center text-sm bg-blue-100 text-blue-800 p-4 rounded-md">
              <p>
                Data is being saved automatically every 5 seconds. You can close
                this tab once you are done, and we will notify you once your
                profile is verified.
              </p>
            </div>
          </div>
        </ScreenContent>
      </Show>
    </>
  );
};
