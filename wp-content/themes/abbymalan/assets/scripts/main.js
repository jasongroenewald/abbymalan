/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {

        function equalHeight(group) {
          if (Modernizr.mq('only screen and (min-width: 768px)')) {
            group.removeAttr('style'); 
            var tallest = 0;

            group.each(function() { 
              tallest = Math.max($(this).height(),tallest); 
            });

            group.height(tallest); 
          } else {
            group.removeAttr('style');
          }
        }

        function balanceHeight() {
    
            $(".two-row").each(function() {
              equalHeight($(this).find(".card .inner"));
            });
        }

        balanceHeight();

        $( window ).resize(function() {
            balanceHeight();

            equalHeight("#related .inner");
        });

        $('a[href*="#"]:not([href="#"]):not(blank)').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });

        $('.social-sharing-click').click(function() {
          var URL = $(this).attr("href");
          var title = $(this).attr("title");
          
          if(title == 'Share on Twitter') {
          window.open(URL, title, 'width=550,height=235');  
          }

          if(title == 'Share on Facebook') {
          window.open(URL, title, 'width=580,height=296');  
          }

          if(title == 'Share on Google+') {
          window.open(URL, title, 'width=490,height=530');  
          }

          return false;
        });

        if( $(".floating-back").length) {

          var $document = $(document),
              $element = $('.floating-back'),
              className = 'hasScrolled';

          var $el = $('#body');  //record the elem so you don't crawl the DOM everytime  
          var bottom = $el.position().top + $el.outerHeight(true);

          $document.scroll(function() {
            if ($(window).height() + $(window).scrollTop() > (bottom - 100)) {
              $element.addClass(className);
            } else {
              $element.removeClass(className);
            }
          });
        }

        $("#menu_toggle").click(function() {
            $("#overflow-menu").addClass('open');
            $(".overlay").addClass('active');
            $("body,html").addClass('freeze');
        });

        $("#close-menu").click(function() {
            $("#overflow-menu").removeClass('open');
            $(".overlay").removeClass('active');
            $("body,html").removeClass('freeze');
        });

        $(".overlay").click(function() {
            $("#overflow-menu").removeClass('open');
            $(this).removeClass('active');
            $("body,html").removeClass('freeze');
        });

        if( $("#testimonial-slider").length) {

          $('#testimonial-slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 600,
            adaptiveHeight: true,
            initialSlide: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable: true,
            autoplay: true,
            autoplaySpeed: 7000
          });
        }
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
