/*!
 * InlineSVG
 *
 * This is a jQuery plugin that takes an image selector as an argument having a
 * SVG as source. Then it inlines the SVG so that the SVG stroke and path can
 * be manipulated using plain CSS.
 *
 * @license MIT
 * @version 2.0.0
 * @see {@link https://github.com/createlogic/InlineSVG|GitHub}
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2010-2015 Bilal Niaz Awan
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {

    'use strict';

    /**
     * @name jQuery
     * @constructor
     */

    /**
     * @callback jQuery.inlineSVG~eachAfter
     * @this DOM
     */

    /**
     * @callback jQuery.inlineSVG~allAfter
     * @this null
     */

    /**
     * @callback jQuery.inlineSVG~beforeReplace
     * @param {jQuery} $img - Source <img> element
     * @param {jQuery} $svg - <svg> element to replace
     * @param {jQuery.inlineSVG~beforeReplaceNext} next - Callback to next element
     * @this null
     */

    /**
     * @callback jQuery.inlineSVG~beforeReplaceNext
     * @param {Boolean} [replace=true] - Replace element otherwise just go to next
     */

    /**
     * @typedef {Object} jQuery.inlineSVG~options
     * @property {?jQuery.inlineSVG~eachAfter} [eachAfter] - Callback for each replaced <img> element
     * @property {?jQuery.inlineSVG~allAfter} [allAfter] - Callback after all <img> elements is replaced
     * @property {?jQuery.inlineSVG~beforeReplaceCallback} [beforeReplace] - Callback for each item before replaced
     * @property {?String} [replacedClass='replaced-svg'] - Class name to add to new <svg> DOM-element
     * @property {Boolean} [keepSize=true] - Set "width" and "height" attributes from source <img> to new <svg>
     * @property {Boolean} [keepStyle=true] - Set "style" attribute from source <img> to new <svg>
     */

    /**
     * @name inlineSVG
     * @memberof jQuery
     * @param {jQuery.inlineSVG~options} [options]
     * @this jQuery
     * @returns {jQuery} Source jQuery instance
     * @public
     * @static
     */
    $.fn.inlineSVG = function (options) {

        options = $.extend({
            eachAfter: null,
            allAfter: null,
            beforeReplace: null,
            replacedClass: 'replaced-svg',
            keepSize: true,
            keepStyle: true
        }, (options || {}));

        var $list = this;
        var counter = 0;

        return $list.each(function () {

            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            $.get(imgURL, function (data) {

                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
                var classes = [];

                // Add replaced image's ID to the new SVG
                if (imgID) {
                    $svg.attr('id', imgID);
                }

                // Add replaced image's classes to the new SVG
                if (imgClass) {
                    classes.push(imgClass);
                }
                if (options.replacedClass) {
                    classes.push(options.replacedClass);
                }
                $svg.attr('class', classes.join(' '));

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg.removeAttr('xmlns:a');

                if (options.keepSize) {
                    var w = $img.attr('width');
                    var h = $img.attr('height');

                    if (w) {
                        $svg.attr('width', w);
                    }
                    if (h) {
                        $svg.attr('height', h);
                    }
                }
                if (options.keepStyle) {
                    var style = $img.attr('style');

                    if (style) {
                        $svg.attr('style', style);
                    }
                }

                function cb(replace) {

                    replace = ($.type(replace) === 'boolean') ? replace : true;

                    if (replace) {
                        // Replace image with new SVG
                        $img.replaceWith($svg);

                        // Callback for each element
                        options.eachAfter && options.eachAfter.call($svg.get(0));
                    } else {
                        $svg.remove();
                    }

                    // Check for all is completed
                    if (++counter === $list.length) {
                        options.allAfter && options.allAfter.call(null);
                    }
                }

                if (options.beforeReplace) {
                    options.beforeReplace.call(null, $img, $svg, cb);
                } else {
                    cb();
                }

            }, 'xml');

        });
    };
})(jQuery);
