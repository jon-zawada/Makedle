export const parseTokenTime = (duration: string): number => {
  const regex = /(\d+)([a-zA-Z]+)/;
  const match = duration.match(regex);

  if (!match) {
    throw new Error("Invalid duration format");
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case "d": // days
      return value * 24 * 60 * 60 * 1000;
    case "h": // hours
      return value * 60 * 60 * 1000;
    case "m": // minutes
      return value * 60 * 1000;
    case "s": // seconds
      return value * 1000;
    default:
      throw new Error("Unsupported time unit");
  }
};
