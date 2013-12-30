$(function () {

    var pluginName = "mega_slider";
    var defaults = {
        timeOut: 0
    };

    function Plugin ( element, options ) {
        this.$el = $(element).wrapInner('<div class = "mega-slider"/>');
        this.$slidesEl = this.$el.find('.mega-slide-element');
        console.log(this.$slidesEl.eq(0).width());

        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.currentIndex = 0;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var self = this;
            var viewportWidth = this.$el.width();
            var currentSlideWidth = 0;
            var slidesIndex = [];

            this.$slidesEl.each( function(index, el){
                var $el = $(el);
                if( currentSlideWidth - $el.width() <= 0 ){
                    currentSlideWidth = viewportWidth;
                    slidesIndex.push([]);
                }
                currentSlideWidth -= $el.width();
                slidesIndex[ slidesIndex.length - 1 ].push( index );
            });

            for (var i = slidesIndex.length - 1; i >= 0; i--) {
                this.$slidesEl
                    .filter( function(index,el){
                        return $.inArray(index, slidesIndex[i]) > -1;
                    })
                    .wrapAll('<div class = "mega-slide" />');
            }

            this.$slides = this.$el.find('.mega-slide');
            this.createIndicators();

            if( this.settings.timeOut ){
                this.resetTimeOut();
            }
        },

        onTimeOut:function(){
            this.resetTimeOut();
            this.nextSlide();
        },

        resetTimeOut:function(){
            var self = this;
            clearTimeout(this.timeOutId);
            this.timeOutId = setTimeout(function(){
                self.onTimeOut();
            },this.settings.timeOut);
        },

        createIndicators:function(){
            this.$indicator = $('<div/>',{ class: 'indicator' })
                .append( $('<div/>',{ class: 'dot filled' }) );

            var count = this.$slides.length - 1;

            while(count-->0){
                this.$indicator.append( $('<div/>',{ class: 'dot' }) );
            }

            this.$indicator
                .appendTo( this.$el )
                .css('margin-left', - this.$indicator.width()/2)
                .delegate('.dot','click', $.proxy(this.onIndicatorClick, this));
        },

        onIndicatorClick: function(e){
            if( this.timeOutId ) this.resetTimeOut();
            this.changeSlideTo( $(e.target).index() );
        },

        nextSlide: function () {
            this.changeSlideTo( this.currentIndex + 1 );
        },

        changeSlideTo:function(index){
            if( this.currentIndex == index )return;

            this.currentIndex = index;
            if( this.currentIndex > ( this.$slides.length - 1 )){
                this.currentIndex = 0;
            } else if(this.currentIndex < 0){
                this.currentIndex = this.$slides.length - 1;
            }

            this.$el
                .stop(true)
                .animate({
                    'left': -(this.currentIndex * this.$el.width())
                });

            this.$indicator
                .find('.dot')
                .removeClass('filled')
                .eq( this.currentIndex )
                .addClass('filled');
        },

        prevSlide: function(){
            this.changeSlideTo(this.currentIndex - 1);
        }
    };

    $.fn[ pluginName ] = function ( optionsOrMehtodName ) {
        return this.each(function() {
            var plugin = $.data( this, "plugin_" + pluginName )
            if ( !plugin ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, optionsOrMehtodName ) );
            } else if( optionsOrMehtodName in plugin && $.isFunction(plugin[optionsOrMehtodName])){
                    plugin[optionsOrMehtodName].call(plugin);
            }

        });
    };

});



