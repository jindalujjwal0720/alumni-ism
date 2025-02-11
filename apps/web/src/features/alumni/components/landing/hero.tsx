import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/tw';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AlumniPremiumCard } from '../alumni-card';

export const AlumniHeroSection = () => {
  return (
    <section className="relative pt-28 pb-24 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-indigo-50/30" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-indigo-100/50 to-transparent transform rotate-12 translate-x-1/4" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100/80 border border-indigo-200 backdrop-blur-sm">
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span className="text-sm font-medium text-indigo-700">
                  Limited Memberships Available
                </span>
              </div>
            </div>

            <h1 className="text-5xl font-bold text-slate-900 leading-tight font-display">
              Your Gateway to
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Elite Alumni Network
              </span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
              Join an exclusive community of innovators and leaders with our
              premium alumni membership card. Experience privileges that reflect
              your prestigious alma mater.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                className="group px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300"
              >
                Apply Now
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link
                to="/benefits"
                className={cn(buttonVariants({ variant: 'outline' }), 'px-6')}
              >
                Explore Benefits
              </Link>
            </div>
          </div>
          <div className="relative perspective-2xl">
            <AlumniPremiumCard />
          </div>
        </div>
      </div>
    </section>
  );
};
