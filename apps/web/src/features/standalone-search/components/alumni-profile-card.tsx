import { Link } from '@/components/standalone/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface AlumniProfileCardProps {
  ucn: string;
  name: string;
  profilePicture: string;
  description: React.ReactNode;
}

export const AlumniProfileCard = ({
  ucn,
  name,
  profilePicture,
  description,
}: AlumniProfileCardProps) => {
  return (
    <Link to={`/search/alumni/${ucn}`}>
      <div className="flex gap-4">
        <Avatar className="size-12">
          <AvatarImage src={profilePicture} alt={name} />
          <AvatarFallback className="text-lg bg-muted-foreground text-background">
            {name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="text-base font-medium">
            <span>{name}</span>
          </div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </Link>
  );
};
