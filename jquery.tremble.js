(function($){
    $.fn.tremble = function(options){
        var options = $.extend({
                                    amplitude: [
                                                ['top', '+=5px'],
                                                ['left', '+=5px'],
                                                ['top', '-=5px'],
                                                ['left', '-=5px'],
                                                
                                                ['top', '+=10px'],
                                                ['left', '+=10px'],
                                                ['top', '-=10px'],
                                                ['left', '-=10px'],
                                                
                                                ['top', '+=2px'],
                                                ['left', '+=2px'],
                                                ['top', '-=2px'],
                                                ['left', '-=2px']
                                                ]
                                  },options);

        var $this = $(this);
        var initState = [];
        var _count = 0;
        var addWrapper = function() {
            //initState
            $(this).attr('rel', _count);
            initState[_count] = {
                                    left: $(this).css('left'),
                                    top: $(this).css('top'),
                                    opacity: 1
                                };    
            _count++;
            $this.css('position', 'relative');
        };
        $this.init = function() {
            $this.mouseenter(function(){
                var key = 0;
                function _animate (obj, key) {
                        var animate_options = {};
                        animate_options[options.amplitude[key][0]] = options.amplitude[key][1];
                        $(obj).animate(animate_options,1, function(){
                            key++;
                            if (key<options.amplitude.length)
                                _animate(obj, key);
                        });
                }
                _animate(this, key);
            });
            $this.mouseleave(function(){
                $(this).stop();
                $(this).css(initState[$(this).attr('rel')]);
            });
        };
        $this.init();
        return $this.each(addWrapper);
    };
})(jQuery);   
