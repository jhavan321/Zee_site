/*!
 * Codex Remote - ZEE Digital
 * Felipe H. Stroff
 */
var background = new Vue({
  el: '#background',
  data: {
    imgs: []
  },
  created: function () {
    this.random();
  },
  methods: {
    random: function() {

      $.ajax({
        url : "assets/img/backgrounds",
        success: function (data) {
    
          $("#background").hide();
          $("#background").fadeIn(1000);

          $(data).find("a").attr("href", function (i, img) {
    
              if( img.match(/\.(jpe?g|png|gif)$/) ) {

                var size = background.imgs.length,
                    num = Math.floor(Math.random() * size);

                pushUnique(background.imgs, img);

                if (size > 1) {

                  $("#background").css("background-image", "url('" + background.imgs[num] + "')");

                }else{

                  $("#background").css("background-image", "url('" + background.imgs[0] + "')");
                }
              } 
          });
        },
        error: function(jxhr,e){
          console.error(jxhr.status + " - " + e.responseText);  
        }
      });
    }
  }
}),

news = new Vue({
  el: '#news',
  data: {
    posts: []
  },
  created: function () {

    $.ajax({
      url: 'http://zeers.blogspot.com/feeds/posts/default',
      cache: false,                   
      dataType:'jsonp',          
      success: function(data) {
    
        var posts = $(data).find('entry');
        
        $.each(posts, function(i, post) {
    
          news.posts.push(post);
        });
      },
      error: function(jxhr,e){
        console.error(jxhr.status + " - " + e.responseText);        
      }
    });
  },
  updated: function () {

    $('#news').easyPaginate({
      paginateElement: '.col-img',
      elementsPerPage: 3,
      firstButton: false,
      lastButton: false,
      prevButton: false,
      nextButton: false,
      hashPage: 'news'
    });
  },
  methods: {
    img: function(event) {
        
      var thumbnail = $(event).find('media\\:thumbnail')[0];

      if (thumbnail) {

        var url = thumbnail.getAttribute('url');
        var img = url.replace('/s72-c', '');

        return img;
      }
    },
    title: function(event) {

      var title = $(event).find('title')[0].innerHTML;

      return reduceText(title, 35);
    },
    description: function(event) {

      var title = $(event).find('title')[0].innerHTML;

      return title;
    },
    url: function (event) {

      var url = $(event).find('link')[4].getAttribute('href');

      return url;
    }
  }
}),

footer = document.getElementsByTagName('footer')[0],
details = footer.getElementsByTagName('details');

setInterval(function() {
  background.random();
}, 6000);

toggleFooterSections();

window.onresize = function(event) {

  toggleFooterSections();
}

/* jQuery easing lib */
!function(a){
    "use strict";
    a("a.page-scroll").bind("click",function(e){
        var l=a(this);
        a("html, body").stop().animate({
            scrollTop:a(l.attr("href")).offset().top-50
        },
        1250,"easeInOutExpo"),
        e.preventDefault();
    });
}(jQuery);

function toggleFooterSections() {

  if ( $(window).width() <= 576) {

    for (i = 0; i < details.length; i++) { 

      details[i].removeAttribute('open');
    }

  }else {
    
    for (i = 0; i < details.length; i++) { 

      details[i].setAttribute('open', '');
    }
  }
}

function reduceText(originalText, number) {
  var text;
  if (originalText.length > number) {
      text = originalText.substring(0, number - 5) + '...';
  }else {
      text = originalText;
  }
  return text;
}

function pushUnique(array, item) {
  if(array.indexOf(item) === -1) {
    array.push(item);
  }
}