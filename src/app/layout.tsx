import './styles.css';
import clsx from 'clsx';
import Providers from './providers';
import { raleway } from '@/assets/fonts';

export const metadata = {
  title: 'DoIT',
  description: 'todo list for developers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(raleway.variable)}>
      <body>
        <Providers>
          {children}
        </Providers>
          
       
      </body>
    </html>
  );
}
