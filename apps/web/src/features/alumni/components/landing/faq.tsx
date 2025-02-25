import { FiMessageSquare } from 'react-icons/fi';

export const AlumniFAQSection = () => {
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
                  <FiMessageSquare className="h-5 w-5 text-primary/80" />
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
