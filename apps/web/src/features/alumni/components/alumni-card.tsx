import { useState } from 'react';
import { FiWifi } from 'react-icons/fi';

interface AlumniCardProps {
  name: string;
  ucn: string;
  expiry: Date | string;
}

const formatExpiry = (expiry: Date | string) => {
  let expiryDate: Date;
  try {
    expiryDate = new Date(expiry);
  } catch {
    return '••/••';
  }
  const month = expiryDate.getMonth() + 1;
  const year = expiryDate.getFullYear().toString().slice(-2);
  return `${month.toString().padStart(2, '0')}/${year}`;
};

export const AlumniCard = ({ name, ucn, expiry }: AlumniCardProps) => {
  return (
    <div className="relative w-full max-w-[500px] transition-all duration-200 ease-out">
      {/* Card Front */}
      <div className="flex flex-col justify-between p-6 sm:p-8 w-full aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-md md:shadow-2xl overflow-hidden transition-all duration-200 ease-out">
        {/* Matte Finish Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* EMV Chip */}
            <div className="w-9 h-7 sm:w-12 sm:h-10 bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 rounded-md overflow-hidden">
              <div className="w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.15)_50%)] bg-stripes-sm" />
            </div>

            {/* Contactless Symbol */}
            <div className="text-muted-foreground">
              <FiWifi className="size-6 sm:size-8 transform rotate-90" />
            </div>
          </div>

          {/* Holographic Strip */}
          <div className="space-x-2">
            <img
              src="/centenary/logo.png"
              alt="centenary"
              className="size-11 sm:size-14"
            />
          </div>
        </div>

        {/* Card Details */}
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="font-mono sm:text-lg text-white/90 tracking-wider">
            {ucn.slice(0, 4)} {ucn.slice(4, 8)} {ucn.slice(8, 12)}{' '}
            {ucn.slice(12, 16)}
          </p>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
              Card Holder
            </p>
            <p className="text-sm sm:text-base font-medium text-white tracking-wider uppercase">
              {name}
            </p>
          </div>
          <div className="text-sm sm:text-base flex justify-between items-end">
            <div className="text-white/90 font-medium tracking-widest">
              IIT DHANBAD
            </div>
            <div className="text-muted-foreground text-sm">
              VALID THRU
              <span className="ml-2 font-mono text-primary-foreground">
                {formatExpiry(expiry)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlumniPremiumCardWrapper = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation values based on mouse position
    const rotateY = (x / rect.width - 0.5) * 30;
    const rotateX = (y / rect.height - 0.5) * -30;

    // Calculate glare position
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <div className="flex items-center justify-center min-h-[400px] md:p-8">
      {/* Perspective container */}
      <div
        className="relative w-full max-w-[500px] transition-all duration-200 ease-out"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Card container */}
        <div
          className="flex flex-col justify-between w-full aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden transition-all duration-200 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* <AlumniCard
            name="Ujjwal Jindal"
            ucn="••••••••••••2025"
            expiry={new Date(2025, 11)}
          /> */}
          <img
            src="/silver-card-front.png"
            alt="Silver Alumni Card"
            className="object-cover"
          />

          {/* Decorative Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%)] bg-stripes-xl opacity-20" />
          </div>
        </div>

        {/* Enhanced Card Shadow */}
        <div
          className="absolute -inset-6 rounded-[30rem] blur-6xl transition-all duration-200 -z-10"
          style={{
            background: `radial-gradient(
                circle at ${glarePosition.x}% ${glarePosition.y}%,
                rgba(79, 70, 229, 0.1) 0%,
                rgba(59, 130, 246, 0.1) 50%,
                transparent 100%
              )`,
            opacity:
              Math.abs(rotation.x) + Math.abs(rotation.y) > 0 ? 0.7 : 0.5,
            transform: `translateZ(-100px) rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)`,
          }}
        />
      </div>
    </div>
  );
};
