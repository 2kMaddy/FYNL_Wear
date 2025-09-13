import app from "./app.js";
import { connectToDatabase, disconnectToDatabase } from "./connection.js";

const PORT = process.env.PORT || 4000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server started successfully"));
  })
  .catch((err) => {
    disconnectToDatabase();
    console.log(err);
  });
