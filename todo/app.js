module.exports = function (app) {
    app.get('/hello/:name', sayHello);
    app.get('/lectures/todo', readAllTodos);

    var todoLists = [
        {title: 'Title 1', content: 'Content 1'},
        {title: 'Title 2', content: 'Content 2'},
        {title: 'Title 3', content: 'Content 3'},
        {title: 'Title 4', content: 'Content 4'},
        {title: 'Title 5', content: 'Content 5'}
    ];

    function sayHello(req, res) {
        var name = req.params.name;
        var age = req.query.age;
        res.send('Hello, '+name + age);
    }

    function readAllTodos(req, res) {
        res.send(todoLists);
    }
};