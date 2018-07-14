$(document).ready(function(){
  $('.single-service').on('mouseenter', function(){
		$('.single-service').removeClass('active');
		$(this).addClass('active');
	});
  //Toggle tooltip
  $('.lis').tooltip()	
  //Image filteration
  $(".lis").click(function(){
        var value = $(this).attr('data-filter');        
        if(value == "all")
        {
            $('.each').show('1000');
        }
        else
        {
            $(".each").not('.'+value).hide('3000');//who does not have hide them
            $('.each').filter('.'+value).show('3000'); //who has the value show them
        }
        
        if ($(".lis").hasClass("active")) {
            $(".lis").removeClass("active");
            }
            $(this).addClass("active");
    });
  //Counter
  $('.counter').counterUp({
      delay: 10,
      time: 1000
  });
  //button hover effect at subscribe
  $('#subscribe button').hover(function(){
    $('.form-display .form-group input').toggleClass('addborder');
  });
  //contact form labels arrangement
  $('.contactcard .form-group input, .contactcard .form-group textarea').focusout(function(){
    var text_val = $(this).val()
    if(text_val === ""){
      $(this).removeClass('has-value');
    }else{
      $(this).addClass('has-value');
    }
  });
  //Carousel testimonial
  $('#testimonial_carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      dotsData: true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:1
          }
      }
  });	
  //blog carousel
  $('#blog_carousel').owlCarousel({
      loop:true,
      margin:25,
      nav:true,
      navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:3
          }
      }
  });

  //Alert
  $("#msgbtn").click(function(){
    $('.top-right').notify({
      message:{
        text: 'Thank you for contacting us!'
      }
    }).show()
  })
  
  // Second Nav has different offset - adjusting the same
  $("ul.nav li:eq(1) a").on('click', function(e){
    e.preventDefault();
    var o = $($(this).attr("href")).offset().top;
    var p = $('.navbar').outerHeight(true);
    var sT = (o - p) - 50
    window.scrollTo(0, sT);
  });
  //Map pointer events disabling untill clicked
    $('.googlemap').on('click', function () {
      // alert("inside");
      $('.googlemap iframe').css("pointer-events", "auto");
    });
    // disable pointer events when the mouse leave the canvas area;
    $(".googlemap").mouseleave(function () {
      // alert("mouseleave");
      $('.googlemap iframe').css("pointer-events", "none");
    });
    
    //Typed.js effect
    var typed = new Typed('#typed', {
      stringsElement: '#typed-strings',
      loop: true,
      backSpeed: 100,
      typeSpeed: 100,
      smartBackspace: false,
      cursorChar: '_',
      backDelay: 2000
    });
    
    //smooth scroll
    // Select all links with hashes
    $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .not('[href="#about-me"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              };
            });
          }
        }
      });
    
      // Second Nav has different offset - adjusting the same
      $("ul.nav li:eq(1) a").on('click', function(e){
        e.preventDefault();
        var o = $($(this).attr("href")).offset().top;
        var p = $('.navbar').outerHeight(true);
        var sT = (o - p) - 50
        window.scrollTo(0, sT);
      });
    
});
// contact form related stuff
$(function () {
    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator
    $('#contact-form').validator();
    // when the form is submitted
    $('#contact-form').on('submit', function (e) {
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // data = JSON object that contact.php returns
                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        $('#contact-form').find('.messages').html(alertBox);
                        // empty the form
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    })
});