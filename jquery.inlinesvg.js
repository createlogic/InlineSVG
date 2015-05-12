/*!
 * jquery.inlinesvg
 * https://github.com/createlogic/InlineSVG
 * Copyright (c) 2010 - 2015 Bilal Niaz Awan
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.1.0
 */

(function($){
    $.fn.inlineSVG = function(options){

        options = $.extend({
            eachAfter: null,
            allAfter: null
        }, (options || {}));

        var $list = this;
        var counter = 0;

        return $list.each(function(){

            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

                // Callback for each element
                options.eachAfter && options.eachAfter.call($svg.get(0));

                // Check for all is completed
                if (++counter === $list.length) {
                    options.allAfter && options.allAfter.call(null);
                }

            }, 'xml');


        });
    };
})(jQuery);
