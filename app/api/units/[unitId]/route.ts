import db from "@/db/drizzle";
import { units } from "@/db/schema"; // Update the import to use units instead of courses
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { unitId: number } } // Update courseId to unitId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.query.units.findFirst({ // Update courses to units
    where: eq(units.id, params.unitId), // Update courseId to unitId
  });

  return NextResponse.json(data);
};

export const PUT = async (
  req: Request,
  { params }: { params: { unitId: number } } // Update courseId to unitId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const body = await req.json();
  const data = await db
    .update(units) // Update courses to units
    .set({
      ...body,
    })
    .where(eq(units.id, params.unitId)) // Update courseId to unitId
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (
  req: Request,
  { params }: { params: { unitId: number } } // Update courseId to unitId
) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const data = await db.delete(units).where(eq(units.id, params.unitId)).returning(); // Update courses to units and courseId to unitId

  return NextResponse.json(data[0]);
};
