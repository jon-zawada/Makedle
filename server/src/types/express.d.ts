import { User } from "../models/User";

// Extend the Request interface to have user per middleware
declare global {
  namespace Express {
    interface Request {
      user?: User;
      startTime?: number;
    }
  }
}
