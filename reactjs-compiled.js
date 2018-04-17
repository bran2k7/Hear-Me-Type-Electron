'use strict';

var _Rx = require('rxjs/Rx');

var _Rx2 = _interopRequireDefault(_Rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyDowns = _Rx2.default.Observable.fromEvent(document, 'keydown');
/**var keyUps = Rx.Observable.fromEvent(document, 'keyup');
var keyActions = Rx.Observable.merge(keyDowns, keyUps)
  .distinctUntilChanged((x, y)=> x.type + x.key === y.type + y.key);

keyActions.subscribe(e => console.log(e.type, e.key));
*/

var upperKeyDowns = keyDowns.filter(e => !e.repeat).map(e => isFinite(e.key) ? e.key : e.key.toUpperCase());

upperKeyDowns.subscribe(e => console.log(e));

upperKeyDowns.subscribe(e => document.getElementById(e).play());

//<audio id="A" src="sounds/A.mp3" preload="auto"></audio>
