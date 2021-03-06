(function($) {
  'use strict';

  // Resize code blocks to fit the screen width

  /**
   * Code block resizer
   * @param {String} elem
   * @constructor
   */
  var CodeBlockResizer = function(elem) {
    this.$codeBlocks = $(elem);
    this.$sidebar = $('#sidebar');
  };

  CodeBlockResizer.prototype = {
    /**
     * Run main feature
     * @return {void}
     */
    run: function() {
      var self = this;
      setTimeout(function() {
        self.resize();
      }, 100);
      // resize codeblocks when window is resized
      $(window).resize(function() {
        self.resize();
      });
    },

    /**
     * Resize codeblocks
     * @return {void}
     */
    resize: function() {
      var self = this;
      self.$codeBlocks.each(function() {
        if (self.$codeBlocks.parent('.tabs-content')) {
          var code = $(this).find('td.code');
          var table = $(this).find('table');
          var windowWidth = $(window).width();
          var gutter = table.find('.gutter');
          var gutterWidth = gutter.outerWidth(); // always 15px;
          var paddingLeft = parseInt(code.css('padding-left').substr(0, 2), 10);
          var paddingRight = parseInt(code.css('padding-right').substr(0, 2), 10);

          if (windowWidth < 768 || gutter.length <= 0) {
            gutterWidth = 0;
          }
          var width = table.width() - gutterWidth - paddingRight - paddingLeft;
          code.find('pre').css('width', width);
        }
      });
    }
  };

  $(document).ready(function() {
    // register jQuery function to check if an element has an horizontal scroll bar
    $.fn.hasHorizontalScrollBar = function() {
      return this.get(0).scrollWidth > this.innerWidth();
    };
    var resizer = new CodeBlockResizer('figure.highlight');
    resizer.run();
  });
})(jQuery);
