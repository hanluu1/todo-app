import './styles.css';

import clsx from 'clsx';
import { ThemeProvider } from 'next-themes';

import { raleway } from '@/assets/fonts';

export const metadata = {
  title: 'Todo App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(raleway.variable)}>
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
