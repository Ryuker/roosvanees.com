jQuery(document).ready(function () {

  if(jQuery(window).outerWidth() < 1185) {
    jQuery('<i class="fas fa-chevron-down"></i>').insertBefore('nav > ul > li.menu-item-has-children > ul');
    // jQuery('<span class="subpull"><i class="fas fa-chevron-down"></i></span>').insertBefore('ul.nav > li.menu-item-has-children > ul');
    jQuery('nav ul.depth-0').addClass('closed');
    jQuery('nav').addClass('hidden-nav');
    jQuery('nav > ul > li').on('click', function(){
      jQuery(this).children('.depth-0').toggleClass('closed', '');
      jQuery(this).find(' > a > i').toggleClass('fa-chevron-up', 'fa-chevron-down');
      // jQuery(this).find(' > a > span.subpull > i').toggleClass('fa-chevron-up', 'fa-chevron-down');
    });
  } else {
    jQuery('.menu-item-has-children').append('<i class="fas fa-chevron-down"></i>');
  }

  jQuery('.button--popup').on('click',function(event){
    event.preventDefault();

    //console.log('open popup');
    var popup = jQuery(this).data('id');
    jQuery('#'+popup).removeClass('d-none');
  });
  jQuery('.popup--close').on('click',function(){
    //console.log('close popup');
    var popup = jQuery(this).data('id');
    jQuery('#'+popup).addClass('d-none');
  });


  // Navigation toggle 
  jQuery('.nav--toggle').click(function() {
    if (!jQuery('.show-nav')[0]) {
      jQuery('.nav--toggle i').removeClass('fa-bars');
      jQuery('.nav--toggle i').addClass('fa-times');
      jQuery('body').addClass('mobile-nav-open');
    } else {
      jQuery('.nav--toggle i').removeClass('fa-times');
      jQuery('.nav--toggle i').addClass('fa-bars');
      jQuery('body').removeClass('mobile-nav-open');
    }
    jQuery('nav').toggleClass('show-nav', '');
  });

  jQuery('.usp--slider').slick({
    autoplay:false,
    dots: false,
    arrows: false,
    // prevArrow: false,
    // nextArrow: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true,
    // centerMode: true,
    // centerPadding: '60px',
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

   
  jQuery('.review--slider').slick({
    autoplay:false,
    dots: true,
    arrows: false,
    // prevArrow: false,
    // nextArrow: false,
    slidesToShow: 3, 
    slidesToScroll: 1,
    infinite: true,
    // centerMode: true,
    // centerPadding: '60px',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  
  jQuery('.nextSlide').click(function(){
    jQuery('.review--slider').slick('slickNext');
  });
 
});

var target = jQuery(".navbar").offset().top + jQuery(".navbar").outerHeight(),
    timeout = null;

jQuery(window).scroll(function () {
    if (!timeout) {
        timeout = setTimeout(function () {
            console.log('scroll');  
            clearTimeout(timeout);
            timeout = null;
            if (jQuery(window).scrollTop() >= target) {
              jQuery('.navbar').addClass('fixed');
            } else {
              jQuery('.navbar').removeClass('fixed');
            }
        }, 250);
    }
});