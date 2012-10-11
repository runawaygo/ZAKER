var BlogView = View.extend({
    init:function(data){
        this._super("#masonry-item-template",data);
    },
    initHandlers:function(){
        var self = this;
        this.$el.click(function(){
            self.read();
        });
        return this;
    },
    read:function(){
        if(this.$el.hasClass('read')) return;

        this.$el.addClass('read');
        bus.go('read');
        return this;
    },
    render:function(){
        return this._super().initHandlers();
    }
});

var TopbarView = View.extend({
    init:function(data){
        this._super("#masonry-topbar-template",data);
        this.$el = $('#topbar');
        this.initEvents();
    },
    initEvents:function(){
        bus.on('read',function(){
            this.data.left--;
            this.render();
        },this);
    },
    render:function(){
        this._super();
        return this;
    }
});

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