import { DataTable } from '@/components/ui/data-table';
import { useListPartnersQuery } from '../../api/partners';
import { CreatePartnerDialog } from './create-partner-dialog';
import { Button } from '@/components/ui/button';
import useSearchParamState from '@/hooks/useSearchParamState';
import { EditPartnerDialog } from './edit-partner-dialog';
import { Link } from 'react-router-dom';

export const PartnersList = () => {
  const { data: { partners } = {} } = useListPartnersQuery(undefined);
  const [editPartnerId, setEditPartnerId, clearEditPartnerId] =
    useSearchParamState('edit-partner');

  return (
    <div>
      <DataTable
        columns={[
          {
            header: 'Contact name',
            accessorKey: 'name',
            cell: ({ row }) => {
              const partner = row.original;
              return (
                <span
                  onClick={() => {
                    setEditPartnerId(partner._id);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {partner.name}
                </span>
              );
            },
          },
          {
            header: 'Contact email',
            accessorKey: 'email',
          },
          {
            header: 'Name',
            cell: ({ row }) => {
              const partner = row.original;
              if (!partner.partnerData) {
                return <span className="text-muted-foreground">No data</span>;
              }
              return (
                <Link
                  target="_blank"
                  to={partner.partnerData.supportUrl}
                  className="hover:underline cursor-pointer"
                >
                  {partner.partnerData.name}
                </Link>
              );
            },
          },
          {
            header: 'Logo',
            cell: ({ row }) => {
              const partner = row.original;
              if (!partner.partnerData) {
                return <span className="text-muted-foreground">No data</span>;
              }
              return (
                <img
                  src={partner.partnerData.logo}
                  alt={partner.partnerData.name}
                  className="h-full max-h-6"
                />
              );
            },
          },
        ]}
        data={partners ?? []}
        title="Partners"
        header={() => {
          return (
            <div>
              <CreatePartnerDialog>
                <Button>Create Partner</Button>
              </CreatePartnerDialog>
            </div>
          );
        }}
      />
      <EditPartnerDialog
        partner={editPartnerId ?? ''}
        open={Boolean(editPartnerId)}
        onOpenChange={(open) => {
          if (!open) {
            clearEditPartnerId();
          }
        }}
      />
    </div>
  );
};
