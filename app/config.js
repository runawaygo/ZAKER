function mainViewFactory(){
	if(0){
	// if(new Date().getSeconds()%2 ===0){
		addCSS('index.css');
		return ContentView;
	}
	else{
		addCSS('index2.css');
		return MasonryView;
	}
}

function addCSS(href){
	var link = document.createElement("link");
	link.href = href;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	document.getElementsByTagName("head")[0].appendChild(link);
}