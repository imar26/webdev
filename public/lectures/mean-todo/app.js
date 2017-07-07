angular
    .module('TodoApp', [])
    .controller('TodoController', TodoController);

function TodoController($scope, $http) {
    $scope.todoLists = [];

    $http.get('/lectures/todo')
        .then(function (response) {
            console.log(response);
            $scope.todoLists = response.data;
        });

    $scope.createTodo = createTodo;
    $scope.deleteTodo = deleteTodo;
    $scope.editTodo = editTodo;
    $scope.updateTodo = updateTodo;
    $scope.selectedIndex = -1;
    $scope.todo = {};

    function createTodo(todo) {
        var newTodo = {
            title: todo.title,
            content: todo.content
        }
        $scope.todoLists.push(newTodo);
    }
    
    function deleteTodo(todo) {
        var index = $scope.todoLists.indexOf(todo);
        // $scope.todoLists.pop(todo);
        $scope.todoLists.splice(index, 1);
    }

    function editTodo(todo) {
        $scope.selectedIndex = $scope.todoLists.indexOf(todo);
        $scope.todo.title = todo.title;
        $scope.todo.content = todo.content;
    }

    function updateTodo(todo) {
        $scope.todoLists[$scope.selectedIndex].title = todo.title;
        $scope.todoLists[$scope.selectedIndex].content = todo.content;
        $scope.todo = {};
    }
}
