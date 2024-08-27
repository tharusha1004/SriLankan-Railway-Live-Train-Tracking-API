const userModel = require('../models/user');
const { generateToken } = require('../config/auth');

const registerUser = async (username, password, profile) => {
    let user = await User.findOne({ username });
    if (user) throw new Error('User already exists');

    user = new userModel({ username, password, profile });
    await user.save();

    const token = generateToken(user);
    return { user, token };
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return { user, token };
};

const updateUserProfile = async (userId, fullName, email) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.profile.fullName = fullName || user.profile.fullName;
    user.profile.email = email || user.profile.email;

    await user.save();
    return user;
};

const deleteUserProfile = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');

    return user;
};

module.exports = { registerUser, loginUser, updateUserProfile, deleteUserProfile };
