const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
    Query: {
        // USER RESOLVERS
        // you can define like this `users() {}`, too
        users: () => {
            if (UserList) {
                return {users: UserList};
            }
            return {message: "there was an error."};
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, { id: Number(id) });
            return user;
        },

        // MOVIE RESOLVERS
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, { name })
            return movie;
        },
    },
    User: {
        favoriteMovies: () => {
            return _.filter(MovieList, (movie) =>
                movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            )
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length - 1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        },
        updateUsername: (parent, args) => {
            const { id, newUsername } = args.input;
            let updatedUser;
            UserList.forEach((user) => {
                if (user.id === Number(id)) {
                    user.username = newUsername;
                    updatedUser = user;
                }
            });
            return updatedUser;
        },
        deleteUser: (parent, args) => {
            const id = args.id;
            const index = UserList.findIndex((user) => user.id === Number(id));
            if (index != -1) {
                return UserList.splice(index, 1)[0];
            }
            return null;
        },
    },
    UsersResult: {
        __resolveType(obj) {
            if (obj.users) {
                return "UsersSuccessfulResult";
            }
            if (obj.message) {
                return "UsersErrorResult";
            }
            return null;
        }
    }
};

module.exports = { resolvers };