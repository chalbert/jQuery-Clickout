/**
 * |-----------------|
 * | jQuery-Clickout |
 * |-----------------|
 *  jQuery-Clickout is freely distributable under the MIT license.
 *
 *  <a href="https://github.com/chalbert/Backbone-Elements">More details & documentation</a>
 *
 * @author Nicolas Gilbert
 *
 * @requires jQuery
 */

(function(factory){
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else {
    factory($);
  }

})(function ($){
  'use strict';

     /**
      * A static counter is tied to the doc element to track click-out registration
      * @static
      */
  var counter = 0,

     /**
      * On mobile Touch browsers, 'click' are not triggered on every element.
      * Touchstart is.
      * @static
      */
      click = window.Touch ? 'touchstart' : 'click';


  /**
   * Shortcut for .on('clickout')
   *
   * @param data
   * @param fn
   */

  $.fn.clickout = function(data, fn) {
    if (!fn) {
      fn = data;
      data = null;
    }

    if (arguments.length > 0) {
      this.on('clickout', data, fn);
    } else {
      return this.trigger('clickout');
    }

  };

  /**
   * Implements the 'special' jQuery event interface
   * Native way to add non-conventional events
   */
  jQuery.event.special.clickout = {

    /**
     * When the event is added
     * @param handleObj Event handler
     */

    add: function(handleObj){
      counter++;

      // Add counter to element
      var target = handleObj.selector
          ? $(this).find(handleObj.selector)
          : $(this);
      target.attr('data-clickout', counter);

      // When the click is inside, extend the Event object to mark it as so
      $(this).on(click + '.clickout' + counter, handleObj.selector, function(e){
        e.originalEvent.clickin = $(this).attr('data-clickout');
      });

      // Bind a click event to the document, to be cought after bubbling
      $(document).bind(click + '.clickout' + counter, (function(id){
      // A closure is used create a static id
        return function(e){
          // If the click is not inside the element, call the callback
          if (!e.originalEvent.clickin || e.originalEvent.clickin !== id) {
            handleObj.handler.apply(this, arguments);
          }
        };
      })(counter));
    },

    /**
     * When the event is removed
     * @param handleObj Event handler
     */
    remove: function(handleObj) {
      var target = handleObj.selector
          ? $(this).find(handleObj.selector)
          : $(this)
        , id = target.attr('data-clickout');

      target.removeAttr('data-clickout');

      $(document).unbind(click + '.clickout' + id);
      $(this).off(click + '.clickout' + id, handleObj.selector);
      return false;
    }
  };

  return $;

});