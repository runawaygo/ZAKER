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
        if(this.$el)
            this.$el.html(this.fillData());
        else
            this.$el = $(this.fillData());
        this.$el.data('view',this);
        return this;
    }
});