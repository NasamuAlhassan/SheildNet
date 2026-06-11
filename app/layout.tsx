import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
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
  keywords: [
    'cybersecurity',
    'AI security',
    'threat detection',
    'zero trust',
    'compliance',
    'ShieldNet',
  ],
  openGraph: {
    title: 'ShieldNet AI — Cybersecurity for Everyone',
    description:
      'AI-powered protection for individuals, businesses, and governments.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#060910] text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
