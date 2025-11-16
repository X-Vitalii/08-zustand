import { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Note HUB - home',
  description: 'Everything InTime - Fast and Simple App to manage tasks',
  openGraph: {
    title: `Page not found`,
    description: 'Page you are looking for does not exist',
    url: `https://notehub.com/`,
    images: {
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: `Page not found`,
    },
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      {/* <Link href="/">Go back home</Link> */}
    </div>
  );
};

export default NotFound;
