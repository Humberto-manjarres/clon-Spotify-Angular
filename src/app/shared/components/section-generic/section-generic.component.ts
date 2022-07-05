import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrls: ['./section-generic.component.css']
})
export class SectionGenericComponent implements OnInit {
  @Input() title:string = '';

  /** solo permite dos valores small o big */
  @Input() mode : 'small' | 'big' = 'big';
  
  @Input() dataTracks : Array<TrackModel> = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
