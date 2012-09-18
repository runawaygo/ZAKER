var MasonryView = View.extend({
    init:function(rssStore){
        this.rssStore = rssStore;

        this.blogs = [];
        this.$el = $('#content');
    },
    newBlog:function(){
        var blogView = new BlogView(this.rssStore.pop());
        blogView.render();
        blogView.$el.appendTo(this.$el);
        this.blogs.push(blogView);
        return this;
    },
    
    render:function(){
        for(var i = 10;i>0;i--)
            this.newBlog();

        this.$el.masonry({
            itemSelector: '.blog',
            columnWidth: 240,
            isAnimated: true
        });
        return this;
    }
});