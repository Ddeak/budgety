import mongoose from 'mongoose';
import ItemModel, { IItem } from '../../mongo/models/item';
import { ApolloError } from 'apollo-server-micro';

export default {
  Query: {
    getAllItems: async (
      parent: any,
      { limit }: { limit?: number },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem[]> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);
      let list: IItem[];

      try {
        list = limit
          ? await Item.find().limit(limit).exec()
          : await Item.find().exec();
      } catch (err) {
        console.error('> getALlItems error: ', err);
        throw new ApolloError('Error retrieving all items');
      }
      return list;
    },
    getItem: async (
      parent: any,
      { _id }: { _id: IItem['_id'] },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);

      try {
        return await Item.findById(_id).exec();
      } catch (err) {
        console.error('> getItem error: ', err);
        throw new ApolloError('Error retrieving single item');
      }
    },
    getByCategory: async (
      parent: any,
      { category, limit }: { category: IItem['category']; limit?: number },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem[]> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);

      try {
        return limit
          ? await Item.find({ category }).limit(limit).exec()
          : await Item.find({ category }).exec();
      } catch (err) {
        console.error('> getItem error: ', err);
        throw new ApolloError('Error retrieving single item');
      }
    },
  },

  Mutation: {
    saveItem: async (
      parent: any,
      {
        name,
        category,
        price,
      }: {
        name: IItem['name'];
        category: IItem['category'];
        price: IItem['price'];
      },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);
      try {
        const item = await Item.create({
          name,
          category,
          price,
        });
        return item;
      } catch (err) {
        console.error('> saveItem error: ', err);
        throw new ApolloError('Error creating item');
      }
    },
    deleteItem: async (
      parent: any,
      { _id }: { _id: IItem['_id'] },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);
      try {
        return await Item.findByIdAndDelete(_id).exec();
      } catch (err) {
        console.error('> deleteItem error: ', err);
        throw new ApolloError('Error deleting item');
      }
    },
  },
};
