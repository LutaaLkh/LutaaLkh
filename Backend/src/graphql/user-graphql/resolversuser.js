// src/graphql/resolvers.js
import User from '../../models/User.js';  // Моделийг зөв дуудаж авсан байна
import Card from '../../models/Card.js'; // Карт загварыг импортлох

const Userresolvers = {
  Query: {
    // Бүх хэрэглэгчийг авах
    getUsers: async () => {
      try {
        return await User.find({ deleted: false }).populate('cards'); // Cards-г populate хийх
      } catch (error) {
        throw new Error('Error fetching users: ' + error.message);
      }
    },

    // Нэг хэрэглэгчийг ID-ээр нь авах
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id).populate('cards'); // Cards-г populate хийх
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
          deleted: false,
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
          { $set: { deleted: true } },
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

    // Хэрэглэгчид карт нэмэх
    addCardToUser: async (_, { userId, cardId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        const card = await Card.findById(cardId);
        if (!card) {
          throw new Error('Card not found');
        }

        // Хэрэглэгчийн картууд руу шинэ карт нэмэх
        user.cards.push(cardId);
        await user.save();

        return user;
      } catch (error) {
        throw new Error('Error adding card to user: ' + error.message);
      }
    },
  },
};

export default Userresolvers;
