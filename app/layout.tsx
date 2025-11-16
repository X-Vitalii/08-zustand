import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Note HUB - home',
  description: 'Everything InTime - Fast and Simple App to manage tasks',
  openGraph: {
    title: `Note HUB - home`,
    description: 'Everything InTime - Fast and Simple App to manage tasks',
    url: `https://notehub.com/notes/`,
    images: {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: `Note HUB - home`,
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />

          <main>
            {children}
            {modal}
          </main>

          <Footer />
        </TanStackProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
