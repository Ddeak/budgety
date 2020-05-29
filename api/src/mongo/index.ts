import mongoose from 'mongoose';

const uri: string = process.env.MONGO_PATH;
let conn: mongoose.Connection = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if (conn) return conn;

  return await mongoose.createConnection(uri, {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};
