import { Link } from '@/components/standalone/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IndianRupee } from 'lucide-react';

export interface AlumniProfileCardProps {
  ucn: string;
  name: string;
  profilePicture: string;
  description: React.ReactNode;
  amountInINR: number;
}

export const AlumniDonationCard = ({
  ucn,
  name,
  profilePicture,
  description,
  amountInINR,
}: AlumniProfileCardProps) => {
  return (
    <Link to={`/search/alumni/${ucn}`}>
      <div className="flex gap-4">
        <Avatar className="size-10">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback className="text-lg bg-muted-foreground text-background">
            {name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full">
          <div className="text-base font-medium">
            <span>{name}</span>
          </div>
          <div className="text-sm text-muted-foreground italic">
            {description}
          </div>
          <div className="flex items-center justify-end gap-1 text-sm text-primary">
            <IndianRupee size={14} />
            <span>{amountInINR}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
