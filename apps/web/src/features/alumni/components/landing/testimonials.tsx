import { FiStar } from 'react-icons/fi';

export const AlumniTestimonialsSection = () => {
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
