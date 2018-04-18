import Rx from 'rxjs/Rx'

const requestStream = Rx.Observable.of("https://esi.tech.ccp.is/latest/markets/prices/?datasource=tranquility")

const responseStream = requestStream
    .mergeMap(requestURL => Rx.Observable.ajax(requestURL))

responseStream.subscribe(e => console.log(e))

const responseDataStream = responseStream.mergeMap(e => e.response)

//responseDataStream.subscribe(e => console.log(e))

const userInputStream = Rx.Observable.fromEvent(document.getElementById('submit'), 'click')
  .map(click => document.getElementById('item-name').value)

userInputStream.subscribe(e => console.log(e))
