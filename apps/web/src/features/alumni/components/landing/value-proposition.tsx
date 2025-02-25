import { FiBook, FiBriefcase, FiCheck, FiGlobe } from 'react-icons/fi';

export const AlumniValuePropositionSection = () => {
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
              title: 'Upcoming Tie Ups',
              icon: FiBriefcase,
              features: [
                'Corporate Partnerships',
                'Internship Opportunities',
                'Job Placement Support',
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
                <div className="p-3 rounded-lg bg-primary/80">
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
                    <FiCheck className="h-5 w-5 text-primary/80 flex-shrink-0" />
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
