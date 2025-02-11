import { cn } from '@/utils/tw';

const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ7kt9KQfrDnrsqSJplujymGADx_v11ucHA&s"
      alt="IIT Dhanbad Alumni Card"
      className={cn('h-10 w-10 object-contain', className)}
    />
  );
};

export default Logo;
