// This marks that all the functions given below are executed on the server.
// No matter if they are used in files/components marked as 'use client'
// they must be separated from 'use client' marked files in order to avoid any compilation error
// and any confusion by the nextjs compiler. Also for better code organization and leaner code.
'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

const isInvalidText = (text) => !text || text.trim() === '';

// export const shareMeal = async (prevState, formData) => { // workaround for the use of useFormState in share meal page
export const shareMeal = async (prevState, formData) => {
  // 'use server';

  const { title, summary, image, email, name, instructions } =
    Object.fromEntries(formData);

  const meal = {
    title,
    summary,
    instructions,
    image,
    creator: name,
    creator_email: email,
  };

  if (
    isInvalidText(title) ||
    isInvalidText(summary) ||
    isInvalidText(instructions) ||
    isInvalidText(name) ||
    isInvalidText(email) ||
    !email.includes('@') ||
    !meal.image ||
    image.size === 0
  ) {
    throw new Error('Invalid form data');

    // return { message: "Invalid input" }; // workaround for the use of useFormState in share meal page
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals');
};
