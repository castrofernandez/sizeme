'use strict';

// https://www.lullabot.com/articles/importing-css-breakpoints-into-javascripta

var moduleSettings = {
  forceJsSizes: false,
  sizes: [
    {
      type: 'mobile',
      maxWidth: 767
    },
    {
      type: 'tablet',
      maxWidth: 1024
    },
    {
      type: 'small_desktop',
      maxWidth: 1200
    }
  ]
};

var sizeme = (function() {
  function load(settings) {
    for (var key in settings) {
      moduleSettings[key] = settings[key];
    }
  }

  function getCssDeviceType() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '');
  }

  function getDocumentWidth() {
    return typeof document !== 'undefined' && document.body ? document.body.clientWidth : null;
  }

  function getTypePerWidth() {
    var documentWidth = getDocumentWidth();
    var previousWidth = 0;
    var length = moduleSettings.sizes.length;
    var size, maxWidth;

    for (var i = 0; i < length; i++) {
      size = moduleSettings.sizes[i];
      maxWidth = size.maxWidth;

      if (documentWidth > previousWidth && documentWidth <= maxWidth) {
        return size.type;
      }

      previousWidth = maxWidth;
    }

    return 'desktop';
  }

  function getDeviceType() {
    if (!moduleSettings.forceJsSizes) {
      var type = getCssDeviceType();

      if (type !== 'none' && type !== '')  {
        return type;
      }
    }

    return getTypePerWidth();
  }

  function isMobile() {
    return getDeviceType() === 'mobile';
  }

  function isTablet() {
    return getDeviceType() === 'tablet';
  }

  function isSmallDesktop() {
    return getDeviceType() === 'small_desktop';
  }

  function isDesktop() {
    return getDeviceType() === 'desktop';
  }

  function isResponsive() {
    return isMobile() || isTablet();
  }

  return {
    load: load,
    getDeviceType: getDeviceType,
    isMobile: isMobile,
    isTablet: isTablet,
    isSmallDesktop: isSmallDesktop,
    isDesktop: isDesktop,
    isResponsive: isResponsive
  };
})();

if (typeof module !== 'undefined') {
  module.exports = sizeme;
}
