import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { amountToWords } from '@/utils/numbers';
import { cn } from '@/utils/tw';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FiCheck,
  FiStar,
  FiUsers,
  FiArrowRight,
  FiBriefcase,
  FiBook,
  FiGlobe,
  FiMapPin,
  FiMessageSquare,
  FiWifi,
} from 'react-icons/fi';
import { HiOutlineReceiptTax } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const CONTACT_EMAIL = 'jindalujjwal0720@gmail.com';

const AlumniHeroSection = () => {
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

const AlumniPremiumCard = () => {
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

const AlumniNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZ7kt9KQfrDnrsqSJplujymGADx_v11ucHA&s"
                alt="IIT Dhanbad Alumni Card"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-medium bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                IIT(ISM) Alumni
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="nav-link">
                Benefits
              </a>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
              <a href="#pricing" className="nav-link">
                Pricing
              </a>
              <a href="#faq" className="nav-link">
                FAQ
              </a>
            </div>

            {/* Mobile Menu Button */}
            <Button
              title="Open Menu"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-screen w-[90%] max-w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button
            title="Close Menu"
            onClick={() => setIsDrawerOpen(false)}
            variant="ghost"
            size="icon"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <a
            href="#benefits"
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-700 hover:text-primary"
          >
            Benefits
          </a>
          <a
            href="#testimonials"
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-700 hover:text-primary"
          >
            Testimonials
          </a>
          <a
            href="#pricing"
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-700 hover:text-primary"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setIsDrawerOpen(false)}
            className="text-gray-700 hover:text-primary"
          >
            FAQ
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}
    </>
  );
};

const AlumniStatsSection = () => {
  return (
    <section className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: FiUsers, value: '25K+', label: 'Global Alumni' },
            { icon: FiBriefcase, value: '85%', label: 'Career Impact' },
            { icon: FiStar, value: '4.9', label: 'Satisfaction Rating' },
            { icon: FiMapPin, value: '60+', label: 'Countries' },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm">
              <stat.icon className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <p className="text-3xl font-bold text-slate-900 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlumniBrandPartnersSection = () => {
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

const AlumniValuePropositionSection = () => {
  return (
    <section id="value-proposition" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Institutional-Grade Benefits
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Designed to support your professional journey at every stage
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Career Services',
              icon: FiBriefcase,
              features: [
                'Executive Recruitment Access',
                'Leadership Workshops',
                'Career Transitions Support',
              ],
              bg: 'bg-blue-50',
            },
            {
              title: 'Academic Access',
              icon: FiBook,
              features: [
                'Research Database Entry',
                'Campus Facility Access',
                'Journal Subscriptions',
              ],
              bg: 'bg-indigo-50',
            },
            {
              title: 'Global Network',
              icon: FiGlobe,
              features: [
                'Regional Chapters Access',
                'Alumni Directory',
                'Global Event Invites',
              ],
              bg: 'bg-purple-50',
            },
          ].map((benefit, idx) => (
            <div key={idx} className={`p-8 rounded-2xl ${benefit.bg}`}>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-lg bg-indigo-600">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  {benefit.title}
                </h3>
              </div>
              <ul className="space-y-4">
                {benefit.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <FiCheck className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlumniTestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Alumni Success Stories
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Hear from our global network of accomplished members
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={`https://randomuser.me/api/portraits/men/${idx + 40}.jpg`}
                  alt="Alumni"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    Dr. Rajesh Verma
                  </p>
                  <p className="text-sm text-slate-500">
                    Class of '08, CTO at TechCorp
                  </p>
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "The alumni network opened doors I never imagined. The executive
                mentorship program directly contributed to my recent promotion
                to CTO."
              </p>
              <div className="flex items-center gap-2 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AlumniPricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Membership Options
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Choose the plan that best supports your professional goals
          </p>
        </div>
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          <div className="w-full max-w-96 bg-white p-8 rounded-2xl shadow-lg border-2 border-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 rounded-bl-lg text-sm">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Premium Membership
              </h3>
              <p className="text-slate-600">
                Full access to all alumni benefits
              </p>
            </div>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-bold text-slate-900">₹10,000</span>
              <span className="text-slate-500">/ Lifetime</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                'All Campus Privileges',
                'Global Network Access',
                'Career Services',
                'Exclusive Events',
                '24/7 Support',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <FiCheck className="h-5 w-5 text-indigo-600" />
                  <span className="text-slate-700">{f}</span>
                </li>
              ))}
            </ul>
            <Button className="primary-button w-full group">
              Get Started{' '}
              <FiArrowRight className="button-icon group-hover:ml-4 transition-all duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const alumniPledgeFormSchema = z.object({
  amount: z
    .number()
    .min(1000)
    .refine((val) => val % 1000 === 0, {
      message: 'Amount must be in multiples of 1000',
    }),
  fullName: z.string().min(3),
  contactNumber: z.string().min(10),
});

type AlumniPledgeFormValues = z.infer<typeof alumniPledgeFormSchema>;

const numberToINRString = (num: number) =>
  num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const AlumniPledgeForm = () => {
  const form = useForm<AlumniPledgeFormValues>({
    resolver: zodResolver(alumniPledgeFormSchema),
    defaultValues: {
      amount: 0,
      fullName: '',
      contactNumber: '',
    },
  });

  const handleSubmit = (values: AlumniPledgeFormValues) => {
    const emailBody = `Hi Alumni Office,

I would like to pledge a donation to support the facilities and services provided to students and alumni at IIT Dhanbad. Please find my details below:

Contribution Amount: ${numberToINRString(values.amount)}
Contribution Amount (in words): ${capitalize(amountToWords(values.amount))} INR only
Contributor Name: ${values.fullName}
Contact Number: ${values.contactNumber}

Warm Regards,
${values.fullName}
`.replace(/\n/g, '%0D%0A');

    window.open(
      `mailto:${CONTACT_EMAIL}?subject=Donation Pledge&body=${emailBody}`,
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md mx-auto"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel className="text-slate-200">
                    Contribution Amount (₹)
                  </FormLabel>
                  <FormControl>
                    <div>
                      <div className="grid grid-cols-3 gap-3">
                        {[100000, 500000, 1000000].map((amt) => (
                          <div
                            key={amt}
                            onClick={() => form.setValue('amount', amt)}
                            className={cn(
                              'p-2 flex items-center justify-center rounded-md bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30 hover:text-primary-foreground transition-colors',
                              field.value === amt &&
                                'bg-indigo-600 text-primary-foreground hover:bg-indigo-600/70',
                            )}
                          >
                            {amt.toLocaleString('en-IN')}
                          </div>
                        ))}
                      </div>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Custom Amount"
                        min={1000}
                        step={1000}
                        className="!mt-2 w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ujjwal Jindal"
                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Contact Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="9876543210"
                    className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="primary-button w-full">
            Pledge Donation
          </Button>
        </div>
      </form>
    </Form>
  );
};

const AlumniDonationsSection = () => {
  return (
    <section id="donations" className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Invest in Future Excellence
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            100% of your contribution directly supports student success and
            institutional growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Impact Statistics */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { value: '₹2.8Cr+', label: 'Annual Scholarships' },
                { value: '150+', label: 'Research Projects' },
                { value: '85%', label: 'Alumni Participation' },
                { value: '4.8★', label: 'Donor Satisfaction' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center p-4">
                  <p className="text-3xl font-bold text-indigo-600 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* <div className="space-y-6 mb-12">
              <h3 className="text-xl font-semibold text-slate-900">
                Your Contribution Enables:
              </h3>
              <ul className="space-y-4">
                {[
                  'Merit-based scholarships for underprivileged students',
                  'Cutting-edge research infrastructure',
                  'Global academic collaborations',
                  'Student entrepreneurship programs',
                  'Campus sustainability initiatives',
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FiCheck className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Contributor Wall */}
            <div className="border-t border-slate-100 pt-8">
              <h4 className="text-sm font-semibold text-slate-600 mb-6">
                Recent Leadership Donors:
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                {[
                  'Dr. A. Sharma',
                  'R. Kapoor Group',
                  'S. Patel Foundation',
                  '1985 Batch Alumni',
                  'Prof. M. Krishnan',
                ].map((name, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-indigo-100/50 rounded-full text-sm text-indigo-700"
                  >
                    {name}
                  </div>
                ))}
                <a href="#" className="text-indigo-600 hover:underline text-sm">
                  View All Contributors →
                </a>
              </div>
            </div>
          </div>

          {/* Donation Form */}
          <div className="h-full bg-slate-900 p-8 rounded-2xl shadow-xl">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Pledge to Support Excellence
              </h3>

              <div className="space-y-6">
                <AlumniPledgeForm />

                <p className="text-center text-slate-400 text-sm">
                  <HiOutlineReceiptTax className="inline mr-1 h-4 w-4" />
                  Tax Deductible under Section 80G
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AlumniFAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-6">
          {[
            {
              q: 'What documentation is required for verification?',
              a: 'We require a copy of your degree certificate and government-issued ID for verification.',
            },
            {
              q: 'Can international alumni apply?',
              a: 'Yes, our membership is available to all graduates regardless of current location.',
            },
            {
              q: 'How long does verification take?',
              a: 'Typically 3-5 business days after document submission.',
            },
            {
              q: 'Is there an annual renewal fee?',
              a: 'No, the premium membership is a one-time payment for lifetime access.',
            },
          ].map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
            >
              <div className="flex items-start gap-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FiMessageSquare className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AlumniFooter = () => {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">IIT Dhanbad Alumni</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting excellence since 1926. Officially recognized alumni
              association supporting graduates worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>iraa@iitism.ac.in</li>
              <li>+91 123 456 7890</li>
              <li>IIT Dhanbad Campus</li>
              <li>Dhanbad, Jharkhand</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {[FiGlobe, FiMessageSquare, FiUsers].map((Icon, idx) => (
                <a
                  key={idx}
                  title="Social Media"
                  href="#"
                  className="footer-social-icon"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          Idiated and crafted by{' '}
          <a
            title="Ujjwal Jindal"
            rel="noopener noreferrer"
            target="_blank"
            href="https://linkedin.com/in/jindalujjwal0720"
            className="text-indigo-500 hover:underline"
          >
            Ujjwal Jindal
          </a>{' '}
          (2025) © 2024 IIT Dhanbad Alumni Association. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const AlumniCardLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50/10">
      <AlumniNavigation />
      <AlumniHeroSection />
      <AlumniStatsSection />
      <div id="benefits">
        <AlumniBrandPartnersSection />
        <AlumniValuePropositionSection />
      </div>
      <AlumniTestimonialsSection />
      <AlumniPricingSection />
      <AlumniDonationsSection />
      <AlumniFAQSection />
      <AlumniFooter />
    </div>
  );
};

export default AlumniCardLanding;
