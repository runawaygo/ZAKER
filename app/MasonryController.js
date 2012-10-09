$(function(){
    $('body').delegate('a','click',function(e){
        e.preventDefault();
    });
    
    $('#content .blog').lightBox();
    $('#content').delegate('.blog','click',function(e){
        var blogView = $(this).data('view');
        blogView.switchSize();
        blogView.$el.addClass('read');
    })
});