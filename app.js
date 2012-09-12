$(function(){
    //event listen

    $('#cover').on('swipeup',function(){
        $(this).slideUp(200);
    });

    $('#content').on('swipedown', function(e) {
        $('#cover').slideDown(200);
    })

    $('#content').on('swipeleft', function(e) {
        contentView.moveNextPage();
    })

    $('#content').on('swiperight', function(e) {
        contentView.movePreviousPage();
    });

    $('body').delegate('a','click',function(e){
        e.preventDefault();
    });

    $('#content').delegate('.blog','click',function(e){
        var view = $(this).data('view');
        view.switchSize();
    })

    //logic
    function generatePageView(){
        var pageView = new PageView(layoutData[0],rssStore);
        pageView.render();
        pageView.$el.appendTo('#content').show();
        return pageView;
    }

    var rssStore = new RssStore("rss.xml");
    var contentView = new ContentView(rssStore);
    rssStore.fetch(function(){
        contentView.render();
    });
})