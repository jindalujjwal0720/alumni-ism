import { QRCode } from '@/components/qr-code';
import { useGetMyAlumniDataQuery } from '../../api/alumni';
import { AlumniCard } from '../alumni-card';
import { AlumniDetailsForm } from './forms/alumni-details-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCard, QrCode } from 'lucide-react';

export const AlumniDetails = () => {
  const { data: { alumni } = {} } = useGetMyAlumniDataQuery(undefined);

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <Tabs defaultValue="card">
        <div className="flex gap-4 items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Alumni Details</h3>
            <p className="text-sm text-muted-foreground">
              Update your alumni details here and request verification.
            </p>
          </div>
          <TabsList>
            <TabsTrigger value="card">
              <IdCard size={24} />
            </TabsTrigger>
            <TabsTrigger value="qr">
              <QrCode size={24} />
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="card">
          <div className="w-full flex items-center justify-center">
            <AlumniCard
              name={alumni?.alias || 'Your Alias'}
              ucn={alumni?.ucn || 'xxxxxxxxxxxxxxxx'}
              expiry={alumni?.validity ?? '••/••'}
            />
          </div>
        </TabsContent>
        <TabsContent value="qr">
          <div className="w-full flex items-center justify-center">
            <QRCode value={window.location.origin + `/alumni/${alumni?.ucn}`} />
          </div>
        </TabsContent>
      </Tabs>
      <AlumniDetailsForm />
    </div>
  );
};
