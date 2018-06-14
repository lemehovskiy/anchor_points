/*
 Version: 0.1.0
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
                navSelector: null,
                selector: null
            }, options);

            self.$element = $(element);

            //extend by data options
            self.data_options = self.$element.data('anchor-points');
            self.settings = $.extend(true, self.settings, self.data_options);

            self.anchorsData = [];

            self.init();
        }

        init() {
            let self = this;

            self.storeSectionElements();
            self.createAndStoreNavItems();

            self.resizeHandler();
            $(window).on('resize', function () {
                self.resizeHandler();
            })

            self.scrollHandler();
            $(document).on('scroll', function (event) {
                self.scrollHandler();
            });
        }

        scrollHandler() {
            let self = this;

            self.scrollTop = $(window).scrollTop();
            self.triggerPosition = this.scrollTop + this.windowHeight / 2;

            self.anchorsData.forEach(function (item, index) {

                if (self.triggerPosition > item.triggerAreaStart && self.triggerPosition < item.triggerAreaEnd) {
                    item.active = true;
                    item.$navItem.addClass('active');
                }
                else {
                    item.active = false;
                    item.$navItem.removeClass('active');
                }
            })
        }

        resizeHandler() {
            let self = this;

            this.windowHeight = $(window).height();
            this.triggerPosition = this.scrollTop + this.windowHeight / 2;

            self.anchorsData.forEach(function (item, index) {
                let offsetTop = item.$sectionElement.offset().top;

                item.sectionHeight = item.$sectionElement.outerHeight();
                item.triggerAreaStart = offsetTop;
                item.triggerAreaEnd = offsetTop + item.sectionHeight;
            })
        }

        createAndStoreNavItems() {
            let self = this;

            let $navList = $('<ul>');

            $(self.settings.navSelector).append($navList);

            self.anchorsData.forEach(function (item, index) {

                let $navItem = $('<li></li>');

                item.$navItem = $navItem;

                $navList.append($navItem);

            })
        }

        storeSectionElements() {
            let self = this;

            if (self.settings.selector != null) {
                $(self.settings.selector).each(function () {

                    self.anchorsData.push({
                        $sectionElement: $(this)
                    })
                })
            }
        }
    }

    $.fn.anchorPoints = function () {
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