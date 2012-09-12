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