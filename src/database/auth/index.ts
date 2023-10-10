import { hash, compare } from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 8);

  return hashedPassword;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch = await compare(password, hashedPassword);

  return isMatch;
}
