angular
    .module('TodoApp', [])
    .controller('TodoController', TodoController);

function TodoController($scope) {
    $scope.todoLists = [
        {title: 'Title 1', content: 'Content 1'},
        {title: 'Title 2', content: 'Content 2'},
        {title: 'Title 3', content: 'Content 3'},
        {title: 'Title 4', content: 'Content 4'},
        {title: 'Title 5', content: 'Content 5'}
    ]
}
