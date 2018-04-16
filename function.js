document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 65:
            document.getElementById('A').play();
            break;
        default:
            console.log("Key is not found!");
    }
};
var keyDowns = Rx.Observable.fromEvent(document, 'keydown');
var keyUps = Rx.Observable.fromEvent(document, 'keyup');
var keyActions = Rx.Observable.merge(keyDowns, keyUps)
  .distinctUntilChanged(function (e) { return e.type + (e.key || e.which); });

keyActions.subscribe(function (e) {
  console.log(e.type, e.key || e.which, e.keyIdentifier);
});
