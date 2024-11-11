import Card from '../../models/zurmag.js';

const CardResolvers = {
  Query: {
    // Бүх картуудыг авах
    getCards: async () => await Card.find({}),

    // Нэг картын мэдээллийг авах
    getCard: async (_, { id }) => await Card.findById(id),
  },

  Mutation: {
    // Шинэ карт үүсгэх
    createCard: async (_, { input }) => {
      const newCard = new Card(input);
      return await newCard.save();  // Шинээр үүссэн картын мэдээллийг хадгална
    },

    // Картын мэдээллийг шинэчлэх
    updateCard: async (_, { id, input }) => {
      return await Card.findByIdAndUpdate(id, input, { new: true });
    },

    // Карт устгах
    deleteCard: async (_, { id }) => {
      return await Card.findByIdAndDelete(id);
    },
  },
};

export default CardResolvers;
