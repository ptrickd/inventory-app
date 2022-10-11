import mongoose from "mongoose";

interface IConnection {
  isConnected: number;
}

const connection: IConnection = {
  isConnected: 0,
};

interface IProcessEnv {
  [key: string]: string | undefined;
}

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  if (process.env.NODE_ENV === "development") {
    const db = await mongoose.connect(process.env.RESTO_MONGO_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    connection.isConnected = db.connections[0].readyState;
  } else if (process.env.NODE_ENV === "production") {
    const db = await mongoose.connect(process.env.RESTO_MONGO_URI_PROD || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  }
}

export default dbConnect;
