(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {
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
            var counter = 0;
            var userObj = {
                _id: '',
                username : '',
                password : ''
            };
            if(user.password == user.verifypassword) {
                counter = counter + 1;
                userObj['_id'] = counter.toString();
                userObj['username'] = user.username;
                userObj['password'] = user.password;
                users.push(userObj);
            }
            var uid = counter;
            return userObj['_id'];
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);            
        }

        function updateUser(userId, user) {
            for(var i=0; i<users.length;i++) {
                if(users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    users[i].email = user.email;
                    return users[i]._id;
                }
            }            
        }

        function deleteUser(userId) {

        }

    }
})();