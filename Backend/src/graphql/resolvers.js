// src/graphql/resolvers.js
import User from '../models/User.js'; // MongoDB-ийн хэрэглэгчийн модель

const resolvers = {
  Query: {
    // Бүх хэрэглэгчийг авах
    getUsers: async () => {
      try {
        return await User.find({ deleted: false }); // Устгаагүй хэрэглэгчдийг авч ирэх
      } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
      }
    },

    // Нэг хэрэглэгчийг ID-ээр нь авах
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user || user.deleted) {
          throw new Error('User not found or deleted');
        }
        return user;
      } catch (error) {
        throw new Error('Error fetching user: ' + error.message);
      }
    },
  },

  Mutation: {
    // Хэрэглэгчийг шинээр үүсгэх
    createUser: async (_, { input }) => {
      try {
        const { name, email, password, createdBy } = input;

        const newUser = new User({
          name,
          email,
          password,
          createdBy,
          deleted: false, // Шинээр үүсгэж буй хэрэглэгч устгаагүй
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await newUser.save();

        return {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          createdBy: newUser.createdBy,
          deleted: newUser.deleted,
        };
      } catch (error) {
        throw new Error('Error creating user: ' + error.message);
      }
    },

    // Хэрэглэгчийн мэдээллийг шинэчлэх
    updateUser: async (_, { id, input }) => {
      try {
        const { name, email, password, updatedBy } = input;

        const updatedUser = await User.findByIdAndUpdate(
          id,
          { $set: { name, email, password, updatedBy, updatedAt: new Date().toISOString() } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error('User not found');
        }

        return updatedUser;
      } catch (error) {
        throw new Error('Error updating user: ' + error.message);
      }
    },

    // Хэрэглэгчийг устгах (удсгүй болгох)
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndUpdate(
          id,
          { $set: { deleted: true } }, // `deleted` талбарийг `true` болгож устгана
          { new: true }
        );

        if (!deletedUser) {
          throw new Error('User not found');
        }

        return deletedUser;
      } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
      }
    },
  },
};

export default resolvers;
