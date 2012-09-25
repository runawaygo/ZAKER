window.bus = $(window);

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

    var rssStore = new RssStore("rss.xml");
    var MainView = mainViewFactory();
    var mainView = new MainView(rssStore);
    var currentPage  = 1;

    rssStore.fetch(function(){
        mainView.render();
        bus.trigger('dataReady');
    });

    window.onpopstate=function(e){     
        var hashTag = window.location.hash;
        if(hashTag === null) return;

        hashTags = hashTag.substring(1).split('/');
        
        console.log(history);

        if(hashTags[0] == 'content'){
            $('#cover').slideUp(200);
            if(hashTags.length == 2){
                currentPage = parseInt(hashTags[1]);
                bus.bind('dataReady',function(){
                    for(var i=currentPage;i>0;i--){
                      var delay = (currentPage - i+1)*1000;  
                      console.log(delay);
                      setTimeout(function(){
                        mainView.moveNextPage();
                      },delay);
                    }
                })
                if(history.state.action == 'nextPage'){
                    mainView.moveNextPage();
                }
                else if(history.state.action == 'previousPage'){
                    mainView.movePreviousPage();
                }
            }
        }
        else if(hashTag[0] == 'cover'){
            $('#cover').slideDown(200);
        }
    }
})