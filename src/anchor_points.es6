/*
 Version: 1.0.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/anchor_points
 */

'use strict';

(function ($) {

    class AnchorPoints {

        constructor(element, options) {

            let self = this;
            
            //extend by function call
            self.settings = $.extend(true, {
               
                test_property: false
                
            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('anchor-points');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.init();
            
        }

        init(){
            let self = this;
        }
    }


    $.fn.anchorPoints = function() {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].anchor_points = new AnchorPoints($this[i], opt);
        else
            ret = $this[i].anchor_points[opt].apply($this[i].anchor_points, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);