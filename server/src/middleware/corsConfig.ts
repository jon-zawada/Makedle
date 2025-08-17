import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  // TODO - Add production enviroment
];

export const corsConfig = cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
