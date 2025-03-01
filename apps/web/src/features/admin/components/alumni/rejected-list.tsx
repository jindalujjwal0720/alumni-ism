import { DataTable } from '@/components/ui/data-table';
import { useListRejectedAlumniQuery } from '../../api/alumni';
import { Link } from 'react-router-dom';

export const RejectedAlumniList = () => {
  const { data: { alumni } = {} } = useListRejectedAlumniQuery(undefined);

  return (
    <div>
      <DataTable
        columns={[
          {
            header: 'Name',
            accessorKey: 'personal.name',
            cell: ({ row }) => {
              const {
                _id,
                personal: { name },
              } = row.original;
              return (
                <Link to={`/admin/alumni/${_id}`} className="hover:underline">
                  {name}
                </Link>
              );
            },
          },
          {
            header: 'Year of graduation',
            accessorKey: 'education.yearOfGraduation',
          },
          {
            header: 'Email',
            accessorKey: 'contact.email',
          },
          {
            header: 'Phone',
            accessorKey: 'contact.phone',
          },
        ]}
        data={alumni ?? []}
        title="Rejected Alumni"
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
