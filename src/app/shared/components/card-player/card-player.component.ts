import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {
  @Input() track !: TrackModel;
  @Input() mode: 'small'|'big'= 'small';
  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendPlay(track:TrackModel):void{
    console.log('Enviando canción al reproductor....',track);
    //this.multimediaService.callback.emit(track);
    this.multimediaService.trackInfo$.next(track);
  }

}
