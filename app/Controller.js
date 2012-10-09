$(function(){
// //event listen
    $('#cover').on('swipeup',function(){
        history.pushState({},"content","#content");
        history.go();
    });

    $('#content').on('swipedown', function(e) {
        history.pushState({},"content","#cover");
        history.go();
    })

    $('#content').on('swipeleft', function(e) {
        history.pushState({action:'nextPage'},"content","#content/"+(currentPage+1));
        history.go();
    })

    $('#content').on('swiperight', function(e) {
        history.pushState({action:'previousPage'},"content","#content/"+(currentPage-1));
        history.go();
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
});