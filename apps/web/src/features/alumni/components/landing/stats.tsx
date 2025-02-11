import { FiBriefcase, FiMapPin, FiStar, FiUsers } from 'react-icons/fi';

export const AlumniStatsSection = () => {
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
