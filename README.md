# sizeme
Library to measure browser size based on CSS or JS configuration.

1. Install 

```
npm install sizeme
```

2. Usage

```
var sizeme = require('sizeme');

// You can set sizes in JS:
sizeme.load({
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
});

// OR in CSS (CSS is checked first so it overwrites JS)
<style>
    body:before {
        content: "mobile";
        display: none; /* Prevent from displaying. */
    }

    @media (min-width: 700px) {
        body:before {
            content: "tablet";
        }
    }

    @media (min-width: 1100px) {
        body:before {
            content: "desktop";
        }
    }

    @media (min-width: 1400px) {
        body:before {
            content: "big_desktop";
        }
    }
</style>

sizeme.getDeviceType();
sizeme.isMobile();
sizeme.isDesktop();
```

3. Run tests

```
npm start // or node server.js
npm test
```

4. List of methods

* load: sets configuration settings
* getDeviceType: returns the name of current device
* isMobile: returns true if the document size matches mobile width
* isTablet: returns true if the document size matches tablet width
* isSmallDesktop: returns true if the document size matches small desktop width
* isDesktop: returns true if the document size matches desktop width
* isResponsive: returns true if the document size matches mobile or tablet width