import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  try {
    const salt: string = await bcrypt.genSalt(saltRounds);
    const hash: string = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const match: boolean = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw error;
  }
}
