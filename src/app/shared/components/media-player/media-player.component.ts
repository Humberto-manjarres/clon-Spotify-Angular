import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progress: ElementRef = new ElementRef('');
  mockCover!: TrackModel;
  state: string = 'paused';
  listObservers$: Array<Subscription> = [];
  constructor(public multimedia: MultimediaService) { }

  ngOnInit(): void { 
/*     const observer1$: Subscription = this.multimedia.callback.subscribe(
      (response:TrackModel) => {
       console.log('Recibiendo canción en media player...',response); 
    });

    this.listObservers$ = [observer1$]; */
    
    /* this.multimedia.trackInfo$.subscribe(res=>{
      console.log('debo reproducir esta canción -> ', res);
      
    }) */
    const observer1$ = this.multimedia.playerStatus$.subscribe(status =>  this.state = status)
    this.listObservers$ = [observer1$];
  }

  handlePosition(event:MouseEvent):void {
    const elNative:HTMLElement = this.progress.nativeElement;
    const {clientX} = event;
    const {x,width} = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX*100)/width;
    this.multimedia.seekAudio(percentageFromX);
    console.log(`Click(x): ${percentageFromX}`);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
    throw new Error('Method not implemented.');
  }

}
