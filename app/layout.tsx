import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ShieldNet AI — Cybersecurity for Everyone',
  description:
    'Enterprise-grade AI cybersecurity for individuals, businesses, and governments. Real-time threat detection, automated response, and 24/7 protection.',
  keywords: ['cybersecurity', 'AI security', 'threat detection', 'zero trust', 'compliance'],
  openGraph: {
    title: 'ShieldNet AI — Cybersecurity for Everyone',
    description: 'AI-powered protection for individuals, businesses, and governments.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased font-inter">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
