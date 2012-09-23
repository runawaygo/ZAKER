window.bus = $(window);

$(function(){
    // //event listen
    $('#cover').on('swipeup',function(){
        $(this).slideUp(200);
    });

    $('#content').on('swipedown', function(e) {
        $('#cover').slideDown(200);
    })

    $('#content').on('swipeleft', function(e) {
        mainView.moveNextPage();
    })

    $('#content').on('swiperight', function(e) {
        mainView.movePreviousPage();
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
    var MainView = mainViewFactory();
    var mainView = new MainView(rssStore);

    rssStore.fetch(function(){
        mainView.render();
    });

    window.onpopstate=function(e){
        var hashTag = window.location.hash;
        if(hashTag === null) return;
        var pageNum = parseInt(hashTag.substring(1))
        
    }
})