import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
//import { TrackModel } from '@core/models/tracks.models';
import { catchError, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
//import * as dataRaw from '../../../data/tracks.json'
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  /** variable de solo lectura que temdrá el api declarado en enviroment */
  private readonly URL = environment.api;
/*   dataTracksTreding$:Observable<TrackModel[]> = of([]);

  dataTracksRandom$: Observable<TrackModel[]> = of([]); */

  constructor(private httpClient:HttpClient) { 
    //const dataCostumer : any = (dataRaw as any).default;
    //const {data} = dataCostumer;  

    /** con el of el data se convierte en un observable */
    //this.dataTracksTreding$ = of(data);

    /** otra forma de crear un observable */                                                
    /* this.dataTracksRandom$ = new Observable((observer)=> {
      const trackExample ={
        _id: 9,
        name: 'Leve',
        album: 'Cartel de samta',
        url: 'http//',
        cover: 'https://i.scdn.co/image/ab6761610000e5ebbd172041a059e4b6e46e2cfc'
      }
      observer.next([trackExample])
    }) */
        
  }

  private skipById(listTracks: TrackModel[], id: number):Promise<TrackModel[]>{
    return new Promise((resolve,reject)=>{
      console.log('listTracks--> ',listTracks);
      
      const listTmp = listTracks.filter(a => a._id !== id)
      resolve(listTmp);
    })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get(`${this.URL}/tracks`).pipe(
      map(({data}: any)=>{
        console.log('response --> ',data);
        
        return data as TrackModel[];
      })

        /* utilizando el map sin desestructuracion 
        map((response: any)=>{
        console.log('response --> ',data);
        
        return response.data as TrackModel[];
      }) */
    );
  }
  
  getAllRandom$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).pipe( 
      mergeMap((response:any)=> {
        /* TODO: reverse ordena de manera invertida 
        return (response.data as TrackModel[]).reverse();*/
        return this.skipById(response.data   as TrackModel[],1);
      }),
      //map((responseInvertido:any)=> {
        /* TODO: filter comun de arrays  */
        //return (responseInvertido.data as TrackModel[]).filter(track => track._id !== 1 );
      //})
      tap(data => console.log(' tap -> ',data)
      ),catchError(e => {
        const {status, statusText} = e;
        console.log('error -> ',status);
        return throwError(()=> e)
        //return of([]);
      })
    )
  }

}
