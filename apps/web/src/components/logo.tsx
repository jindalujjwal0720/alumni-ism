import { cn } from '@/utils/tw';

const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/centenary/logo.png"
      alt="IIT Dhanbad Alumni Card"
      className={cn('h-10 w-10 object-contain', className)}
    />
  );
};

export default Logo;
