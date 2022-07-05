import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { SearchService } from '@modules/history/service/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults$:Observable<any> = of([]);

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  recibeData(event : string):void{
    console.log('estoy en el componente padre history -> ',event);
    this.listResults$ = this.searchService.searchTracks$(event);
  }

}
