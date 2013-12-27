$(function () {

    var pluginName = "mega_slider";
    var defaults = {
        timeOut: 0
    };

    function Plugin ( element, options ) {
        this.$el = $(element);
        this.$list = this.$el.find('ul');
        this.$slides = this.$el.find('ul>li');

        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.currentIndex = 0;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var self = this;

            this.$el.addClass('mega_slider');
            this.createIndicators();

            this.$slides.css({
                width: this.$el.width(),
                height: this.$el.height()
            });

            this.$list.css({
                width: (this.$el.width() * this.$slides.length + 'px')
            });

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
                .css('margin-left', - this.$indicator.width()/2);

            this.$indicator
                .delegate('.dot','click', $.proxy(this.onIndicatorClick, this));
        },

        onIndicatorClick: function(e){
            this.resetTimeOut();
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

            this.$list
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



