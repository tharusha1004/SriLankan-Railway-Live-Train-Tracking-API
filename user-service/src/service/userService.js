// const User = require('../models/user');

// exports.registerUser = async (userData) => {
//     const user = new User(userData);
//     return await user.save();
// };

// exports.getUserProfile = async (username) => {
//     return await User.findOne({ username });
// };

// exports.updateUserProfile = async (username, profileData) => {
//     return await User.findOneAndUpdate(
//         { username },
//         { $set: { profile: profileData } },
//         { new: true }
//     );
// };

// exports.deleteUser = async (username) => {
//     return await User.findOneAndDelete({ username });
// };
