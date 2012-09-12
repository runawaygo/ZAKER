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
    },
    swipeOutRight:function(){
        this.$el.animate({
            left: '+='+ this.$el.width()
        }, 500,function(){$(this).hide()});
    },
    swipeInLeft:function(){
        this.$el.css('left',0 - this.$el.width()).show().animate({
            left:0
        }, 500);
    },
    swipeInRight:function(){
        this.$el.css('left',this.$el.width()).show().animate({
            left:0
        }, 500);
    },
    swipeInOut:function(){
        this.$el.animate({
            left:200
        }, 200,function(){
            $(this).animate({left:0},200);
        });
    },
    render:function(){
        this._super();
        var self = this;         
        this.$el.find('.blog').each(function(index,item){
            var blogView = new BlogView(self.rssStore.pop());
            blogView.render().$el.appendTo(item);
        })
        return this;
    }
});

var BlogView = View.extend({
    init:function(data){
        this._super("#blog-template",data);
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
            this.pages[this.current].swipeInOut();
        }
    },
    render:function(){
        this.newPage();
        this.current = 0;
        this.pages[this.current].$el.show();
    }
});