var layoutData = [{
    width1:512,
    height1:748,
    float1:'left',
    width2:512,
    height2:340,
    float2:'left',
    width3:512,
    height3:408,
    float3:'left'
},{
    width1:512,
    height1:340,
    float1:'left',
    width2:512,
    height2:748,
    float2:'right',
    width3:512,
    height3:408,
    float3:'left'
},{
    width1:512,
    height1:748,
    float1:'left',
    width2:512,
    height2:340,
    float2:'left',
    width3:512,
    height3:408,
    float3:'left'
},{
    width1:512,
    height1:340,
    float1:'left',
    width2:512,
    height2:340,
    float2:'left',
    width3:1024,
    height3:408,
    float3:'left'
}
]

var View = Class.extend({
    init:function(templateId, data){
        this.template = $(templateId).html();
        this.data = data;
    },
    fillData:function(){
        var result = this.template;
        var data = this.data;
        for(var k in data){
            result = result.replace('{'+k+'}',data[k]);
        }
        return result;
    },
    render:function(){
        this.$el = $(this.fillData());
        this.$el.data('view',this);
        return this;
    }
});

var BlogView = View.extend({
    init:function(data){
        this._super("#blog-template",data);

        this.isFullScreen = false;
    },
    switchSize:function(){
        return this.isFullScreen?this.piece():this.fullScreen();
    },
    fullScreen:function(){
        this.$el.addClass('fullscreen');
        this.isFullScreen = true;
        bus.trigger('fullscreen');
        return this;
    },
    piece:function(){
        this.$el.removeClass('fullscreen');  
        this.isFullScreen = false;
        bus.trigger('piece');
        return this;
    }
});

var PageView = View.extend({
    init:function(data,rssStore){
        this._super("#page-template",data);
        this.rssStore = rssStore;
    },
    swipeOutLeft:function(){
        this.$el.animate({
            left: '-='+ this.$el.width()
        }, 500,function(){$(this).hide()});
        return this;
    },
    swipeOutRight:function(){
        this.$el.animate({
            left: '+='+ this.$el.width()
        }, 500,function(){$(this).hide()});
        return this;
    },
    swipeInLeft:function(){
        this.$el.css('left',0 - this.$el.width()).show().animate({
            left:0
        }, 500);
        return this;
    },
    swipeInRight:function(){
        this.$el.css('left',this.$el.width()).show().animate({
            left:0
        }, 500);
        return this;
    },
    swipeInOutLeft:function(){
        this.$el.animate({
            left:200
        }, 200,function(){
            $(this).animate({left:0},200);
        });
        return this;
    },
    swipeInOutRight:function(){
        this.$el.animate({
            left:-200
        }, 200,function(){
            $(this).animate({left:0},200);
        });
        return this;
    },
    render:function(){
        this._super();
        var self = this;         
        this.$el.find('.blog-container').each(function(index,item){
            var blogView = new BlogView(self.rssStore.pop());
            blogView.render().$el.appendTo(item);
        })
        return this;
    }
});

var ContentView = View.extend({
    init:function(rssStore){
        this.rssStore = rssStore;

        this.pages = [];
        this.current = -1;
        this.$el = $('#content');
    },
    newPage:function(){
        var pageView = new PageView(layoutData[0],this.rssStore);
        pageView.render();
        pageView.$el.appendTo(this.$el).show();

        this.pages.push(pageView);
        return this;
    },
    moveNextPage:function(){
        if(this.current >= this.pages.length-1){
            this.newPage();
        }
        this.pages[this.current].swipeOutLeft();
        this.pages[++this.current].swipeInRight();
    },
    movePreviousPage:function(){
        if(this.current >0){
            this.pages[this.current].swipeOutRight();
            this.pages[--this.current].swipeInLeft();
        }
        else{
            this.pages[this.current].swipeInOutLeft();
        }
    },
    getCurrentPage:function(){
        return this.pages[this.current];
    },
    render:function(){
        this.current = 0;
        this.newPage();
        this.getCurrentPage().$el.show();
    }
});

var BottomBarView = View.extend({
    init:function(){
        var self = this;
        this._super('#bottom-bar-template',{});
        
        bus.bind('fullscreen',function(){self.show();});
        bus.bind('piece',function(){self.hide();});
    },
    show:function(){
        this.$el.show();
        return this;
    },
    hide:function(){
        this.$el.hide();  
        return this;
    }
})

