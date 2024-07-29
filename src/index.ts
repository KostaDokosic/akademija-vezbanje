import { config } from "dotenv";
import createApplication from "./app/app";
import connectDatabase from "./services/database.service";

config();

const app = createApplication();
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});
