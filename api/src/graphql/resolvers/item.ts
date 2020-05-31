import mongoose, { MongooseFilterQuery } from 'mongoose';
import dayjs from 'dayjs';

import ItemModel, { IItem } from '../../mongo/models/item';
import { ApolloError } from 'apollo-server-micro';

export default {
  Query: {
    getItems: async (
      parent: any,
      { category, days }: { category: IItem['category']; days?: number },
      { mongoConn }: { mongoConn: mongoose.Connection }
    ): Promise<IItem[]> => {
      const Item: mongoose.Model<IItem> = ItemModel(mongoConn);
      let list: IItem[];
      const daysBack = days || -30;
      console.log('thisfar', daysBack);

      let filterQuery: MongooseFilterQuery<IItem> = {
        created: {
          $gte: dayjs().add(daysBack, 'day').toDate(),
        },
      };
      if (category) filterQuery.category = category.toUpperCase();

      try {
        list = await Item.find(filterQuery).exec();
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
        const parsedPrice = Number.parseFloat(price);
        if (isNaN(parsedPrice)) {
          throw new ApolloError('Price must be a number');
        }

        const item = await Item.create({
          name,
          category: category.toUpperCase(),
          price: parsedPrice.toFixed(2),
          created: dayjs().startOf('day').toDate(),
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
