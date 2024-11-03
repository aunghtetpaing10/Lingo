import db from "@/db/drizzle";
import { lessons } from "@/db/schema"; // Update the import to use lessons
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { lessonId: number } } // Update courseId to lessonId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.lessons.findFirst({ // Update courses to lessons
    where: eq(lessons.id, params.lessonId), // Update courseId to lessonId
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: number } } // Update courseId to lessonId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db
    .update(lessons) // Update courses to lessons
    .set({
      ...body,
    })
    .where(eq(lessons.id, params.lessonId)) // Update courseId to lessonId
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: number } } // Update courseId to lessonId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(lessons).where(eq(lessons.id, params.lessonId)).returning(); // Update courses to lessons and courseId to lessonId

  return NextResponse.json(data[0]);
};
