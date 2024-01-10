import db from "../db.server";

export async function getUser(id) {
  const user = await db.user.findFirst({ where: { id } });

  if (!user) {
    return null;
  }

  return user
}

export async function getUsers() {
  const users = await db.user.findMany({
    orderBy: { id: "desc" },
  });

  if (users.length === 0) return [];

  return users;
}