# tunguska:meteor-testing

This is a fork of the `centiq:testing` meteor driver package for running mocha tests, the project uses [SlimerJS](https://slimerjs.org/) to interact with the front end.

## Why did we created our own driver package?

We had issues running [PhantomJS](http://phantomjs.org/) with the [practicalmeteor:mocha](https://atmospherejs.com/practicalmeteor/mocha) and [dispatchme:meteor-mocha-phantomjs](https://github.com/DispatchMe/meteor-mocha).

SlimerJS is presented as having the same behaviors as PhantomJS, however whereas PhantomJS is built on top of Webkit and JavascriptCore, SlimerJS is built on Gecko and SpiderMonkey.

More [differences](https://docs.slimerjs.org/current/differences-with-phantomjs.html)

## Usage

`meteor test-packages --driver-package=tunguska:meteor-testing`

or

`meteor test --driver-package=tunguska:meteor-testing`

## Environment variables

- `SERVER_ONLY_TESTS=1`: To run only server side tests you can create an environment variable called `SERVER_ONLY_TESTS` and set it to 1.
- `AUTO_EXIT=1: Best used in conjunction with `meteor test --once`: terminates the meteor process and test runner.
- `SLIMERJSLAUNCHER=/path/to/firefox`: slimer tries to find firefox, but this tells it where it should go. Useful for pinning firefox to a predifined version.
