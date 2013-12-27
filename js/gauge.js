$(function(){
   $('.circleGauge').each(function(index,el){
        var $el = $(el);
        $('<div/>',{class:'innerBorderCircle'}).appendTo( $el );
        $('<div/>',{class:'innerCircle'})
            .append( $('<div/>',{class:'innerText'}) )
            .appendTo( $el );
        $('<div/>',{class:'arc'}).appendTo( $el );
        $('<div/>',{class:'arc rotated'}).appendTo( $el );
        $('<div/>',{class:'arc mask'}).appendTo( $el );
        $('<div/>',{class:'arc rotated mask'}).appendTo( $el );
        $('<div/>',{class:'innerShadowCircle'}).appendTo( $el );

        var amount = parseFloat($el.data('gauge-amount'));
        var rotateDegree = amount * 360;

        $el.find('.innerText').text( $el.data('gauge-text') );
        var classname = ['red', 'orange', 'green', 'green'][~~(amount/0.251)];
        $el.addClass(classname);

        if( rotateDegree < 180 ){
            $el.find('.arc.mask:not(.rotated)').css({
                '-webkit-transform': 'rotate(' + rotateDegree + 'deg)',
                '-moz-transform': 'rotate(' + rotateDegree + 'deg)',
                '-ms-transform': 'rotate(' + rotateDegree + 'deg)',
                '-o-transform': 'rotate(' + rotateDegree + 'deg)',
                'transform': 'rotate(' + rotateDegree + 'deg)'
            });
        } else {
            $el.find('.arc.mask.rotated').css({
                '-webkit-transform': 'rotate(' + rotateDegree + 'deg)',
                '-moz-transform': 'rotate(' + rotateDegree + 'deg)',
                '-ms-transform': 'rotate(' + rotateDegree + 'deg)',
                '-o-transform': 'rotate(' + rotateDegree + 'deg)',
                'transform': 'rotate(' + rotateDegree + 'deg)'
            })
            .end()
                .find('.arc.mask:not(.rotated)')
                .css({
                    '-webkit-transform': 'rotate(' + rotateDegree + 'deg)',
                    '-moz-transform': 'rotate(' + rotateDegree + 'deg)',
                    '-ms-transform': 'rotate(' + rotateDegree + 'deg)',
                    '-o-transform': 'rotate(' + rotateDegree + 'deg)',
                    'transform': 'rotate(' + rotateDegree + 'deg)'
                })
            .end()
                .find('.arc:not(.rotated)').not('.mask').css('z-index',300)
            .end();

        }

    });

}) ;
