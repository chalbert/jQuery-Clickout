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

### Mobile support

In case of a touch device, the 'touchstart' event is used in place of 'click', as 
Webkit mobile doesn't register 'click' events on every element.