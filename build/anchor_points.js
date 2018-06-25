(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Version: 0.1.0
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/anchor_points
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($) {
    var AnchorPoints = function () {
        function AnchorPoints(element, options) {
            _classCallCheck(this, AnchorPoints);

            var self = this;

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

            self.state = {
                isSectionOnScreen: false
            };

            self.prevState = {
                isSectionOnScreen: false
            };

            self.init();
        }

        _createClass(AnchorPoints, [{
            key: 'init',
            value: function init() {
                var self = this;

                self.$nav = $(self.settings.navSelector);

                self.storeSectionElements();
                self.createAndStoreNavItems();

                self.resizeHandler();
                $(window).on('resize', function () {
                    self.resizeHandler();
                });

                self.scrollHandler();
                $(document).on('scroll', function (event) {
                    self.scrollHandler();
                });

                self.subscribeClickEvent();
            }
        }, {
            key: 'scrollHandler',
            value: function scrollHandler() {
                var self = this;

                self.scrollTop = $(window).scrollTop();
                self.triggerPosition = this.scrollTop + this.windowHeight / 2;

                self.anchorsData.forEach(function (item, index) {

                    if (!item.active && self.triggerPosition > item.triggerAreaStart && self.triggerPosition < item.triggerAreaEnd) {
                        item.active = true;

                        item.$navItem.addClass('active');
                    } else if (item.active && !(self.triggerPosition > item.triggerAreaStart && self.triggerPosition < item.triggerAreaEnd)) {
                        item.active = false;

                        item.$navItem.removeClass('active');
                    }
                });

                self.updateNavState();
            }
        }, {
            key: 'updateNavState',
            value: function updateNavState() {

                var self = this;

                self.state.isSectionOnScreen = false;

                self.anchorsData.forEach(function (item, index) {
                    if (item.active) {
                        self.state.isSectionOnScreen = item.active;
                    }
                });

                if (self.state.isSectionOnScreen && !self.prevState.isSectionOnScreen) {
                    self.prevState.isSectionOnScreen = true;

                    self.$nav.trigger('shown.nav.ap');
                } else if (!self.state.isSectionOnScreen && self.prevState.isSectionOnScreen) {
                    self.prevState.isSectionOnScreen = false;
                    self.$nav.trigger('hidden.nav.ap');
                }
            }
        }, {
            key: 'subscribeClickEvent',
            value: function subscribeClickEvent() {
                var self = this;

                self.anchorsData.forEach(function (item, index) {
                    item.$navItem.on('click', function () {

                        $('html, body').animate({
                            scrollTop: item.$sectionElement.offset().top - $(window).height() / 2 + item.sectionHeight / 2
                        }, 700);
                    });
                });
            }
        }, {
            key: 'resizeHandler',
            value: function resizeHandler() {
                var self = this;

                this.windowHeight = $(window).height();
                this.triggerPosition = this.scrollTop + this.windowHeight / 2;

                self.anchorsData.forEach(function (item, index) {
                    var offsetTop = item.$sectionElement.offset().top;

                    item.sectionHeight = item.$sectionElement.outerHeight();
                    item.triggerAreaStart = offsetTop;
                    item.triggerAreaEnd = offsetTop + item.sectionHeight;
                });
            }
        }, {
            key: 'createAndStoreNavItems',
            value: function createAndStoreNavItems() {
                var self = this;

                var $navList = $('<ul>');

                self.$nav.append($navList);

                self.anchorsData.forEach(function (item, index) {

                    var $navItem = $('<li></li>');

                    item.$navItem = $navItem;

                    $navList.append($navItem);
                });
            }
        }, {
            key: 'storeSectionElements',
            value: function storeSectionElements() {
                var self = this;

                if (self.settings.sectionSelector == null) {
                    $(self.$element).find('>*').each(function () {
                        self.anchorsData.push({
                            $sectionElement: $(this)
                        });
                    });
                } else {
                    $(self.settings.sectionSelector).each(function () {
                        self.anchorsData.push({
                            $sectionElement: $(this)
                        });
                    });
                }
            }
        }]);

        return AnchorPoints;
    }();

    $.fn.anchorPoints = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].anchor_points = new AnchorPoints($this[i], opt);else ret = $this[i].anchor_points[opt].apply($this[i].anchor_points, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ })
/******/ ]);
});