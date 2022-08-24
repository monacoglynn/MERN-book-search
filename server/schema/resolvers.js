const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const {signToken} = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        }
    },

    Mutations: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user};
        },
        login: async (parent, { email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('there is no user with this email');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('password is incorrect');
            }

            const token = signToken(user);

            return {token, user};
        }
    }

}



module.exports = resolvers;