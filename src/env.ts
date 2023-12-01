import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const projectId = process.env.PROJECT_ID;
const apiKey = process.env.API_KEY;

export { projectId, apiKey };
