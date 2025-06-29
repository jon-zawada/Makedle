import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hash: string = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  const match: boolean = await bcrypt.compare(password, hash);
  return match;
}
