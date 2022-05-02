const { UserList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        // you can define like this `users() {}`, too
        users: () => {
            return UserList;
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        }
    },
};

module.exports = { resolvers };