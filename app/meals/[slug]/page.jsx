import Image from 'next/image';
import classes from './page.module.css';
import { getMeal } from '@/src/lib/meals';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.slug);

  if (!meal) {
    return notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealDetailsPage = async ({ params }) => {
  const { slug } = params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }
  const { title, image, creator_email, creator, instructions, summary } = meal;

  const instructionsHTML = instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {/* <Image src={image} alt={title} fill /> */}
          <Image
            src={`https://mgranada-nextjs-foodies-demo-app.s3.eu-central-1.amazonaws.com/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator} </a>
          </p>
          <p className={classes.summary}>{summary} </p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: instructionsHTML }}
        ></p>
      </main>
    </>
  );
};

export default MealDetailsPage;
