'use strict';

// Describe

var _tracky = require('../../../index');

var eventKey = 'orientation';

var eventOptions = {
  events: {
    orientation: {
      enable: true,
      face: 'display-up',
      breakpoints: [
        50, [18, 55, 66], '30%', {
          css: {
            alpha: 'orientation-tracker-alpha',
            beta: 'orientation-tracker-beta',
            gamma: 'orientation-tracker-gamma',
            alphaLeft: 'orientation-tracker-alpha-left',
            alphaRight: 'orientation-tracker-alpha-right',
            betaDown: 'orientation-tracker-beta-down',
            betaUp: 'orientation-tracker-beta-up',
            gammaRight: 'orientation-tracker-gamma-right',
            gammaLeft: 'orientation-tracker-gamma-left',
          },
          value: ['15%', 66, 99],
          onMatch: function () {
            return 'match';
          },
          onUnmatch: function () {
            return 'unmatch';
          },
          onMatchAlpha: function () {
            return 'match-alpha';
          },
          onMatchBeta: function () {
            return 'match-beta';
          },
          onMatchGamma: function () {
            return 'match-gamma';
          },
          onUnmatchAlpha: function () {
            return 'unmatch-alpha';
          },
          onUnmatchBeta: function () {
            return 'un-match-beta';
          },
          onUnmatchGamma: function () {
            return 'un-match-gamma';
          },
          onMatchAlphaLeft: function () {
            return 'match-alpha-left';
          },
          onMatchAlphaRight: function () {
            return 'match-alpha-right';
          },
          onMatchBetaUp: function () {
            return 'match-beta-up';
          },
          onMatchBetaDown: function () {
            return 'match-beta-down';
          },
          onMatchGammaLeft: function () {
            return 'match-gamma-left';
          },
          onMatchGammaRight: function () {
            return 'match-gamma-right';
          },
          onUnmatchAlphaLeft: function () {
            return 'un-match-alpha-left';
          },
          onUnmatchAlphaRight: function () {
            return 'un-match-alpha-right';
          },
          onUnmatchBetaUp: function () {
            return 'un-match-beta-up';
          },
          onUnmatchBetaDown: function () {
            return 'un-match-beta-down';
          },
          onUnmatchGammaLeft: function () {
            return 'un-match-gamma-left';
          },
          onUnmatchGammaRight: function () {
            return 'un-match-gamma-right';
          }
        }, {
          value: [
            '15%',
            '88%',
            45
          ]
        }, {
          value: {
            alpha: 44,
            beta: 88,
            gamma: '66%',
          }
        }, {
          css: 'hit-any-orientation',
          value: 40,
        }, {
          value: {
            alpha: 13,
            gamma: 88,
          }
        }
      ]
    }
  }
};

var eventOptionsDisabled = {
  events: {
    orientation: {
      enable: false
    }
  }
};


var mockedDomNode = {
  nodeName: 'BODY',
  scrollTop: 25,
  scrollLeft: 88,
  scrollHeight: 100,
  scrollWidth: 888,
  offsetWidth: 0,
  offsetHeight: 0,
  addEventListener: function () {
  },
  removeEventListener: function () {
  },
  getBoundingClientRect: function () {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 1000,
      height: 1000,
    }
  },
};

var mockedDomNodeNotBody = {
  nodeName: 'SOMETHINGELSE',
  scrollTop: 25,
  scrollLeft: 88,
  scrollHeight: 100,
  scrollWidth: 888,
  offsetWidth: 0,
  offsetHeight: 0,
  addEventListener: function () {
  },
  removeEventListener: function () {
  },
  getBoundingClientRect: function () {
    return {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: 1000,
      height: 1000,
    }
  },
};

var mockedEvent = {
  target: mockedDomNodeNotBody,
  alpha: 44,
  beta: 66,
  gamma: 88,
};

var mockedEventNegative = {
  target: mockedDomNodeNotBody,
  alpha: -44,
  beta: -66,
  gamma: -88,
};

var mockedEventStay = {
  target: mockedDomNodeNotBody,
  alpha: 0,
  beta: 0,
  gamma: 0,
};

var trackyDefault = new _tracky('body', eventOptions);
trackyDefault._nodes = [[mockedDomNode, mockedDomNode], [mockedDomNodeNotBody, mockedDomNode]];

var trackyDefaultNoOrientation = new _tracky('body', eventOptionsDisabled);
var trackyOrientation = trackyDefault._listeners.filter(
  function (l) {
    return l.key === eventKey;
  }
)[0].instance;


describe(
  'tracky.orientation.js constructor', function () {

    it(
      'should provide an orientation instance', function () {
        expect(
          function () {
            return trackyDefault._listeners.filter(
              function (l) {
                return l.key === eventKey;
              }
            )[0].instance;
          }
        ).not.toThrowError();
      }
    );

    it(
      'should not provide an orientation instance when enable is set as false', function () {

        var instanceType = typeof (trackyDefaultNoOrientation._listeners.filter(
          function (l) {
            return l.key === eventKey;
          }
        )[0]).instance;

        expect(instanceType).toEqual('undefined');
      }
    );

    it(
      'should bind the event key as a string', function () {
        expect(trackyOrientation._key).toBeDefined();
        expect(trackyOrientation._key).toEqual(eventKey);
      }
    );

    it(
      'should bind the parent tracky instance', function () {
        expect(trackyOrientation._tracky).toBeDefined();
        // Todo: find a way how to make this check work
        // expect(trackyOrientation._tracky).toBe(jasmine.any(_tracky));
      }
    );

    it(
      'should bind the orientation event options', function () {
        expect(trackyOrientation._options).toBeDefined();
        expect(trackyOrientation._options).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the global event options', function () {
        expect(trackyOrientation._globalOptions).toBeDefined();
        expect(trackyOrientation._globalOptions).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the enabled flag', function () {
        expect(trackyOrientation._enabled).toBeDefined();
        expect(trackyOrientation._enabled).toEqual(true);
      }
    );

    it(
      'should transform breakpoints as an array', function () {
        expect(trackyOrientation._options.breakpoints).toBeDefined();
        expect(!!(trackyOrientation._options.breakpoints instanceof Array)).toEqual(true);
      }
    );

    it(
      'should have classNames extracted and bound', function () {
        expect(trackyOrientation._classNames).toBeDefined();
        expect(!!(trackyOrientation._classNames instanceof Array)).toEqual(true);

        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-50');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-18');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-55');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-66');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-18');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-18');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-55');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-55');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-66');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-66');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-30pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-30pc');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-alpha');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-beta');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-gamma');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-alpha-left');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-alpha-right');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-beta-up');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-beta-down');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-gamma-left');
        expect(trackyOrientation._classNames).toContain('orientation-tracker-gamma-right');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-15pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-88pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-45');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-15pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-15pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-88pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-88pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-45');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-45');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-44');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-88');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-66pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-44');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-44');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-88');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-88');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-66pc');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-66pc');
        expect(trackyOrientation._classNames).toContain('hit-any-orientation');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-up-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-beta-down-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-40');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-13');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-88');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-left-13');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-alpha-right-13');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-left-88');
        expect(trackyOrientation._classNames).toContain('tracky-orientation-gamma-right-88');

      }
    );

    it(
      'should define a public start method', function () {
        expect(trackyOrientation.start).toBeDefined();
        expect(trackyOrientation.start).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public stop method', function () {
        expect(trackyOrientation.stop).toBeDefined();
        expect(trackyOrientation.stop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStart method', function () {
        expect(trackyOrientation.onStart).toBeDefined();
        expect(trackyOrientation.onStart).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStop method', function () {
        expect(trackyOrientation.onStop).toBeDefined();
        expect(trackyOrientation.onStop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public add method', function () {
        expect(trackyOrientation.add).toBeDefined();
        expect(trackyOrientation.add).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onAdd method', function () {
        expect(trackyOrientation.onAdd).toBeDefined();
        expect(trackyOrientation.onAdd).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public remove method', function () {
        expect(trackyOrientation.remove).toBeDefined();
        expect(trackyOrientation.remove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onRemove method', function () {
        expect(trackyOrientation.onRemove).toBeDefined();
        expect(trackyOrientation.onRemove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public enable method', function () {
        expect(trackyOrientation.enable).toBeDefined();
        expect(trackyOrientation.enable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public disable method', function () {
        expect(trackyOrientation.disable).toBeDefined();
        expect(trackyOrientation.disable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public attachClasses method', function () {
        expect(trackyOrientation.attachClasses).toBeDefined();
        expect(trackyOrientation.attachClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public cleanupClasses method', function () {
        expect(trackyOrientation.cleanupClasses).toBeDefined();
        expect(trackyOrientation.cleanupClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _listener method', function () {
        expect(trackyOrientation._listener).toBeDefined();
        expect(trackyOrientation._listener).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private bindEvent method', function () {
        expect(trackyOrientation.bindEvent).toBeDefined();
        expect(trackyOrientation.bindEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _percentRound method', function () {
        expect(trackyOrientation._percentRound).toBeDefined();
        expect(trackyOrientation._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _getOrientation method', function () {
        expect(trackyOrientation._getOrientation).toBeDefined();
        expect(trackyOrientation._getOrientation).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public bindEvents method', function () {
        expect(trackyOrientation.bindEvents).toBeDefined();
        expect(trackyOrientation.bindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public unbindEvents method', function () {
        expect(trackyOrientation.unbindEvents).toBeDefined();
        expect(trackyOrientation.unbindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _buildClassName method', function () {
        expect(trackyOrientation._buildClassName).toBeDefined();
        expect(trackyOrientation._buildClassName).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _extractClasses method', function () {
        expect(trackyOrientation._extractClasses).toBeDefined();
        expect(trackyOrientation._extractClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public classify method', function () {
        expect(trackyOrientation.classify).toBeDefined();
        expect(trackyOrientation.classify).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a private _applyCallbacks method', function () {
        expect(trackyOrientation._applyCallbacks).toBeDefined();
        expect(trackyOrientation._applyCallbacks).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a public callbackHandler method', function () {
        expect(trackyOrientation.callbackHandler).toBeDefined();
        expect(trackyOrientation.callbackHandler).toEqual(jasmine.any(Function));
      }
    );

  }
);


describe(
  'tracky.orientation.js - _listener', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation._listener).toBeDefined();
        expect(trackyOrientation._listener).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation._listener()).toEqual(undefined);
        expect(trackyOrientation._listener(mockedEvent)).toEqual(undefined);
      }
    );

  }
);


describe(
  'tracky.orientation.js - bindEvent', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.bindEvent).toBeDefined();
        expect(trackyOrientation.bindEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        var mockedDomNode = {};
        var mockedDomNodeEventListener = {
          addEventListener: function () {
          }
        };
        expect(trackyOrientation.bindEvent()).toEqual(undefined);
        expect(trackyOrientation.bindEvent(mockedDomNode)).toEqual(undefined);
        expect(trackyOrientation.bindEvent(mockedDomNodeEventListener)).toEqual(undefined);
      }
    );

  }
);

describe(
  'tracky.orientation.js - _getOrientation', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation._getOrientation).toBeDefined();
        expect(trackyOrientation._getOrientation).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should return an object', function () {
        expect(trackyOrientation._getOrientation()).toEqual(null);
      }
    );

    it(
      'method should return an object.absolute', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).absolute).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).absolute).toEqual(jasmine.any(Object));
      }
    );

    it(
      'method should return an object.absolute.alpha', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.alpha).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.alpha).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.absolute.beta', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.beta).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.beta).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.absolute.gamma', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.gamma).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).absolute.gamma).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.percent', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).percent).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).percent).toEqual(jasmine.any(Object));
      }
    );

    it(
      'method should return an object.percent.alpha', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).percent.alpha).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).percent.alpha).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.percent.beta', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).percent.beta).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).percent.beta).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.percent.gamma', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).percent.gamma).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).percent.gamma).toEqual(jasmine.any(Number));
      }
    );

    it(
      'method should return an object.direction', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).direction).toBeDefined();
        expect(trackyOrientation._getOrientation(mockedEvent).direction).toEqual(jasmine.any(Object));
      }
    );

    it(
      'method should return an object.direction.alpha', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).direction.alpha).toBeDefined();
        expect(
          ['stay', 'left', 'right'].indexOf(trackyOrientation._getOrientation(mockedEvent).direction.alpha)
        ).toBeGreaterThan(-1);
      }
    );

    it(
      'method should return an object.direction.beta', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).direction.beta).toBeDefined();
        expect(
          ['stay', 'up', 'down'].indexOf(trackyOrientation._getOrientation(mockedEvent).direction.beta)
        ).toBeGreaterThan(-1);
      }
    );

    it(
      'method should return an object.direction.gamma', function () {
        expect(trackyOrientation._getOrientation(mockedEvent).direction.gamma).toBeDefined();
        expect(
          ['stay', 'left', 'right'].indexOf(trackyOrientation._getOrientation(mockedEvent).direction.gamma)
        ).toBeGreaterThan(-1);
      }
    );

    it(
      'method should return current orientation - default display-up', function () {

        var sp = trackyOrientation._getOrientation(mockedEvent);
        var spNegative = trackyOrientation._getOrientation(mockedEventNegative);
        var spStay = trackyOrientation._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(44);
        expect(sp.absolute.beta).toEqual(66);
        expect(sp.absolute.gamma).toEqual(88);
        expect(sp.percent.alpha).toEqual(12);
        expect(sp.percent.beta).toEqual(37);
        expect(sp.percent.gamma).toEqual(98);
        expect(sp.direction.alpha).toEqual('left');
        expect(sp.direction.beta).toEqual('down');
        expect(sp.direction.gamma).toEqual('right');

        expect(spNegative.absolute.alpha).toEqual(44);
        expect(spNegative.absolute.beta).toEqual(66);
        expect(spNegative.absolute.gamma).toEqual(88);
        expect(spNegative.percent.alpha).toEqual(12);
        expect(spNegative.percent.beta).toEqual(37);
        expect(spNegative.percent.gamma).toEqual(98);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('up');
        expect(spNegative.direction.gamma).toEqual('left');

        expect(spStay.absolute.alpha).toEqual(0);
        expect(spStay.absolute.beta).toEqual(0);
        expect(spStay.absolute.gamma).toEqual(0);
        expect(spStay.percent.alpha).toEqual(0);
        expect(spStay.percent.beta).toEqual(0);
        expect(spStay.percent.gamma).toEqual(0);
        expect(spStay.direction.alpha).toEqual('stay');
        expect(spStay.direction.beta).toEqual('stay');
        expect(spStay.direction.gamma).toEqual('stay');
      }
    );

    it(
      'method should return current orientation - default display-down', function () {

        var toFaced = trackyOrientation.setFace('display-down');
        var sp = toFaced._getOrientation(mockedEvent);
        var spNegative = toFaced._getOrientation(mockedEventNegative);
        var spStay = toFaced._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(44);
        expect(sp.absolute.beta).toEqual(114);
        expect(sp.absolute.gamma).toEqual(88);
        expect(sp.percent.alpha).toEqual(12);
        expect(sp.percent.beta).toEqual(63);
        expect(sp.percent.gamma).toEqual(98);
        expect(sp.direction.alpha).toEqual('left');
        expect(sp.direction.beta).toEqual('up');
        expect(sp.direction.gamma).toEqual('right');

        expect(spNegative.absolute.alpha).toEqual(44);
        expect(spNegative.absolute.beta).toEqual(246);
        expect(spNegative.absolute.gamma).toEqual(88);
        expect(spNegative.percent.alpha).toEqual(12);
        expect(spNegative.percent.beta).toEqual(137);
        expect(spNegative.percent.gamma).toEqual(98);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('up');
        expect(spNegative.direction.gamma).toEqual('left');

        expect(spStay.absolute.alpha).toEqual(0);
        expect(spStay.absolute.beta).toEqual(180);
        expect(spStay.absolute.gamma).toEqual(0);
        expect(spStay.percent.alpha).toEqual(0);
        expect(spStay.percent.beta).toEqual(100);
        expect(spStay.percent.gamma).toEqual(0);
        expect(spStay.direction.alpha).toEqual('stay');
        expect(spStay.direction.beta).toEqual('up');
        expect(spStay.direction.gamma).toEqual('stay');
      }
    );

    it(
      'method should return current orientation - portrait', function () {

        var toFaced = trackyOrientation.setFace('portrait');
        var sp = toFaced._getOrientation(mockedEvent);
        var spNegative = toFaced._getOrientation(mockedEventNegative);
        var spStay = toFaced._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(44);
        expect(sp.absolute.beta).toEqual(24);
        expect(sp.absolute.gamma).toEqual(88);
        expect(sp.percent.alpha).toEqual(12);
        expect(sp.percent.beta).toEqual(13);
        expect(sp.percent.gamma).toEqual(98);
        expect(sp.direction.alpha).toEqual('left');
        expect(sp.direction.beta).toEqual('up');
        expect(sp.direction.gamma).toEqual('right');

        expect(spNegative.absolute.alpha).toEqual(44);
        expect(spNegative.absolute.beta).toEqual(156);
        expect(spNegative.absolute.gamma).toEqual(88);
        expect(spNegative.percent.alpha).toEqual(12);
        expect(spNegative.percent.beta).toEqual(87);
        expect(spNegative.percent.gamma).toEqual(98);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('up');
        expect(spNegative.direction.gamma).toEqual('left');

        expect(spStay.absolute.alpha).toEqual(0);
        expect(spStay.absolute.beta).toEqual(90);
        expect(spStay.absolute.gamma).toEqual(0);
        expect(spStay.percent.alpha).toEqual(0);
        expect(spStay.percent.beta).toEqual(50);
        expect(spStay.percent.gamma).toEqual(0);
        expect(spStay.direction.alpha).toEqual('stay');
        expect(spStay.direction.beta).toEqual('up');
        expect(spStay.direction.gamma).toEqual('stay');
      }
    );

    it(
      'method should return current orientation - portrait-upside-down', function () {

        var toFaced = trackyOrientation.setFace('portrait-upside-down');
        var sp = toFaced._getOrientation(mockedEvent);
        var spNegative = toFaced._getOrientation(mockedEventNegative);
        var spStay = toFaced._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(136);
        expect(sp.absolute.beta).toEqual(156);
        expect(sp.absolute.gamma).toEqual(88);
        expect(sp.percent.alpha).toEqual(38);
        expect(sp.percent.beta).toEqual(87);
        expect(sp.percent.gamma).toEqual(98);
        expect(sp.direction.alpha).toEqual('right');
        expect(sp.direction.beta).toEqual('down');
        expect(sp.direction.gamma).toEqual('right');

        expect(spNegative.absolute.alpha).toEqual(224);
        expect(spNegative.absolute.beta).toEqual(24);
        expect(spNegative.absolute.gamma).toEqual(88);
        expect(spNegative.percent.alpha).toEqual(62);
        expect(spNegative.percent.beta).toEqual(13);
        expect(spNegative.percent.gamma).toEqual(98);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('down');
        expect(spNegative.direction.gamma).toEqual('left');

        expect(spStay.absolute.alpha).toEqual(180);
        expect(spStay.absolute.beta).toEqual(90);
        expect(spStay.absolute.gamma).toEqual(0);
        expect(spStay.percent.alpha).toEqual(50);
        expect(spStay.percent.beta).toEqual(50);
        expect(spStay.percent.gamma).toEqual(0);
        expect(spStay.direction.alpha).toEqual('right');
        expect(spStay.direction.beta).toEqual('down');
        expect(spStay.direction.gamma).toEqual('stay');
      }
    );

    it(
      'method should return current orientation - landscape-left', function () {

        var toFaced = trackyOrientation.setFace('landscape-left');
        var sp = toFaced._getOrientation(mockedEvent);
        var spNegative = toFaced._getOrientation(mockedEventNegative);
        var spStay = toFaced._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(44);
        expect(sp.absolute.beta).toEqual(24);
        expect(sp.absolute.gamma).toEqual(178);
        expect(sp.percent.alpha).toEqual(12);
        expect(sp.percent.beta).toEqual(13);
        expect(sp.percent.gamma).toEqual(198);
        expect(sp.direction.alpha).toEqual('left');
        expect(sp.direction.beta).toEqual('up');
        expect(sp.direction.gamma).toEqual('right');

        expect(spNegative.absolute.alpha).toEqual(44);
        expect(spNegative.absolute.beta).toEqual(156);
        expect(spNegative.absolute.gamma).toEqual(2);
        expect(spNegative.percent.alpha).toEqual(12);
        expect(spNegative.percent.beta).toEqual(87);
        expect(spNegative.percent.gamma).toEqual(2);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('up');
        expect(spNegative.direction.gamma).toEqual('right');

        expect(spStay.absolute.alpha).toEqual(0);
        expect(spStay.absolute.beta).toEqual(90);
        expect(spStay.absolute.gamma).toEqual(90);
        expect(spStay.percent.alpha).toEqual(0);
        expect(spStay.percent.beta).toEqual(50);
        expect(spStay.percent.gamma).toEqual(100);
        expect(spStay.direction.alpha).toEqual('stay');
        expect(spStay.direction.beta).toEqual('up');
        expect(spStay.direction.gamma).toEqual('right');
      }
    );

    it(
      'method should return current orientation - landscape-right', function () {

        var toFaced = trackyOrientation.setFace('landscape-right');
        var sp = toFaced._getOrientation(mockedEvent);
        var spNegative = toFaced._getOrientation(mockedEventNegative);
        var spStay = toFaced._getOrientation(mockedEventStay);

        expect(sp.absolute.alpha).toEqual(44);
        expect(sp.absolute.beta).toEqual(24);
        expect(sp.absolute.gamma).toEqual(2);
        expect(sp.percent.alpha).toEqual(12);
        expect(sp.percent.beta).toEqual(13);
        expect(sp.percent.gamma).toEqual(2);
        expect(sp.direction.alpha).toEqual('left');
        expect(sp.direction.beta).toEqual('up');
        expect(sp.direction.gamma).toEqual('left');

        expect(spNegative.absolute.alpha).toEqual(44);
        expect(spNegative.absolute.beta).toEqual(156);
        expect(spNegative.absolute.gamma).toEqual(178);
        expect(spNegative.percent.alpha).toEqual(12);
        expect(spNegative.percent.beta).toEqual(87);
        expect(spNegative.percent.gamma).toEqual(198);
        expect(spNegative.direction.alpha).toEqual('right');
        expect(spNegative.direction.beta).toEqual('up');
        expect(spNegative.direction.gamma).toEqual('left');

        expect(spStay.absolute.alpha).toEqual(0);
        expect(spStay.absolute.beta).toEqual(90);
        expect(spStay.absolute.gamma).toEqual(90);
        expect(spStay.percent.alpha).toEqual(0);
        expect(spStay.percent.beta).toEqual(50);
        expect(spStay.percent.gamma).toEqual(100);
        expect(spStay.direction.alpha).toEqual('stay');
        expect(spStay.direction.beta).toEqual('up');
        expect(spStay.direction.gamma).toEqual('left');
      }
    );

  }
);


describe(
  'tracky.orientation.js - _faceCorrection', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation._faceCorrection).toBeDefined();
        expect(trackyOrientation._faceCorrection).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation._faceCorrection()).toEqual(null);
      }
    );

    it(
      'method should return corrected values for portrait', function () {

        var toFaced = trackyOrientation.setFace('portrait');

        var orientation = {
          alpha : 0,
          beta : 90,
          gamma : 0,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

    it(
      'method should return corrected values for display-up', function () {

        var toFaced = trackyOrientation.setFace('display-up');

        var orientation = {
          alpha : 0,
          beta : 0,
          gamma : 0,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

    it(
      'method should return corrected values for portrait-upside-down', function () {

        var toFaced = trackyOrientation.setFace('portrait-upside-down');

        var orientation = {
          alpha : 180,
          beta : -90,
          gamma : 0,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

    it(
      'method should return corrected values for landscape-left', function () {

        var toFaced = trackyOrientation.setFace('landscape-left');

        var orientation = {
          alpha : 0,
          beta : 90,
          gamma : -90,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

    it(
      'method should return corrected values for landscape-right', function () {

        var toFaced = trackyOrientation.setFace('landscape-right');

        var orientation = {
          alpha : 0,
          beta : 90,
          gamma : 90,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

    it(
      'method should return corrected values for display-down', function () {

        var toFaced = trackyOrientation.setFace('display-down');

        var orientation = {
          alpha : 0,
          beta : 180,
          gamma : 0,
        };

        var fcObj = toFaced._faceCorrection(orientation);

        expect(fcObj.alpha).toEqual(0);
        expect(fcObj.beta).toEqual(0);
        expect(fcObj.gamma).toEqual(0);

      }
    );

  }
);

describe(
  'tracky.orientation.js - getFace', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.getFace).toBeDefined();
        expect(trackyOrientation.getFace).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation.getFace()).toEqual('display-down');
      }
    );

    it(
      'method should return set face-direction', function () {
        expect(trackyOrientation.setFace('portrait').getFace()).toEqual('portrait');
        expect(trackyOrientation.setFace('portrait-upside-down').getFace()).toEqual('portrait-upside-down');
        expect(trackyOrientation.setFace('landscape-left').getFace()).toEqual('landscape-left');
        expect(trackyOrientation.setFace('landscape-right').getFace()).toEqual('landscape-right');
        expect(trackyOrientation.setFace('display-up').getFace()).toEqual('display-up');
        expect(trackyOrientation.setFace('display-down').getFace()).toEqual('display-down');
        expect(trackyOrientation.setFace('somethingweird').getFace()).toEqual(trackyOrientation.getFaces().default);
      }
    );

  }
);

describe(
  'tracky.orientation.js - getFaces', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.getFaces).toBeDefined();
        expect(trackyOrientation.getFaces).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(function() { trackyOrientation.getFaces(); }).not.toThrowError();
      }
    );

    it(
      'should return an object', function () {
        var facesType = typeof trackyOrientation.getFaces();
        expect(facesType).toEqual('object');
      }
    );

    it(
      'should return an object with property list', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toBeDefined();
      }
    );

    it(
      'should return an object with property list that contains portrait', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('portrait');
      }
    );

    it(
      'should return an object with property list that contains portrait-upside-down', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('portrait-upside-down');
      }
    );

    it(
      'should return an object with property list that contains landscape-left', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('landscape-left');
      }
    );

    it(
      'should return an object with property list that contains landscape-right', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('landscape-right');
      }
    );

    it(
      'should return an object with property list that contains display-up', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('display-up');
      }
    );

    it(
      'should return an object with property list that contains display-down', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.list).toContain('display-down');
      }
    );

    it(
      'should return an object with property default', function () {
        var faces = trackyOrientation.getFaces();
        expect(faces.default).toBeDefined();
      }
    );

  }
);

describe(
  'tracky.orientation.js - bindEvents', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.bindEvents).toBeDefined();
        expect(trackyOrientation.bindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation.bindEvents()).toEqual(undefined);
        expect(trackyOrientation.bindEvents()).toEqual(undefined);
      }
    );

  }
);

describe(
  'tracky.orientation.js - unbindEvents', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.unbindEvents).toBeDefined();
        expect(trackyOrientation.unbindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation.unbindEvents()).toEqual(undefined);
        expect(trackyOrientation.unbindEvents()).toEqual(undefined);
      }
    );

  }
);


describe(
  'tracky.orientation.js - onStart', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.onStart).toBeDefined();
        expect(trackyOrientation.onStart).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation.onStart()).toEqual(undefined);
        expect(trackyOrientation.onStart()).toEqual(undefined);
      }
    );

    it(
      'should assign a _bindListener', function () {

        trackyOrientation.onStart();

        expect(trackyOrientation._bindListener).toBeDefined();
        expect(
          function () {
            trackyOrientation._bindListener(mockedEvent);
          }
        ).not.toThrowError();
      }
    );

  }
);

describe(
  'tracky.orientation.js - onStop', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.onStop).toBeDefined();
        expect(trackyOrientation.onStop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'method should be callable as function', function () {
        expect(trackyOrientation.onStop()).toEqual(undefined);
        expect(trackyOrientation.onStop()).toEqual(undefined);
      }
    );

    it(
      'should assign a _bindListener', function () {

        trackyOrientation.onStart();

        expect(trackyOrientation._bindListener).toBeDefined();
        expect(
          function () {
            trackyOrientation._bindListener(mockedEvent);
          }
        ).not.toThrowError();
      }
    );

  }
);

describe(
  'tracky.orientation.js - onAdd', function () {

    it(
      'should be defined', function () {
        expect(trackyOrientation.onAdd).toBeDefined();
        expect(trackyOrientation.onAdd).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should be callable as function', function () {
        expect(trackyOrientation.onAdd()).toEqual(undefined);
        expect(trackyOrientation.onAdd()).toEqual(undefined);
        expect(trackyOrientation.onAdd([mockedDomNodeNotBody, mockedDomNode])).toEqual(undefined);
      }
    );


  }
);

describe(
  'tracky.orientation.js - onRemove', function () {

    it(
      'should be defined', function () {
        expect(trackyOrientation.onRemove).toBeDefined();
        expect(trackyOrientation.onRemove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should be callable as function', function () {
        expect(trackyOrientation.onRemove()).toEqual(undefined);
        expect(trackyOrientation.onRemove()).toEqual(undefined);
        expect(trackyOrientation.onRemove([mockedDomNodeNotBody, mockedDomNode])).toEqual(undefined);
      }
    );


  }
);

describe(
  'tracky.orientation.js - callbackHandler', function () {

    it(
      'should be defined', function () {
        expect(trackyOrientation.callbackHandler).toBeDefined();
        expect(trackyOrientation.callbackHandler).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should be callable as function', function () {
        expect(trackyOrientation.callbackHandler()).toEqual(undefined);
        expect(trackyOrientation.callbackHandler()).toEqual(undefined);
        expect(
          trackyOrientation.callbackHandler(mockedDomNodeNotBody, ['added-class', 'another-one'], ['removed-class'])
        ).toEqual(undefined);
      }
    );


  }
);

describe(
  'tracky.orientation.js - getNodes', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation.getNodes).toBeDefined();
        expect(trackyOrientation.getNodes).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyOrientation.getNodes()).toEqual(jasmine.any(Array));
      }
    );

    it(
      'should return nodes from the parent tracky instance', function () {
        expect(trackyOrientation.getNodes()).toEqual(trackyDefault._nodes);
      }
    );

  }
);

describe(
  'tracky.orientation.js - _percentRound', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation._percentRound).toBeDefined();
        expect(trackyOrientation._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an integer', function () {
        expect(trackyOrientation._percentRound(55.66)).toEqual(jasmine.any(Number));
        expect(trackyOrientation._percentRound('test')).toEqual(jasmine.any(Number));
        expect(trackyOrientation._percentRound('28%')).toEqual(jasmine.any(Number));
      }
    );

    it(
      'should return a rounded percent value', function () {
        expect(trackyOrientation._percentRound(55.6666687998797564)).toEqual(56);
        expect(trackyOrientation._percentRound(44)).toEqual(44);
        expect(trackyOrientation._percentRound(0)).toEqual(0);
        expect(trackyOrientation._percentRound(-66.44589)).toEqual(-66);
        expect(trackyOrientation._percentRound(-555)).toEqual(-555);
      }
    );


    it(
      'should return 0 on malformed arguments', function () {
        expect(trackyOrientation._percentRound(false)).toEqual(0);
        expect(trackyOrientation._percentRound(null)).toEqual(0);
        expect(trackyOrientation._percentRound({})).toEqual(0);
        expect(trackyOrientation._percentRound(true)).toEqual(0);
        expect(trackyOrientation._percentRound(NaN)).toEqual(0);
      }
    );

  }
);

describe(
  'tracky.orientation.js - _transformValue', function () {

    var goodInput = 44;
    var goodInput2 = '44%';
    var goodInput3 = [44, {percent: true}];
    var goodInput4 = 55.666;
    var goodInput5 = -55;
    var goodInput6 = -55.666;
    var goodInput7 = '-55.666%';
    var malformed1 = null;
    var malformed2 = false;
    var malformed3 = {nonodename: 'haha'};
    var malformed4 = NaN;
    var malformed5 = 'burumm';
    var malformed6 = true;
    var malformed7 = ['44%', {percent: true}];
    var malformed8 = [['44%', {percent: true}], [22, {percent: false}]];

    it(
      'method should be defined', function () {
        expect(trackyOrientation._transformValue).toBeDefined();
        expect(trackyOrientation._transformValue).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array with length of two on valid inputs', function () {
        expect(trackyOrientation._transformValue(goodInput).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput2).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput3).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput4).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput5).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput6).length).toEqual(2);
        expect(trackyOrientation._transformValue(goodInput7).length).toEqual(2);
      }
    );

    it(
      'should return an integer at index 0 on valid inputs ', function () {

        expect(trackyOrientation._transformValue(goodInput)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput2)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput3)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput4)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput5)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput6)[0]).toEqual(jasmine.any(Number));
        expect(trackyOrientation._transformValue(goodInput7)[0]).toEqual(jasmine.any(Number));

        expect(trackyOrientation._transformValue(goodInput)[0]).toEqual(44);
        expect(trackyOrientation._transformValue(goodInput2)[0]).toEqual(44);
        expect(trackyOrientation._transformValue(goodInput3)[0]).toEqual(44);
        expect(trackyOrientation._transformValue(goodInput4)[0]).toEqual(55.666);
        expect(trackyOrientation._transformValue(goodInput5)[0]).toEqual(-55);
        expect(trackyOrientation._transformValue(goodInput6)[0]).toEqual(-55.666);
        expect(trackyOrientation._transformValue(goodInput7)[0]).toEqual(-55);

      }
    );

    it(
      'should return null on invalid inputs ', function () {

        expect(trackyOrientation._transformValue(malformed1)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed2)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed3)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed4)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed5)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed6)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed7)).toEqual(null);
        expect(trackyOrientation._transformValue(malformed8)).toEqual(null);

      }
    );


  }
);

describe(
  'tracky.orientation.js - _transformValueMatrix', function () {

    var goodInput = 50;
    var goodInput2 = [18, 55, 66];
    var goodInput3 = '30%';
    var goodInput4 = [[44, {percent: false}]];
    var malformed1 = null;
    var malformed2 = false;
    var malformed3 = {nonodename: 'haha'};
    var malformed4 = NaN;
    var malformed5 = 'burumm';
    var malformed6 = true;

    it(
      'method should be defined', function () {
        expect(trackyOrientation._transformValueMatrix).toBeDefined();
        expect(trackyOrientation._transformValueMatrix).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an object with property alpha', function () {
        expect(trackyOrientation._transformValueMatrix(goodInput).alpha).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).alpha).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).alpha).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput4).alpha).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput).alpha).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput2).alpha).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput3).alpha).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput4).alpha).not.toEqual(null);
      }
    );

    it(
      'should return an object with property beta', function () {
        expect(trackyOrientation._transformValueMatrix(goodInput).beta).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).beta).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).beta).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput4).beta).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput).beta).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput2).beta).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput3).beta).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput4).beta).toEqual(null);
      }
    );

    it(
      'should return an object with property gamma', function () {
        expect(trackyOrientation._transformValueMatrix(goodInput).gamma).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).gamma).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).gamma).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput4).gamma).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput).gamma).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput2).gamma).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput3).gamma).not.toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput4).gamma).toEqual(null);
      }
    );

    it(
      'should return an integer at index 0 on valid inputs ', function () {

        expect(trackyOrientation._transformValueMatrix(goodInput).alpha[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).alpha[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).alpha[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput4).alpha[0]).toBeDefined();

        expect(trackyOrientation._transformValueMatrix(goodInput).alpha[0]).toEqual(50);
        expect(trackyOrientation._transformValueMatrix(goodInput2).alpha[0]).toEqual(18);
        expect(trackyOrientation._transformValueMatrix(goodInput3).alpha[0]).toEqual(30);
        expect(trackyOrientation._transformValueMatrix(goodInput4).alpha[0]).toEqual(44);

        expect(trackyOrientation._transformValueMatrix(goodInput).beta[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).beta[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).beta[0]).toBeDefined();

        expect(trackyOrientation._transformValueMatrix(goodInput).beta[0]).toEqual(50);
        expect(trackyOrientation._transformValueMatrix(goodInput2).beta[0]).toEqual(55);
        expect(trackyOrientation._transformValueMatrix(goodInput3).beta[0]).toEqual(30);
        expect(trackyOrientation._transformValueMatrix(goodInput4).beta).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(goodInput).gamma[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput2).gamma[0]).toBeDefined();
        expect(trackyOrientation._transformValueMatrix(goodInput3).gamma[0]).toBeDefined();

        expect(trackyOrientation._transformValueMatrix(goodInput).gamma[0]).toEqual(50);
        expect(trackyOrientation._transformValueMatrix(goodInput2).gamma[0]).toEqual(66);
        expect(trackyOrientation._transformValueMatrix(goodInput3).gamma[0]).toEqual(30);
        expect(trackyOrientation._transformValueMatrix(goodInput4).gamma).toEqual(null);

      }
    );

    it(
      'should return null or object with null values on invalid inputs ', function () {

        expect(trackyOrientation._transformValueMatrix(malformed1)).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed2)).toEqual(null);

        expect(trackyOrientation._transformValueMatrix(malformed3).alpha).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed3).beta).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed3).gamma).toEqual(null);

        expect(trackyOrientation._transformValueMatrix(malformed4)).toEqual(null);

        expect(trackyOrientation._transformValueMatrix(malformed5).alpha).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed5).beta).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed5).gamma).toEqual(null);

        expect(trackyOrientation._transformValueMatrix(malformed6).alpha).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed6).beta).toEqual(null);
        expect(trackyOrientation._transformValueMatrix(malformed6).gamma).toEqual(null);

      }
    );

  }
);

describe(
  'tracky.orientation.js - _transformBreakpoints', function () {

    it(
      'method should be defined', function () {
        expect(trackyOrientation._transformBreakpoints).toBeDefined();
        expect(trackyOrientation._transformBreakpoints).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyOrientation._transformBreakpoints([])).toEqual(jasmine.any(Array));
        expect(trackyOrientation._transformBreakpoints(null)).toEqual(jasmine.any(Array));
        expect(trackyOrientation._transformBreakpoints(false)).toEqual(jasmine.any(Array));
        expect(trackyOrientation._transformBreakpoints({})).toEqual(jasmine.any(Array));
        expect(trackyOrientation._transformBreakpoints(NaN)).toEqual(jasmine.any(Array));
        expect(trackyOrientation._transformBreakpoints(eventOptions.events.orientation.breakpoints)).toEqual(
          jasmine.any(Array)
        );
      }
    );

    it(
      'should return an array with objects', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array with objects having property css', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.css).toBeDefined();
              expect(bp.css).toEqual(jasmine.any(Object));
              expect(bp.css.alpha).toBeDefined();
              expect(bp.css.beta).toBeDefined();
              expect(bp.css.gamma).toBeDefined();
              expect(bp.css.alphaRight).toBeDefined();
              expect(bp.css.alphaLeft).toBeDefined();
              expect(bp.css.betaUp).toBeDefined();
              expect(bp.css.betaDown).toBeDefined();
              expect(bp.css.gammaRight).toBeDefined();
              expect(bp.css.gammaLeft).toBeDefined();
            }
          );
      }
    );

    it(
      'should return an array with objects having property apply(alpha/beta/gamma) as boolean',
      function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.applyAlpha).toBeDefined();
              expect(bp.applyAlpha).toEqual(jasmine.any(Boolean));
              expect(bp.applyBeta).toBeDefined();
              expect(bp.applyBeta).toEqual(jasmine.any(Boolean));
              expect(bp.applyGamma).toBeDefined();
              expect(bp.applyGamma).toEqual(jasmine.any(Boolean));
            }
          );
      }
    );

    it(
      'should return an array with objects having property value', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.value).toBeDefined();
              expect(bp.value.alpha).toBeDefined();
              expect(bp.value.beta).toBeDefined();
              expect(bp.value.gamma).toBeDefined();
            }
          );
      }
    );

    it(
      'should return a callbacks property with having properties match/unmatch', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.match).toBeDefined();
              expect(bp.callbacks.unmatch).toBeDefined();
            }
          );
      }
    );

    it(
      'should return a callbacks property with having properties match(Axis)', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.matchAlpha).toBeDefined();
              expect(bp.callbacks.matchBeta).toBeDefined();
              expect(bp.callbacks.matchGamma).toBeDefined();
              expect(bp.callbacks.matchAlphaRight).toBeDefined();
              expect(bp.callbacks.matchAlphaLeft).toBeDefined();
              expect(bp.callbacks.matchBetaUp).toBeDefined();
              expect(bp.callbacks.matchBetaDown).toBeDefined();
              expect(bp.callbacks.matchGammaLeft).toBeDefined();
              expect(bp.callbacks.matchGammaRight).toBeDefined();
            }
          );
      }
    );

    it(
      'should return a callbacks property with having properties unmatch(Axis)', function () {
        trackyOrientation
          ._transformBreakpoints(eventOptions.events.orientation.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.unmatchAlpha).toBeDefined();
              expect(bp.callbacks.unmatchBeta).toBeDefined();
              expect(bp.callbacks.unmatchGamma).toBeDefined();
              expect(bp.callbacks.unmatchAlphaRight).toBeDefined();
              expect(bp.callbacks.unmatchAlphaLeft).toBeDefined();
              expect(bp.callbacks.unmatchBetaUp).toBeDefined();
              expect(bp.callbacks.unmatchBetaDown).toBeDefined();
              expect(bp.callbacks.unmatchGammaLeft).toBeDefined();
              expect(bp.callbacks.unmatchGammaRight).toBeDefined();
            }
          );
      }
    );

    it(
      'should bind callbacks property to breakpoint', function () {
        trackyOrientation
          ._transformBreakpoints(
            [
              {
                css: {
                  alpha: 'orientation-tracker-alpha',
                  beta: 'orientation-tracker-beta',
                  gamma: 'orientation-tracker-gamma',
                  alphaLeft: 'orientation-tracker-alpha-left',
                  alphaRight: 'orientation-tracker-alpha-right',
                  betaDown: 'orientation-tracker-beta-down',
                  betaUp: 'orientation-tracker-beta-up',
                  gammaRight: 'orientation-tracker-gamma-right',
                  gammaLeft: 'orientation-tracker-gamma-left',
                },
                value: ['15%', 66, 99],
                onMatch: function () {
                  return 'match';
                },
                onUnmatch: function () {
                  return 'unmatch';
                },
                onMatchAlpha: function () {
                  return 'match-alpha';
                },
                onMatchBeta: function () {
                  return 'match-beta';
                },
                onMatchGamma: function () {
                  return 'match-gamma';
                },
                onUnmatchAlpha: function () {
                  return 'un-match-alpha';
                },
                onUnmatchBeta: function () {
                  return 'un-match-beta';
                },
                onUnmatchGamma: function () {
                  return 'un-match-gamma';
                },
                onMatchAlphaLeft: function () {
                  return 'match-alpha-left';
                },
                onMatchAlphaRight: function () {
                  return 'match-alpha-right';
                },
                onMatchBetaUp: function () {
                  return 'match-beta-up';
                },
                onMatchBetaDown: function () {
                  return 'match-beta-down';
                },
                onMatchGammaLeft: function () {
                  return 'match-gamma-left';
                },
                onMatchGammaRight: function () {
                  return 'match-gamma-right';
                },
                onUnmatchAlphaLeft: function () {
                  return 'un-match-alpha-left';
                },
                onUnmatchAlphaRight: function () {
                  return 'un-match-alpha-right';
                },
                onUnmatchBetaUp: function () {
                  return 'un-match-beta-up';
                },
                onUnmatchBetaDown: function () {
                  return 'un-match-beta-down';
                },
                onUnmatchGammaLeft: function () {
                  return 'un-match-gamma-left';
                },
                onUnmatchGammaRight: function () {
                  return 'un-match-gamma-right';
                }
              }
            ]
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.match).toEqual('function');
              expect(bp.callbacks.match()).toEqual('match');
              expect(typeof bp.callbacks.unmatch).toEqual('function');
              expect(bp.callbacks.unmatch()).toEqual('unmatch');

              expect(typeof bp.callbacks.matchAlpha).toEqual('function');
              expect(bp.callbacks.matchAlpha()).toEqual('match-alpha');
              expect(typeof bp.callbacks.matchBeta).toEqual('function');
              expect(bp.callbacks.matchBeta()).toEqual('match-beta');
              expect(typeof bp.callbacks.matchGamma).toEqual('function');
              expect(bp.callbacks.matchGamma()).toEqual('match-gamma');

              expect(typeof bp.callbacks.matchAlphaLeft).toEqual('function');
              expect(bp.callbacks.matchAlphaLeft()).toEqual('match-alpha-left');
              expect(typeof bp.callbacks.matchAlphaRight).toEqual('function');
              expect(bp.callbacks.matchAlphaRight()).toEqual('match-alpha-right');

              expect(typeof bp.callbacks.matchBetaUp).toEqual('function');
              expect(bp.callbacks.matchBetaUp()).toEqual('match-beta-up');
              expect(typeof bp.callbacks.matchBetaDown).toEqual('function');
              expect(bp.callbacks.matchBetaDown()).toEqual('match-beta-down');

              expect(typeof bp.callbacks.matchGammaLeft).toEqual('function');
              expect(bp.callbacks.matchGammaLeft()).toEqual('match-gamma-left');
              expect(typeof bp.callbacks.matchGammaRight).toEqual('function');
              expect(bp.callbacks.matchGammaRight()).toEqual('match-gamma-right');

              expect(typeof bp.callbacks.unmatchAlpha).toEqual('function');
              expect(bp.callbacks.unmatchAlpha()).toEqual('un-match-alpha');
              expect(typeof bp.callbacks.unmatchBeta).toEqual('function');
              expect(bp.callbacks.unmatchBeta()).toEqual('un-match-beta');
              expect(typeof bp.callbacks.unmatchGamma).toEqual('function');
              expect(bp.callbacks.unmatchGamma()).toEqual('un-match-gamma');

              expect(typeof bp.callbacks.unmatchAlphaLeft).toEqual('function');
              expect(bp.callbacks.unmatchAlphaLeft()).toEqual('un-match-alpha-left');
              expect(typeof bp.callbacks.unmatchAlphaRight).toEqual('function');
              expect(bp.callbacks.unmatchAlphaRight()).toEqual('un-match-alpha-right');

              expect(typeof bp.callbacks.unmatchBetaUp).toEqual('function');
              expect(bp.callbacks.unmatchBetaUp()).toEqual('un-match-beta-up');
              expect(typeof bp.callbacks.unmatchBetaDown).toEqual('function');
              expect(bp.callbacks.unmatchBetaDown()).toEqual('un-match-beta-down');

              expect(typeof bp.callbacks.unmatchGammaLeft).toEqual('function');
              expect(bp.callbacks.unmatchGammaLeft()).toEqual('un-match-gamma-left');
              expect(typeof bp.callbacks.unmatchGammaRight).toEqual('function');
              expect(bp.callbacks.unmatchGammaRight()).toEqual('un-match-gamma-right');

            }
          );
      }
    );

  }
);

describe(
  'tracky.orientation.js - _getBpsByClassNames', function () {

    var exampleArray = ['orientation-tracker-beta', 'hit-any-orientation', 'not-found'];
    var findIn = ['alpha', 'beta', 'gamma', 'alphaLeft', 'alphaRight', 'betaUp', 'betaDown', 'gammaLeft', 'gammaRight'];
    it(
      'method should be defined', function () {
        expect(trackyOrientation._getBpsByClassNames).toBeDefined();
        expect(trackyOrientation._getBpsByClassNames).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array or null', function () {
        expect(trackyOrientation._getBpsByClassNames([])).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(null)).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(false)).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames({})).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(NaN)).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(exampleArray, findIn)).toEqual(jasmine.any(Array));
        expect(trackyOrientation._getBpsByClassNames(exampleArray, findIn).length).toEqual(2);
      }
    );

    it(
      'should return an array with objects', function () {
        trackyOrientation
          ._getBpsByClassNames(exampleArray, findIn)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array or null - findIn parameter', function () {
        expect(trackyOrientation._getBpsByClassNames(exampleArray, null)).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(exampleArray, ['something'])).toEqual(jasmine.any(Array));
        expect(trackyOrientation._getBpsByClassNames(exampleArray, 'right')).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(exampleArray, {})).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(exampleArray, NaN)).toEqual(null);
        expect(trackyOrientation._getBpsByClassNames(exampleArray, findIn)).toEqual(jasmine.any(Array));
        expect(trackyOrientation._getBpsByClassNames(exampleArray, findIn).length).toEqual(2);
      }
    );

  }
);
