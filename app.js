$(function(){
    var rssStore = new RssStore("rss.xml");
    var mainView = new MasonryView(rssStore);
    var topbarView = new TopbarView({left:10,total:10});

    rssStore.fetch(function(){
        mainView.render();
        topbarView.render();
    });
    var model = new Event({name:"superowlf"});
    
    var testFunc = function(){alert('superwolf')};
    model.on('dd',testFunc);
    model.on('dd',testFunc);
    model.off('dd',testFunc);
    model.go('dd');
})