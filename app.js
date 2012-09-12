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

    $('#content').delegate('h2','click',function(event){
        $blog = $(this).parent();
        if($blog.hasClass('fullscreen')){
            $blog.removeClass('fullscreen');
            $blog.animate($blog.data('size'),200);
        }
        else{
            $blog.addClass('fullscreen');
            $blog.data('size',{width:$blog.width(),height:$blog.height()});
            var width = $('body').width();
            var height = $('body').height();
            $blog.animate({width:width-10,height:height-10},200);
        }
        event.stopPropagation();
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