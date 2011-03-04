jQuery.ajaxSetup({ 'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript")}});
function slideSwitch() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 5000 );
});

/* Links */
function myAjaxLinks()
{
   $('.navlink').bind('click', function(event){

      var p = $(this);
      var request = p.attr("href");
      $.get(request, function(data){
        $('#subcontent').html(data);
      },'script');

      event.preventDefault();
      return true;
    });
}

$(document).ready(function() {
   slideSwitch();
   $(".lavaLamp").lavaLamp({ fx: "easeinout", speed: 400 });
   myAjaxLinks();
});
