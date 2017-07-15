angular
    .module('BlogApp', [])
    .controller('BlogController', blogController);

function blogController($scope) {
    $scope.blogPosts = [
        {title: 'Post 1', content: 'Content 1'}
    ];

    $scope.addPost = addPost;
    $scope.deletePost = deletePost;
    $scope.deleleAll = deleleAll;
    $scope.selectPost = selectPost;
    $scope.updatePost = updatePost;
    $scope.blog = {};

    function addPost(blog) {
        var newPost = {
            title: blog.title,
            content: blog.content
        }
        $scope.blogPosts.push(newPost);
        blog.title = "";
        blog.content = "";
    }

    function deletePost(index) {
        $scope.blogPosts.splice(index, 1);
    }

    function deleleAll() {
        $scope.blogPosts = [];
    }

    function selectPost(blog, index) {
        $scope.selectedBlog = index;
        $scope.blog.title = blog.title;
        $scope.blog.content = blog.content;
    }

    function updatePost(blog) {
        $scope.blogPosts[$scope.selectedBlog] = blog;
        $scope.blog = {};
    }
}