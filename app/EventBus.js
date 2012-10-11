var Event = Class.extend({
	init:function(){
		this.events = {};
	},
	on:function(eventName,callback,context){
		if(!this.events[eventName]){
			this.events[eventName] = [];
		}
		this.events[eventName].push({callback:callback, context:context});
		return this;
	},
	off:function(eventName,callback){
		if(!this.events[eventName]) return this;

		var eventHandlers  = this.events[eventName];
		for(var i=0;i<eventHandlers.length;i++){
			if(eventHandlers[i].callback == callback){
				delete eventHandlers[i];
				return this;
			}
		}
		return this;
	},
	go:function(eventName){
		if(!this.events[eventName]) return this;
		var eventHandlers  = this.events[eventName];

		for(var i=0;i<eventHandlers.length;i++){
			if(eventHandlers[i]){
				eventHandlers[i].callback.apply(eventHandlers[i].context,[].slice.call(arguments,1));
			}
		}

		return this;
	}
})

window.bus = new Event();