/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 1.0.16
 *
 * Requires: jQuery >= 1.2.3
 */
(function(a){a.fn.addBack=a.fn.addBack||a.fn.andSelf;
a.fn.extend({actual:function(b,l){if(!this[b]){throw'$.actual => The jQuery method "'+b+'" you called does not exist';}var f={absolute:false,clone:false,includeMargin:false};
var i=a.extend(f,l);var e=this.eq(0);var h,j;if(i.clone===true){h=function(){var m="position: absolute !important; top: -1000 !important; ";e=e.clone().attr("style",m).appendTo("body");
};j=function(){e.remove();};}else{var g=[];var d="";var c;h=function(){c=e.parents().addBack().filter(":hidden");d+="visibility: hidden !important; display: block !important; ";
if(i.absolute===true){d+="position: absolute !important; ";}c.each(function(){var m=a(this);var n=m.attr("style");g.push(n);m.attr("style",n?n+";"+d:d);
});};j=function(){c.each(function(m){var o=a(this);var n=g[m];if(n===undefined){o.removeAttr("style");}else{o.attr("style",n);}});};}h();var k=/(outer)/.test(b)?e[b](i.includeMargin):e[b]();
j();return k;}});})(jQuery);

(function( $ ){
  $.fn.retina = function(retina_part) {
      var settings = {'retina_part': '@2x'};
      if(window.devicePixelRatio >= 1.5) {
          this.each(function(index, element) {
              if(!$(element).attr('src')) return;
              var checkForRetina = new RegExp("(.+)("+settings['retina_part']+"\\.\\w{3,4})");
              if(checkForRetina.test($(element).attr('src'))) return;
              var new_image_src = $(element).attr('src').replace(/(.+)(\.\w{3,4})$/, "$1"+ settings['retina_part'] +"$2");
              $.ajax({url: new_image_src, type: "HEAD", success: function() {
                  $(element).width($(element).actual('width')).height($(element).actual('height')).attr('src', new_image_src);
              }});
          });
      }
      return this;
  }

  $(document).ready(function() {
      $('img').each(function() {
          if($(this).attr('src').indexOf('/styles/') == -1) {
              $(this).retina();
          }
      });
  });

})( jQuery );
