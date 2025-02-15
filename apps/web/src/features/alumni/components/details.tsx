import { Card, CardContent } from '@/components/ui/card';
import { useReadAlumniPublicDataQuery } from '../api/alumni';
import { AlumniCard } from './alumni-card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IdCard, QrCode } from 'lucide-react';
import { QRCode } from '@/components/qr-code';

export const AlumniPublicDetails = ({
  alumni: alumniId,
}: {
  alumni: string;
}) => {
  const { data: { alumni } = {}, isLoading } =
    useReadAlumniPublicDataQuery(alumniId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!alumni) {
    return <div>Alumni not found</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <Tabs defaultValue="card">
        <div className="flex gap-4 items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium">Alumni Public Details</h3>
            <p className="text-sm text-muted-foreground">
              View the public details of the alumni.
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
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Name</Label>
              <p>{alumni.name}</p>
            </div>
            <div>
              <Label>Alias (aka)</Label>
              <p>{alumni.alias}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Email</Label>
              <p>{alumni.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Professional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Company</Label>
              <p>{alumni.company}</p>
            </div>
            <div>
              <Label>Designation</Label>
              <p>{alumni.designation}</p>
            </div>
            <div>
              <Label>Location</Label>
              <p>{alumni.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="space-y-6">
          <h3 className="text-lg font-medium">Education Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Degree</Label>
              <p>{alumni.degree}</p>
            </div>
            <div>
              <Label>Branch</Label>
              <p>{alumni.branch}</p>
            </div>
            <div>
              <Label>Year of Graduation</Label>
              <p>{alumni.yearOfGraduation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
