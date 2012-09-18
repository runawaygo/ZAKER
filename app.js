window.bus = $(window);

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
        var blogView = $(this).data('view');
        blogView.switchSize();
        blogView.$el.addClass('read');
    })
    //logic

    var rssStore = new RssStore("rss.xml");
    var contentView = new ContentView(rssStore);
    var bottomBarView = new BottomBarView();


    bottomBarView.render().$el.appendTo('body');
    rssStore.fetch(function(){
        contentView.render();
    });
})