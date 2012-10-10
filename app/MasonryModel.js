var ModelBase = Class.extend({
    init:function(data){
        this.data = data;
    },
    set:function(key,value){
    	var oldValue = this.data[key];
    	this.data[key] = value;
    },
    get:function(key){
    	return this.data[key];
    }
});