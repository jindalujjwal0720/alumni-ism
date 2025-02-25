import { HiOutlineReceiptTax } from 'react-icons/hi';
import { AlumniPledgeForm } from './forms/pledge-form';

export const AlumniDonationsSection = () => {
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
                  <p className="text-3xl font-bold text-primary/80 mb-2">
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
                  'Naresh Vashishth',
                  'ISMAANA Chapter',
                  'A. N. Gupta',
                  'Mohinder Gulati',
                  'KVK Prasad',
                ].map((name, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-indigo-100/50 rounded-full text-sm text-primary/90"
                  >
                    {name}
                  </div>
                ))}
                <a href="#" className="text-primary/80 hover:underline text-sm">
                  Install app to view all →
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
