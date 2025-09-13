import { connect, disconnect } from "mongodb";

export async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new error("Cannot connect to MongoDB");
  }
}

export async function disconnectToDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new error("Could not disconnect from MongoDB");
  }
}
