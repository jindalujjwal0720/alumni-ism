import { Card, CardContent } from '@/components/ui/card';
import { RejectedAlumniList } from '@/features/admin/components/alumni/rejected-list';

export const RejectedAlumni = () => {
  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <RejectedAlumniList />
        </CardContent>
      </Card>
    </div>
  );
};
