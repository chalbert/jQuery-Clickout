# jQuery-Clickout

jQuery plugin for to track clicks outside of an element.

This plugins uses event delegation and stopPropagation(). If you want to preserve the bubbling 
of your click events, don't use this plugin. Otherwise, use simply:

    $('.box').clickout(funcion(){
      ...
    });
    
Also works with normal binding:

    $('.box').on('clickout', funcion(){
      ...
    });

And to unbind

    $('.box').off('clickout');
    
This plugin implement the native `jQuery.event.special`. 