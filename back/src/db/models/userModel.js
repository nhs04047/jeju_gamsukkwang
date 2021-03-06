import { User } from "../schemas/user";

export const userModel = {
  create: async ({ newUser }) => {
    const createdNewUser = await User.create(newUser);
    return createdNewUser;
  },

  isNicknameExist: async ({ nickname }) => {
    const isNicknameExist = await User.exists({ nickname });
    if (isNicknameExist) {
      return true;
    }
    return false;
  },

  isEmailExist: async ({ email }) => {
    const isEmailExist = await User.exists({ email });
    if (isEmailExist) {
      return true;
    }
    return false;
  },

  findByEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },

  findById: async ({ userId }) => {
    const user = await User.findOne({ id: userId });
    return user;
  },

  update: async ({ userId, data }) => {
    const filter = { id: userId };
    const update = { $set: data };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    return updatedUser;
  },

  deleteById: async ({ userId }) => {
    const user = await User.deleteOne({ id: userId });
    return user;
  },

  addStamp: async ({ userId, tourId }) => {
    const filter = { id: userId };
    const update = {
      $push: { stamp: tourId },
    };
    const option = { returnOriginal: false };

    const addStamp = await User.findOneAndUpdate(filter, update, option);

    return addStamp;
  },

  isStampExist: async ({ userId, tourId }) => {
    const isStampExist = await User.exists({
      $and: [{ id: userId }, { stamp: tourId }],
    });

    return isStampExist;
  },

  updateExp: async ({ userId, point }) => {
    const filter = { id: userId };
    const update = { $inc: { experience: point } };
    const option = { returnOriginal: false };

    const upgradeUser = await User.findOneAndUpdate(filter, update, option);
    return upgradeUser;
  },
};
