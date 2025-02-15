import { useReadAlumniPublicDataQuery } from '../api/alumni';

export const AlumniDetails = ({ alumni: alumniId }: { alumni: string }) => {
  const { data: { alumni } = {}, isLoading } =
    useReadAlumniPublicDataQuery(alumniId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!alumni) {
    return <div>Alumni not found</div>;
  }

  return (
    <div>
      <h1>{alumni.name}</h1>
      <p>{alumni.isVerified.toString()}</p>
    </div>
  );
};
