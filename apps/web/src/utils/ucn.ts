export const formatUcn = (ucn: string) => {
  return ucn.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
};
