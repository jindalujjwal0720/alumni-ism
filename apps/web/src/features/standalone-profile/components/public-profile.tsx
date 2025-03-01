import { Image } from '@/components/standalone/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/tw';
import {
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  // MoreHorizontal,
  Phone,
  // Star,
  Twitter,
} from 'lucide-react';
import { MdCake } from 'react-icons/md';
import React from 'react';
import { convertDateToReadable } from '@/utils/time';
import { FaAddressCard } from 'react-icons/fa';
import {
  useReadPublicAlumniDetailsQuery,
  useReadPublicContactDetailsQuery,
  useReadPublicEducationDetailsQuery,
  useReadPublicPersonalDetailsQuery,
  useReadPublicProfessionalDetailsQuery,
} from '../api/public';
import { Skeleton } from '@/components/ui/skeleton';
import { Show } from '@/components/show';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/features/auth/stores/auth';
import { useGetMyAlumniDataQuery } from '@/features/alumni/api/alumni';
import { Link } from 'react-router-dom';
import { formatUcn } from '@/utils/ucn';

export interface PublicProfileProps {
  ucn: string;
}

const PublicProfileHeaderLoading = () => {
  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden m-2 h-24">
        <Skeleton className="size-full" />
      </div>
      <div className="relative -top-7 px-5 flex items-center gap-4">
        <Skeleton className="size-16 ring-2 ring-offset-2 ring-border rounded-full" />
        <h1 className="pt-6 flex gap-2">
          <Skeleton className="w-24 h-5" />
        </h1>
      </div>
    </div>
  );
};

export const PublicProfileHeader = ({ ucn }: PublicProfileProps) => {
  const { data: { details } = {}, isLoading } =
    useReadPublicPersonalDetailsQuery(ucn, {
      skip: !ucn,
    });

  if (isLoading) {
    return <PublicProfileHeaderLoading />;
  }

  if (!details) {
    return <PublicProfileHeaderLoading />;
  }

  return (
    <div className="relative">
      <div className="rounded-lg overflow-hidden m-2 h-24">
        <Image
          src={details?.bannerPicture}
          fallback="/pwa/default-profile-banner.jpg"
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative -top-7 px-5 flex items-center gap-4">
        <Avatar className="size-16 ring-2 ring-offset-2 ring-border">
          <AvatarImage src={details?.profilePicture} alt="Avatar" />
          <AvatarFallback className="text-xl bg-muted text-foreground">
            {details?.name[0]}
            {details?.name?.split(' ')[1]?.[0]}
          </AvatarFallback>
        </Avatar>
        <h1 className="pt-6 flex gap-2">
          <span className="text-xl font-semibold">{details?.name}</span>
          {/* <Flair flair="Admin" className="mt-0.5" /> */}
        </h1>
      </div>
    </div>
  );
};

const PublicProfileDescriptionAndStatsLoading = () => {
  return (
    <>
      <div className="space-y-3">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <Skeleton className="size-4" />
          <div className="text-sm">
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-4" />
          <div className="text-sm">
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="size-4" />
          <div className="text-sm">
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export const PublicProfileDescriptionAndStats = ({
  ucn,
}: PublicProfileProps) => {
  const { data: { details } = {}, isLoading } =
    useReadPublicPersonalDetailsQuery(ucn, { skip: !ucn });

  if (isLoading) {
    return <PublicProfileDescriptionAndStatsLoading />;
  }

  if (!details) {
    return <PublicProfileDescriptionAndStatsLoading />;
  }

  return (
    <>
      <p className="text-sm">
        {details?.bio || 'This user has not provided a bio yet.'}
      </p>
      <div className="flex gap-4 flex-wrap">
        {/* <div className="flex gap-2">
          <Star size={16} className="text-primary fill-primary" />
          <div className="text-sm">
            <span className="font-medium mr-1">331</span>
            <span className="text-muted-foreground">Reputation</span>
          </div>
        </div> */}
        <Show when={details?.dob}>
          <div className="flex items-center gap-2">
            <MdCake size={16} className="text-primary fill-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">
                {convertDateToReadable(details?.dob || '')}
              </span>
            </div>
          </div>
        </Show>
        <div className="flex items-center gap-2">
          <FaAddressCard size={16} className="text-primary fill-primary" />
          <div className="text-sm">
            <span className="text-muted-foreground">{formatUcn(ucn)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const PublicProfileActionsLoading = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="w-full h-10 rounded-full" />
      <Skeleton className="size-10 shrink-0 rounded-full" />
    </div>
  );
};

export const PublicProfileActions = ({ ucn }: PublicProfileProps) => {
  const { data: { alumni, isFollowing } = {}, isLoading } =
    useReadPublicAlumniDetailsQuery(ucn, { skip: !ucn });
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { data: { alumni: myAlumniDetails } = {} } = useGetMyAlumniDataQuery();

  if (isLoading) {
    return <PublicProfileActionsLoading />;
  }

  if (!alumni) {
    return <PublicProfileActionsLoading />;
  }

  return (
    <div className="flex gap-3">
      <Show when={isAuthenticated}>
        <Show when={myAlumniDetails?.ucn !== ucn}>
          <Show when={!isFollowing}>
            <Button className="w-full rounded-full" variant="default">
              Follow
            </Button>
          </Show>
          <Show when={isFollowing}>
            <Button className="w-full rounded-full" variant="outline">
              Unfollow
            </Button>
          </Show>
        </Show>
        <Show when={myAlumniDetails?.ucn === ucn}>
          <Link
            to="/profile/personal"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full rounded-full',
            )}
          >
            Edit Profile
          </Link>
        </Show>
      </Show>
      {/* <Button className="w-full rounded-full" variant="outline">
        Message
        </Button> */}
      {/* <Button className="rounded-full px-2" variant="outline" size="icon">
        <MoreHorizontal />
        </Button> */}
    </div>
  );
};

const PublicEducationDetailsLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-12 h-4" />
      <div className="flex gap-4">
        <Skeleton className="size-12 aspect-square rounded-md" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-2/3 h-3" />
        </div>
      </div>
    </div>
  );
};

export const PublicEducationDetails = ({ ucn }: PublicProfileProps) => {
  const { data: { details } = {}, isLoading } =
    useReadPublicEducationDetailsQuery(ucn, { skip: !ucn });

  if (isLoading) {
    return <PublicEducationDetailsLoading />;
  }

  if (!details) {
    return <PublicEducationDetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">Education</h2>
      <div className="flex gap-4">
        <div className="size-10 rounded-md overflow-hidden flex items-center justify-center">
          <Image
            src="/iit-ism-logo.png"
            alt="IIT ISM Dhanbad"
            className="max-w-8 h-8"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">IIT ISM Dhanbad</span>
          <span className="text-sm text-muted-foreground">
            {details?.degree} in {details?.branch} ({details?.yearOfGraduation})
          </span>
        </div>
      </div>
    </div>
  );
};

export const PublicCareerDetails = ({ ucn }: PublicProfileProps) => {
  const { data: { details } = {}, isLoading } =
    useReadPublicProfessionalDetailsQuery(ucn, { skip: !ucn });

  if (isLoading) {
    return <PublicEducationDetailsLoading />;
  }

  if (!details) {
    return <PublicEducationDetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">Career</h2>
      <div className="flex gap-4">
        <Show when={details?.currentCompanyWebsite}>
          <div className="size-10 rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src={`https://www.google.com/s2/favicons?domain=${details.currentCompanyWebsite}&sz=128`}
              alt="Salesforce"
              className="max-w-8 h-8"
            />
          </div>
        </Show>
        <div className="flex flex-col">
          <span className="font-medium">{details?.currentCompany}</span>
          <span className="text-sm text-muted-foreground">
            {details?.designation}
          </span>
        </div>
      </div>
    </div>
  );
};

const PublicContactDetailsLoading = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-12 h-4" />
      <div className="pl-2 flex flex-col gap-3">
        <div className="flex gap-4">
          <Skeleton className="size-5" />
          <Skeleton className="w-2/3 h-3" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="size-5" />
          <Skeleton className="w-2/3 h-3" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="size-5" />
          <Skeleton className="w-2/3 h-3" />
        </div>
      </div>
    </div>
  );
};

export const PublicContactDetails = ({ ucn }: PublicProfileProps) => {
  const { data: { details } = {}, isLoading } =
    useReadPublicContactDetailsQuery(ucn, { skip: !ucn });

  if (isLoading) {
    return <PublicContactDetailsLoading />;
  }

  if (!details) {
    return <PublicContactDetailsLoading />;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-medium text-muted-foreground">Contact</h2>
      <div className="pl-2 flex flex-col gap-3">
        <Show when={details.email}>
          <div className="flex gap-4">
            <Mail size={16} className="text-primary" />
            <span className="text-sm">{details?.email}</span>
          </div>
        </Show>
        <Show when={details.phone}>
          <div className="flex gap-4">
            <Phone size={16} className="text-primary" />
            <span className="text-sm">{details?.phone}</span>
          </div>
        </Show>
        <div className="flex gap-4">
          <MapPin size={16} className="text-primary" />
          <span className="text-sm">
            {[details?.city, details?.state, details?.country, details?.zip]
              .filter(Boolean)
              .join(', ')}
          </span>
        </div>
        <Show when={details.linkedin}>
          <div className="flex gap-4">
            <Linkedin size={16} className="text-primary" />
            <span className="text-sm">linkedin.com/in/{details.linkedIn}</span>
          </div>
        </Show>
        <Show when={details.twitter}>
          <div className="flex gap-4">
            <Twitter size={16} className="text-primary" />
            <span className="text-sm">twitter.com/{details.twitter}</span>
          </div>
        </Show>
        <Show when={details.website}>
          <div className="flex gap-4">
            <Globe2 size={16} className="text-primary" />
            <span className="text-sm">{details.website}</span>
          </div>
        </Show>
      </div>
    </div>
  );
};

export const PublicProfile = ({ ucn }: PublicProfileProps) => {
  return (
    <div>
      <PublicProfileHeader ucn={ucn} />
      <div className="relative -top-3 flex flex-col px-5 gap-5">
        <PublicProfileDescriptionAndStats ucn={ucn} />
        <PublicProfileActions ucn={ucn} />
        <PublicEducationDetails ucn={ucn} />
        <PublicCareerDetails ucn={ucn} />
        <PublicContactDetails ucn={ucn} />
      </div>
      <div className="text-xs text-muted-foreground mt-6">
        <p className="text-center">
          This profile is managed by the user and not by the organization.
        </p>
      </div>
    </div>
  );
};

const Flair = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { flair: string }
>(({ flair, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      {...props}
      className={cn(
        'h-min bg-primary/10 text-primary border-primary rounded-md px-1.5 py-0.5 text-xs text-light',
        className,
      )}
    >
      {flair}
    </span>
  );
});
Flair.displayName = 'Flair';
