import { getMeals } from '@/src/lib/meals';
import MealsGrid from '@/src/components/MealsGrid';

const Meals = async () => {
  const meals = await getMeals();

  return <MealsGrid meals={meals} />;
};

export default Meals;
