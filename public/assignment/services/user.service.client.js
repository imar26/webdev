(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", email: "aw@gmail.com"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", email: "bm@gmail.com"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", email: "cg@gmail.com"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi", email: "ja@gmail.com" }
        ];

        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function createUser(user) {

        }

        function findUserById(userId) {
            var userObj = {
                username : '',
                firstName : '',
                lastName : '',
                email: ''
            };
            for(var i=0; i<users.length;i++) {
                if(users[i]._id == userId) {
                    userObj['username'] = users[i].username;
                    userObj['firstName'] = users[i].firstName;
                    userObj['lastName'] = users[i].lastName;
                    userObj['email'] = users[i].email;
                }
            }
            return userObj;
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {

        }

        function updateUser(userId, user) {

        }

        function deleteUser(userId) {

        }

    }
})();