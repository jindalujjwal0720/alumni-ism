import { Image } from '@/components/standalone/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/utils/tw';
import {
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
} from 'lucide-react';
import { MdCake } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import React from 'react';
import { convertDateToReadable } from '@/utils/time';

export const PublicProfile = () => {
  return (
    <div>
      <div className="relative">
        <div className="rounded-lg overflow-hidden m-2 h-24">
          <Image
            src="/pwa/default-profile-banner.jpg"
            fallback="/pwa/default-profile-banner.jpg"
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative -top-7 px-5 flex items-center gap-4">
          <Avatar className="size-16 ring-2 ring-offset-2 ring-border">
            <AvatarImage
              src="https://randomuser.me/api/portraits/men/42.jpg"
              alt="Avatar"
            />
            <AvatarFallback className="text-xl bg-muted text-muted-foreground">
              UJ
            </AvatarFallback>
          </Avatar>
          <h1 className="pt-6 flex gap-2">
            <span className="text-xl font-semibold">Ujjwal Jindal</span>
            <Flair flair="Admin" className="mt-0.5" />
          </h1>
        </div>
      </div>
      <div className="relative -top-3 flex flex-col px-5 gap-5">
        <p className="text-sm">
          Creative Director, Content Creator, Educator I make video content that
          engages minds, wins hearts, and builds audiences. I'm from the Los
          Angeles Metroplitan Area. I talk about all things design, creativity,
          leadership, content creation and personal developement-
        </p>
        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2">
            <Star size={16} className="text-primary fill-primary" />
            <div className="text-sm">
              <span className="font-medium mr-1">331</span>
              <span className="text-muted-foreground">Reputation</span>
            </div>
          </div>
          <div className="flex gap-2">
            <MdCake size={16} className="text-primary fill-primary" />
            <div className="text-sm">
              <span className="font-medium mr-1">
                {convertDateToReadable(new Date('1960-03-25'))}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <FaAddressCard size={16} className="text-primary fill-primary" />
            <div className="text-sm">
              <span className="text-muted-foreground">0100-0720-2025-1926</span>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-3">
          <Button className="w-full md:max-w-40 rounded-full" variant="default">
            Follow
          </Button>
          <Button className="rounded-full px-2" variant="outline" size="icon">
            <MoreHorizontal />
          </Button>
        </div> */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Career
            </h2>
            <div className="flex gap-4">
              <div className="size-10 rounded-md overflow-hidden flex items-center justify-center">
                <Image
                  src="https://www.google.com/s2/favicons?domain=https://salesforce.com&sz=128"
                  alt="Salesforce"
                  className="max-w-8 h-8"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Salesforce</span>
                <span className="text-sm text-muted-foreground">
                  Associate Member Technical Staff
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Education
            </h2>
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
                  B.Tech in Computer Science and Engineering (2018-2022)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">Contact</h2>
          <div className="pl-2 flex flex-col gap-3">
            <div className="flex gap-4">
              <Mail size={16} className="text-primary" />
              <span className="text-sm">temp-ujjwal@gmail.com</span>
            </div>
            <div className="flex gap-4">
              <Phone size={16} className="text-primary" />
              <span className="text-sm">+91 1234567890</span>
            </div>
            <div className="flex gap-4">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm">
                123, New Street, New City, New Country
              </span>
            </div>
            <div className="flex gap-4">
              <Linkedin size={16} className="text-primary" />
              <span className="text-sm">linkedin.com/in/jindalujjwal0720</span>
            </div>
            <div className="flex gap-4">
              <Twitter size={16} className="text-primary" />
              <span className="text-sm">twitter.com/jindalujjwal07</span>
            </div>
            <div className="flex gap-4">
              <Globe2 size={16} className="text-primary" />
              <span className="text-sm">
                jindalujjwal0720.github.io/portfolio
              </span>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-6">
          <p className="text-center">
            This profile is managed by the user and not by the organization.
          </p>
        </div>
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
