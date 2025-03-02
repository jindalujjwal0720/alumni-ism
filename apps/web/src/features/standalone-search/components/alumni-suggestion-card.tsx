import { Link } from '@/components/standalone/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IAlumniSuggestion } from '../api/alumni';
import { Show } from '@/components/show';
import { Users } from 'lucide-react';

export interface AlumniSuggestionCardProps {
  suggestion:
    | IAlumniSuggestion
    | Omit<IAlumniSuggestion, 'mutualFollowers' | 'score'>;
}

export const AlumniSuggestionCard = ({
  suggestion,
}: AlumniSuggestionCardProps) => {
  const showProfession = suggestion.designation && suggestion.currentCompany;
  const showEducation = suggestion.degree && suggestion.branch;

  return (
    <Link to={`/search/alumni/${suggestion.ucn}`}>
      <div className="flex gap-4">
        <Avatar className="size-12">
          <AvatarImage src={suggestion.profilePicture} alt={suggestion.name} />
          <AvatarFallback className="text-lg bg-muted-foreground text-background">
            {suggestion.name[0]}
            {suggestion.name.split(' ')[1]?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="text-base font-medium">
            <span>{suggestion.name}</span>
          </div>
          <Show when={showProfession}>
            <div className="text-sm text-muted-foreground">
              {suggestion.designation} at {suggestion.currentCompany}
            </div>
          </Show>
          <Show when={showEducation}>
            <div className="text-sm text-muted-foreground">
              {suggestion.degree} in {suggestion.branch}
              <Show when={suggestion.yearOfGraduation}>
                {' '}
                ({suggestion.yearOfGraduation})
              </Show>
            </div>
          </Show>
          <Show
            when={
              'mutualFollowers' in suggestion && suggestion.mutualFollowers > 0
            }
          >
            <div className="text-sm text-muted-foreground mt-1">
              <Users size={16} className="inline-block -mt-1 mr-1" />
              {'mutualFollowers' in suggestion
                ? suggestion.mutualFollowers
                : 0}{' '}
              mutual followers
            </div>
          </Show>
        </div>
      </div>
    </Link>
  );
};
