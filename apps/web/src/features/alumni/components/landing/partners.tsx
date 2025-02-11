import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/tw';
import { Link } from 'react-router-dom';

export const AlumniBrandPartnersSection = () => {
  return (
    <section id="brand-partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Exclusive Brand Partnerships
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Unlock premium offers and benefits from our esteemed partners
          </p>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[
            {
              name: 'IIT Dhanbad',
              logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ7kt9KQfrDnrsqSJplujymGADx_v11ucHA&s',
              offer: 'Discount on guest house bookings',
            },
            {
              name: 'Amazon',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
              offer: '10% off on Prime Membership',
            },
            {
              name: 'Microsoft',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
              offer: 'Free Azure credits for startups',
            },
            {
              name: 'Google',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
              offer: 'Google Workspace discounts',
            },
            {
              name: 'Apple',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
              offer: 'Education pricing on MacBooks',
            },
            {
              name: 'Tata Group',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1116px-Tata_logo.svg.png',
              offer: 'Exclusive networking events',
            },
          ].map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 w-auto mb-4 object-contain"
              />
              <p className="text-sm text-slate-600 text-center">
                {brand.offer}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Interested in partnering with us? Reach out to collaborate and offer
            exclusive benefits to our alumni network.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a
              href="#"
              className={cn(
                buttonVariants({ variant: 'default' }),
                'w-full md:w-max px-6 cursor-pointer text-white font-medium hover:shadow-lg transition-all duration-300',
              )}
            >
              Become a Partner
            </a>
            <Link
              to="/benefits"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'w-full md:w-max px-6 cursor-pointer',
              )}
            >
              View All Partners
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
