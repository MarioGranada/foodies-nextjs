import fs from 'node:fs';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const db = sql('meals.db');

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('Something went wrong');
  return db.prepare('SELECT * FROM meals').all();
};

export const getMeal = async (slug) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
};

export const saveMeal = async (meal) => {
  const slug = slugify(meal.title, { lower: true }); // {lower: true} makes all letters lowercase
  const instructions = xss(meal.instructions);
  const newMeal = {
    ...meal,
    slug,
    instructions,
  };
  const extension = meal.image.name.split('.').pop();
  const filename = `${slug}.${extension}`;
  // const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), (error) => {
  //   if (error) {
  //     throw Error('Saving image failed');
  //   }
  // });

  s3.putObject({
    Bucket: 'mgranada-nextjs-foodies-demo-app',
    Key: filename,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  // newMeal.image = `/images/${filename}`;
  newMeal.image = filename;

  // db.prepare(`
  //   INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (?,?,?, ?, ?, ?, ?) `);

  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug) VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`
  ).run(newMeal);
};
