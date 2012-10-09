$(function(){
    var rssStore = new RssStore("rss.xml");
    var mainView = new MasonryView(rssStore);
    var topbarView = new TopbarView({left:10,total:10});

    rssStore.fetch(function(){
        mainView.render();
        topbarView.render();
    });
})