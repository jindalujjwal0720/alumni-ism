import { Link, useParams } from 'react-router-dom';
import {
  useReadAlumniDataQuery,
  useRejectAlumniDataMutation,
  useVerifyAlumniDataMutation,
} from '../../api/alumni';
import KeyValueGrid from '@/components/key-value-grid';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/errors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlumniVerificationDocType,
  AlumniVerificationStatus,
} from '@/types/models/alumni';
import { useRef } from 'react';
import { Show } from '@/components/show';

export const UnverifiedAlumniDetails = () => {
  const { id } = useParams();
  const {
    data: {
      alumni,
      personal,
      contact,
      professional,
      education,
      verification,
    } = {},
    isLoading: isAlumniLoading,
  } = useReadAlumniDataQuery(id ?? '', {
    skip: !id,
  });
  const [verifyAlumni, { isLoading: isVerifying }] =
    useVerifyAlumniDataMutation();
  const [rejectAlumni, { isLoading: isRejecting }] =
    useRejectAlumniDataMutation();
  const rejectionReasonRef = useRef<HTMLInputElement>(null);

  const handleRejectAlumni = async () => {
    if (!id) return;
    try {
      await rejectAlumni({
        alumniId: id,
        rejectionReason: rejectionReasonRef.current?.value ?? '',
      }).unwrap();
      rejectionReasonRef.current!.value = '';
      toast.success('Alumni rejected successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleVerifyAlumni = async () => {
    if (!id) return;
    try {
      await verifyAlumni(id).unwrap();
      rejectionReasonRef.current!.value = '';
      toast.success('Alumni verified successfully');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isAlumniLoading) {
    return <div>Loading...</div>;
  }

  if (!alumni) {
    return <div>Alumni not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-medium">Alumni Details</h1>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Personal Information"
            data={personal || {}}
            keys={[
              { key: 'name', label: 'Name' },
              { key: 'alias', label: 'Alias' },
              { key: 'dob', label: 'Date of Birth' },
              { key: 'gender', label: 'Gender' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Contact Information"
            data={
              contact ?? {
                city: '',
                state: '',
                country: '',
                zip: '',
              }
            }
            keys={[
              { key: 'phone', label: 'Phone' },
              {
                key: 'currentAddress',
                label: 'Current Address',
                formatter: ({ row }) => {
                  const { city, state, country, zip } = row;
                  return `${city}, ${state}, ${country} - ${zip}`;
                },
              },
              { key: 'email', label: 'Email' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Academic Information"
            data={education || {}}
            keys={[
              { key: 'yearOfGraduation', label: 'Year of Graduation' },
              { key: 'branch', label: 'Branch' },
              { key: 'degree', label: 'Degree' },
              { key: 'admissionNumber', label: 'Admission Number' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Professional Information"
            data={professional || {}}
            keys={[
              { key: 'currentCompany', label: 'Company' },
              { key: 'designation', label: 'Designation' },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Verification Information"
            data={
              verification || {
                verificationDocType: '',
                verificationDocLink: '',
              }
            }
            keys={[
              {
                key: 'verificationDocType',
                label: 'Document type',
                formatter: ({ row }) => {
                  switch (row.verificationDocType) {
                    case AlumniVerificationDocType.PAN:
                      return 'PAN Card';
                    case AlumniVerificationDocType.AADHAR:
                      return 'Aadhar Card';
                    case AlumniVerificationDocType.DRIVING_LICENSE:
                      return 'Driving License';
                    case AlumniVerificationDocType.PASSPORT:
                      return 'Passport';
                    case AlumniVerificationDocType.VOTER_ID:
                      return 'Voter ID';
                    case AlumniVerificationDocType.OTHER:
                      return 'Other';
                    default:
                      return 'Unknown';
                  }
                },
              },
              {
                key: 'verificationDocLink',
                label: 'Document link',
                formatter: ({ row }) => {
                  return (
                    <Link
                      to={row.verificationDocLink}
                      target="_blank"
                      className="text-primary"
                    >
                      View Document
                    </Link>
                  );
                },
              },
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <KeyValueGrid
            title="Account Information"
            data={alumni || {}}
            keys={[
              { key: 'ucn', label: 'UCN' },
              {
                key: 'verificationStatus',
                label: 'Verification Status',
                formatter: ({ row }) => {
                  switch (row.verificationStatus) {
                    case AlumniVerificationStatus.PENDING:
                      return 'Pending';
                    case AlumniVerificationStatus.REJECTED:
                      return 'Rejected';
                    case AlumniVerificationStatus.VERIFIED:
                      return 'Verified';
                    default:
                      return 'Unknown';
                  }
                },
              },
              { key: 'rejectionReason', label: 'Rejection Reason' },
            ]}
          />
        </CardContent>
      </Card>
      <Show
        when={alumni.verificationStatus !== AlumniVerificationStatus.VERIFIED}
      >
        <Card>
          <CardContent>
            <div className="flex gap-4">
              <Input
                ref={rejectionReasonRef}
                placeholder="Enter reason for rejecting alumni"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleRejectAlumni}
                disabled={isRejecting || isVerifying}
              >
                {isRejecting || isVerifying ? 'Rejecting...' : 'Reject Alumni'}
              </Button>
              <Button
                variant="default"
                onClick={handleVerifyAlumni}
                disabled={isVerifying || isRejecting}
              >
                {isVerifying || isRejecting ? 'Verifying...' : 'Verify Alumni'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Show>
    </div>
  );
};
