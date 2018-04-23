import { of, fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map, catchError } from 'rxjs/operators'

const requestStream = of("https://esi.tech.ccp.is/latest/markets/prices/?datasource=tranquility")

const responseStream = requestStream
  |> mergeMap(requestURL => ajax(requestURL))
  |> mergeMap(e => e.response)

responseStream.subscribe(o => {
  document.writeln("type_id: " + o.type_id);
  if (o.average_price){
    document.writeln("average_price: " + o.average_price);
  }
  document.writeln("adjusted_price: " + o.adjusted_price + "<br>");
})
//responseStream.subscribe(console.log)

const userInputStream = fromEvent(document.getElementById('submit'), 'click')
  |> map(click => document.getElementById('item-name').value)

//userInputStream.subscribe(e => console.log(e))

const searchStringStream = userInputStream
  |> map(str => {
    if (str === ""){
      throw 'Enter text first.';
    }
    return `https://esi.tech.ccp.is/latest/search?categories=inventory_type&search=${str}&strict=true`;
  })
  //|> map(e => `https://esi.tech.ccp.is/latest/search?categories=inventory_type&search=${e}&strict=true`)

searchStringStream.subscribe(console.log)

const userSearchResponse = searchStringStream
  |> mergeMap(requestURL => ajax(requestURL) |> catchError(err => of({response: '>:('})))
  //|> catchError(err => of(err))

userSearchResponse.subscribe(console.log)

const userSearchDataStream = userSearchResponse
  |> map(e => e.response)

userSearchDataStream.subscribe(console.log)
