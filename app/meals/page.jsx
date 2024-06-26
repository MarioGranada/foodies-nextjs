import Link from 'next/link';
import classes from './page.module.css';
import loadingClasses from './loading.module.css';
import { Suspense } from 'react';
import Meals from '@/src/components/Meals';

export const metadata = {
  // this works only for static or not dynamic pages. For Dynamic pages you need async function generateMetadata as made in the [slug] page
  title: 'All Meals',
  description:
    'Browse all our delicious recipes shared by our vibrant community.',
};

const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favourite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={loadingClasses.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
