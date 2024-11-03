import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2neD0TRty8ph3JTztiAM9FyxJnw"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
