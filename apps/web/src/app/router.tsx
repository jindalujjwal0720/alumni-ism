import { BrowserRouter } from 'react-router-dom';

export interface RouterProps {
  children: React.ReactNode;
}

const Router = ({ children }: RouterProps) => {
  return (
    <BrowserRouter
      basename={process.env.NODE_ENV === 'production' ? '/alumni-ism' : '/'}
    >
      {children}
    </BrowserRouter>
  );
};

export default Router;
