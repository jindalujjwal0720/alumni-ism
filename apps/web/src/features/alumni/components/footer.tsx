import { useIsMobile } from '@/hooks/useIsMobile';
import { FiGlobe, FiMessageSquare, FiUsers } from 'react-icons/fi';

export const AlumniFooter = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

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
