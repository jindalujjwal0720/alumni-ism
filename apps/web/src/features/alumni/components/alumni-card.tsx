import { useState } from 'react';
import { FiWifi } from 'react-icons/fi';

export const AlumniPremiumCard = () => {
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
    <div className="flex items-center justify-center min-h-[400px] p-8">
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
          className="flex flex-col justify-between p-8 w-full aspect-video rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl overflow-hidden transition-all duration-200 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Matte Finish Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* EMV Chip */}
              <div className="w-12 h-10 bg-gradient-to-br from-yellow-500/80 to-yellow-600/80 rounded-md overflow-hidden">
                <div className="w-full h-full bg-[linear-gradient(90deg,transparent_50%,rgba(255,255,255,0.15)_50%)] bg-stripes-sm" />
              </div>

              {/* Contactless Symbol */}
              <div className="left-24 text-white/60">
                <FiWifi className="w-8 h-8 transform rotate-90" />
              </div>
            </div>

            {/* Holographic Strip */}
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-400/30 via-blue-400/30 to-purple-400/30 rounded-lg backdrop-blur-sm border border-white/10" />
          </div>

          {/* Card Details */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-lg text-white/90 tracking-wider">
              •••• •••• •••• 2025
            </p>
            <div className="space-y-1">
              <p className="text-sm text-white/60 uppercase tracking-wider">
                Card Holder
              </p>
              <p className="font-medium text-white tracking-wide">
                UJJWAL JINDAL
              </p>
            </div>
            <div className="flex justify-between items-end">
              <div className="text-white/90 font-semibold tracking-widest">
                IIT DHANBAD
              </div>
              <div className="text-white/60 text-sm">
                VALID THRU
                <span className="ml-2 font-mono">LIFETIME</span>
              </div>
            </div>
          </div>

          {/* Logo and Validity */}

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
                rgba(79, 70, 229, 0.3) 0%,
                rgba(59, 130, 246, 0.3) 50%,
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
