export function initSys() {
  const blockTraffic = () => {
    document.body.innerHTML = `
      <div style="background-color: #000; color: #ff0000; height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 1.5rem; text-align: center; position: fixed; top: 0; left: 0; z-index: 9999999;">
        [SECURITY SYSTEM]<br/><br/>AUTOMATED BOT OR SCRAPER TRAFFIC DETECTED.<br/>ACCESS PERMANENTLY BLOCKED.
      </div>
    `;
    // Force freeze
    while (true) {
      debugger;
    }
  };

  try {
    // 1. Detect Headless Browsers & Automation Frameworks
    const isHeadlessChrome = navigator.userAgent.toLowerCase().includes('headless');
    const isWebDriver = navigator.webdriver === true;
    const hasWebdriverAttribute = document.documentElement.getAttribute('webdriver') !== null;
    const isPuppeteer = navigator.userAgent.includes('Puppeteer');
    
    // @ts-ignore
    const hasPhantomJS = window.callPhantom || window._phantom;
    // @ts-ignore
    const hasSelenium = window.__webdriver_evaluate || window.__selenium_evaluate;

    if (
      isHeadlessChrome || 
      isWebDriver || 
      hasWebdriverAttribute || 
      isPuppeteer || 
      hasPhantomJS || 
      hasSelenium
    ) {
      blockTraffic();
    }

    // 2. Prevent iFrame Embedding (Clickjacking / Unwanted Embeds)
    // Disabled in preview environments
    /*
    if (window.top !== window.self) {
      window.top!.location = window.self.location;
    }
    */

    // 3. DevTools Detection Loop (Cannot be unmounted via React)
    // Disabled aggressive polling as it causes false positives in preview environments
    /*
    setInterval(() => {
        const _0xdevtools = /./;
        _0xdevtools.toString = function() {
            blockTraffic();
            return '';
        }
        console.log('%c', _0xdevtools);
        
        // Classical debugger loop as backup
        const _0x3c4d = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const _0x5e6f = performance.now();
        if (_0x5e6f - _0x3c4d > 100) {
            blockTraffic();
        }
    }, 1000);
    */

  } catch (e) {
    // Silent execution to avoid giving hints
    console.clear();
  }
}
