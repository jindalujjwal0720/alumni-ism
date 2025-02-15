import { DataTable } from '@/components/ui/data-table';
import { useListUnverifiedAlumniQuery } from '../../api/alumni';
import { Link } from 'react-router-dom';

export const UnverifiedAlumniList = () => {
  const { data: { alumni } = {} } = useListUnverifiedAlumniQuery(undefined);

  return (
    <div>
      <DataTable
        columns={[
          {
            header: 'Name',
            accessorKey: 'name',
            cell: ({ row }) => {
              const { _id, name } = row.original;
              return (
                <Link
                  to={`/alumni/unverified/${_id}`}
                  className="hover:underline"
                >
                  {name}
                </Link>
              );
            },
          },
          {
            header: 'Alias',
            accessorKey: 'alias',
          },
          {
            header: 'Year of graduation',
            accessorKey: 'yearOfGraduation',
          },
          {
            header: 'Phone',
            accessorKey: 'phone',
          },
        ]}
        data={alumni ?? []}
        title="Unverified Alumni"
        // header={() => {
        //   return (
        //     <div>
        //       <CreatePartnerDialog>
        //         <Button>Create Partner</Button>
        //       </CreatePartnerDialog>
        //     </div>
        //   );
        // }}
      />
    </div>
  );
};
