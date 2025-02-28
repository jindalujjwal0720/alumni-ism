import { Card, CardContent } from '@/components/ui/card';
import { AllAlumniPayments } from '@/features/admin/components/alumni/payments/list';

export const AlumniPaymentsPage = () => {
  return (
    <div className="p-6">
      <Card>
        <CardContent>
          <AllAlumniPayments />
        </CardContent>
      </Card>
    </div>
  );
};
