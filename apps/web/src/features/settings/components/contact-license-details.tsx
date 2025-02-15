import { Link } from 'react-router-dom';

export const ContactAndLicensesDetails = () => {
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h3 className="text-lg font-medium">Developer Contact</h3>
        <p className="text-sm text-muted-foreground">
          If you have any questions or need help, please contact the initial
          developer of this project.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mt-4 flex flex-col gap-1 text-sm">
            <p className="text-base font-medium">Ujjwal Jindal</p>
            <Link
              to="/alumni/0100-0000-0000-2025"
              target="_blank"
              className="text-muted-foreground"
            >
              IIT Dhanbad (
              <span className="underline">0100-0000-0000-2025</span>)
            </Link>
            <Link
              to="mailto:jindalujjwal0720@gmail.com"
              className="text-muted-foreground"
            >
              jindalujjwal0720@gmail.com
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium">Terms and Licenses</h3>
        <p className="text-sm text-muted-foreground">
          The project is closed-source and is not available for public use other
          than the intended audience. <br />
          Please read the terms and licenses for more information.
        </p>
      </div>
    </div>
  );
};
