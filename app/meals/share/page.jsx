'use client'; // workaround for the use of useFormstate
import ImagePicker from '@/src/components/ImagePicker';
import classes from './page.module.css';
import { shareMeal } from '@/src/lib/actions';
import MealsFormSubmit from '@/src/components/MealsFormSubmit';
import { useFormstate } from 'react-dom';

export default function ShareMealPage() {
  const [state, formAction] = useFormstate(shareMeal, { message: null });
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          {/* <form className={classes.form} action={shareMeal}> */}
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          {/* workaround for the use of useFormState */}
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            {/* <button type="submit">Share Meal</button> */}
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
