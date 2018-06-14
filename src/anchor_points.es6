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
                sectionSelector: null
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

            self.$nav = $(self.settings.navSelector);

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

            self.subscribeClickEvent();

        }

        scrollHandler() {
            let self = this;

            self.scrollTop = $(window).scrollTop();
            self.triggerPosition = this.scrollTop + this.windowHeight / 2;

            self.anchorsData.forEach(function (item, index) {

                if (!(item.active) && self.triggerPosition > item.triggerAreaStart && self.triggerPosition < item.triggerAreaEnd) {
                    item.active = true;

                    self.$nav.addClass('active');
                    item.$navItem.addClass('active');
                }

                else if (item.active && !(self.triggerPosition > item.triggerAreaStart && self.triggerPosition < item.triggerAreaEnd)) {
                    item.active = false;

                    self.$nav.removeClass('active');
                    item.$navItem.removeClass('active');
                }
            })
        }


        subscribeClickEvent(){

            let self = this;

            self.anchorsData.forEach(function (item, index) {
                item.$navItem.on('click', function(){

                    $('html, body').animate({
                        scrollTop: item.$sectionElement.offset().top - $(window).height() / 2 + item.sectionHeight / 2
                    }, 700);
                })
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

            self.$nav.append($navList);

            self.anchorsData.forEach(function (item, index) {

                let $navItem = $('<li></li>');

                item.$navItem = $navItem;

                $navList.append($navItem);

            })
        }

        storeSectionElements() {
            let self = this;

            if (self.settings.sectionSelector == null) {
                $(self.$element).find('>*').each(function () {
                    self.anchorsData.push({
                        $sectionElement: $(this)
                    })
                })
            }

            else {
                $(self.settings.sectionSelector).each(function () {
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