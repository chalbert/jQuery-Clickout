define(['jquery'], function($){

  var counter = 0,
      click = window.Touch ? 'touchstart' : 'click';

  $.fn.clickout = function(data, fn) {
    if (fn == null) {
      fn = data;
      data = null;
    }

    if (arguments.length > 0) {
      this.on('clickout', data, fn);
    } else {
      return this.trigger('clickout');
    }

  };

  // Add a special jQuery event
  jQuery.event.special.clickout = {
    add: function(handleObj){
      counter++;
      $(this).find(handleObj.selector).attr('data-clickout', counter);
      $(this).on(click + '.clickout' + counter, handleObj.selector, function(e){
        e.stopPropagation();
      });
      $(document).bind(click + '.clickout' + counter, function(e){
        if (handleObj.data && handleObj.data.propagate !== true) e.stopPropagation();
        handleObj.handler.apply(this, arguments);
      });
    },

    remove: function(handleObj) {
      var id = $(this).attr('data-clickout');
      $(document).unbind(click + '.clickout' + id);
      $(this).off(click + '.clickout' + id, handleObj.selector);
      $(this).find(handleObj.selector).removeAttr('data-clickout');
      return false;
    }
  };

  return $;

});

