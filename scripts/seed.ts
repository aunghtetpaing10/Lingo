import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 3,
        title: "Jpanaese",
        imageSrc: "/jp.svg",
      },
      {
        id: 4,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 5,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics of Spanish)
        title: "Nouns",
        order: 1,
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics of Spanish)
        title: "Verbs",
        order: 2,
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics of Spanish)
        title: "Verbs",
        order: 3,
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics of Spanish)
        title: "Verbs",
        order: 4,
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics of Spanish)
        title: "Verbs",
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'boy'?",
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: "the boy",
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'girl'?",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: "Which one of these is the 'boy'?",
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 2,
        question: "the boy",
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 3,
        question: "Which one of these is the 'girl'?",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // Which one of these is the
        imageSrc: "/boy.svg",
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        id: 2,
        challengeId: 1, // Which one of these is the
        imageSrc: "/girl.svg",
        correct: false,
        text: "La chica",
        audioSrc: "/es_girl.mp3",
      },
      {
        id: 3,
        challengeId: 1, // Which one of these is the
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 4,
        challengeId: 2, // the boy
        correct: true,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        id: 5,
        challengeId: 2, // the boy
        correct: false,
        text: "La chica",
        audioSrc: "/es_girl.mp3",
      },
      {
        id: 6,
        challengeId: 2, // the boy
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 7,
        challengeId: 3, // Which one of these is the girl
        imageSrc: "/boy.svg",
        correct: false,
        text: "el chico",
        audioSrc: "/es_boy.mp3",
      },
      {
        id: 8,
        challengeId: 3, // Which one of these is the
        imageSrc: "/girl.svg",
        correct: true,
        text: "La chica",
        audioSrc: "/es_girl.mp3",
      },
      {
        id: 9,
        challengeId: 3, // Which one of these is the
        imageSrc: "/zombie.svg",
        correct: false,
        text: "el zombi",
        audioSrc: "/es_zombie.mp3",
      },
    ]);


    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
