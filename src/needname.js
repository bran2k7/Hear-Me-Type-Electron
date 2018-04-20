import { of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, catchError } from 'rxjs/operators'

const requestStream = of("https://esi.tech.ccp.is/latest/markets/prices/?datasource=tranquility")

const responseStream = requestStream
  |> mergeMap(requestURL => ajax(requestURL))
  |> mergeMap(e => e.response)

//responseStream.subscribe(console.log)

//const responseDataStream = responseStream.pipe(mergeMap(e => e.response))

//responseDataStream.subscribe(e => console.log(e))

const userInputStream = fromEvent(document.getElementById('submit'), 'click')
  |> map(click => document.getElementById('item-name').value)

//userInputStream.subscribe(e => console.log(e))

const searchStringStream = userInputStream
  /*map(str => {
    if (str === ""){
      throw 'Enter text first.';
    }
    return str;
  }),*/
  |> map(e => `https://esi.tech.ccp.is/latest/search?categories=inventory_type&search=${e}&strict=true`)

searchStringStream.subscribe(console.log)

const userSearchResponse = searchStringStream
  //catchError((err, caught) => console.log(err)),
  |> mergeMap(requestURL => ajax(requestURL))
  |> catchError(err => of(err))

userSearchResponse.subscribe(console.log)

//const userSearchDataStream = userSearchResponse.pipe(mergeMap(e => e.response))

//userSearchDataStream.subscribe(e => console.log(e))
