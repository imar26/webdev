module.exports = function (app) {
  // app.get('/hello', function (req, res) {
  //     res.send({message : 'Hi Hello'});
  // });

    var blogPosts = [
        {title: 'Post 1', content: 'Content 1'}
    ];

    app.get('/blog', findAllBlogPosts);
    
    function findAllBlogPosts(req, res) {
        res.send(blogPosts);
    }
};