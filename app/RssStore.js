var RssStore = Class.extend({
    init:function(url){
        this.url = url;
        this.blogs  = [];
    },
    fetch:function(callback){
        var self = this;
        $.get(this.url, function(xml) {
            var jsonObj = $.xml2json(xml);
            self.blogs = [].concat(jsonObj.channel.item);

            callback&&callback();
        }); 
    },
    getRecord:function(index){
        return "something";
    },
    pop:function(){
        if(this.blogs.length === 0) return null;
        return this.blogs.pop();
    }
});