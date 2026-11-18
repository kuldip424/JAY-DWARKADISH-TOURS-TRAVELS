import User from '../../models/user.model.js';

// Includes the password hash: only for checking a login
export const findUserByEmail = (email) => User.findOne({ email }).lean();

export const findUserById = (id) => User.findById(id).select('-password').lean();

// The model's pre-save hook hashes the password
export const createUser = (data) => User.create(data);

export const updateUserRoleByEmail = (email, role) =>
  User.findOneAndUpdate({ email }, { $set: { role } }, { returnDocument: 'after' }).select('-password').lean();
