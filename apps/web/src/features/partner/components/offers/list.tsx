import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import useSearchParamState from '@/hooks/useSearchParamState';

import { useListOffersQuery } from '../../api/offers';
import { CreateOfferDialog } from './create-offer-dialog';
import { EditOfferDialog } from './edit-offer-dialog';

export const OffersList = () => {
  const { data: { offers } = {} } = useListOffersQuery(undefined);
  const [editOfferId, setEditOfferId, clearEditOfferId] =
    useSearchParamState('edit-offer');

  return (
    <div>
      <DataTable
        columns={[
          {
            header: 'Description',
            accessorKey: 'description',
            cell: ({ row }) => {
              const offer = row.original;
              return (
                <span
                  onClick={() => {
                    setEditOfferId(offer._id);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {offer.description}
                </span>
              );
            },
          },
        ]}
        data={offers ?? []}
        title="Offers"
        header={() => {
          return (
            <div>
              <CreateOfferDialog>
                <Button>Create Offer</Button>
              </CreateOfferDialog>
            </div>
          );
        }}
      />
      <EditOfferDialog
        offer={editOfferId ?? ''}
        open={Boolean(editOfferId)}
        onOpenChange={(open) => {
          if (!open) {
            clearEditOfferId();
          }
        }}
      />
    </div>
  );
};
