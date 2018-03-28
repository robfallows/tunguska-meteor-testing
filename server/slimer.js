/**
 * Slimer script
 */

/**
 * Require Dependencies
 */
const webpage = require('webpage');
const system = require('system');
const interval = 500; // 500ms
const page = webpage.create();

let intervalId  = null;

if(!system.env['URL']) {
  console.error(`system.env['URL'] required`);
  slimer.exit(1);
}

/**
 * Configure the viewport to be the standard 1024/768
 */
page.viewportSize = { width:1024, height:768 };

/**
 * Pipe the console messages
 */
page.onConsoleMessage = function (msg, line, file) {
  return console.log(msg);
};

/**
 * Open the webpage and
 */
page.open(system.env['URL']);

/**
 * Evaluate
 */
function evaluate() {
  /**
   * Check for __tests_complete__
   */
  let __tests_complete__ = page.evaluate(function() {
    return window.__tests_complete__;
  });

  /**
   * IF we are complete, we should extract the errors
   */
  if(__tests_complete__) {
    let __tests_failures__ = page.evaluate(function() {
      return window.__tests_failures__;
    });

    /**
     * Close the page as we are now at the end of the test.
     */
    page.close();

    /**
     * Exit with the number of failures
     */
    slimer.exit(__tests_failures__);
    return;
  }

  // page guard, we will exist if there hasn't been console out put for 30s
  if ((new Date) - lastOutput > 30000) {
    slimer.exit(2);
  }
}

intervalId = setInterval(evaluate, interval);
