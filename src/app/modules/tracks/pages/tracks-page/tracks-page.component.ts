import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

/**todo lo que está en el tracks.json lo asigne a data */
//import * as dataRaw from 'src/app/data/tracks.json';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  /**lista para agregar observables para despues destruirlos */
  listObservers$: Array<Subscription>  = [];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    /* const dataCostumer : any = (dataRaw as any).default;
    const {data} = dataCostumer;
    this.mockTracksList = data; */
       
    /* const observer1$ = this.trackService.dataTracksTreding$.subscribe(tracks => {
      this.tracksTrending =  tracks as TrackModel[];
      this.tracksRandom = tracks;
      console.log(tracks);
    }); */

    //const observer2$ = this.trackService.dataTracksRandom$.subscribe(tracks => {
      //this.tracksRandom =  tracks as TrackModel[];

      /** concatenamos dos arreglo */
    //  this.tracksRandom =  [...this.tracksRandom, ...tracks];
    //  console.log(tracks);
    //});

    //this.listObservers$ = [observer1$, observer2$];

    this.loadDataAll();
    this.loadDataRandom();
  }

  loadDataAll():void{
    this.trackService.getAllTracks$().subscribe({
      next: (response: TrackModel[])=>{
         console.log('Canciones Tracks -> ',response );
        this.tracksTrending = response;
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  loadDataRandom():void{
    this.trackService.getAllRandom$().subscribe({
      next: (response: TrackModel[])=>{
         console.log('Canciones Random -> ',response );
        this.tracksRandom = response;
      }
    })
  }

  
  ngOnDestroy(): void {
    this.listObservers$.forEach(obs => obs.unsubscribe());
  }

}
