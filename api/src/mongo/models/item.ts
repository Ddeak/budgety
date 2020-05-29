import mongoose from "mongoose";

export interface IItem extends mongoose.Document {
  name: string;
  category: string;
  price: string;
  date: Date;
}

const schema: mongoose.SchemaDefinition = {
  name: { type: mongoose.SchemaTypes.String, required: true },
  category: { type: mongoose.SchemaTypes.String, required: true },
  price: { type: mongoose.SchemaTypes.String, required: true },
};

const collectionName: string = "Item";
const itemSchema: mongoose.Schema = new mongoose.Schema(schema);

const Item = (conn: mongoose.Connection): mongoose.Model<IItem> =>
  conn.model(collectionName, itemSchema);

export default Item;
