window.bus = $(window);

var Event = Class.extend({
    init:function(){
        this.event = {};
    },
    go:function(eventName){
	    if(!this.event[eventName]) return;
	    var restArgs = [];
	    var i = 0;
	    while(i<arguments.length-1){
	    	restArgs[i] = arguments[++i];
	    }
	 
	    var eventHandlers = this.event[eventName];
	    for(var i=0;i<eventHandlers.length;i++){
	  		var handler = eventHandlers[i];
    		if(handler){
    			handler.callback(handler.context,restArgs);
    		}
    	}
    },
    on:function(eventName,callback,context){
    	if(!this.event[eventName]) this.event[eventName]=[];
    	this.event[eventName].push({callback:callback,context:context});
    	return this;
    },
    off:function(eventName,callback){
    	if(!this.event[eventName]) return;
    	var eventHandlers = this.event[eventName];
    	for(var i=0;i<eventHandlers.length;i++){
    		if(eventHandlers[i].callback == callback){
    			delete eventHandlers[i];
    			break;
    		}
    	}
    	return this;
    }
});