import { Card, CardContent } from '@/components/ui/card';
import { UnverifiedAlumniList } from '@/features/admin/components/alumni/unverified-list';

export const UnverifiedAlumni = () => {
  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <UnverifiedAlumniList />
        </CardContent>
      </Card>
    </div>
  );
};
