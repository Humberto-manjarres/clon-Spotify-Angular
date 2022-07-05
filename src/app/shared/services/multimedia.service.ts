import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback:EventEmitter<any> = new EventEmitter();
  
  /**TODO: trackInfo es el objeto que contiene la canción  */
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  
  public audio!: HTMLAudioElement; //TODO:  la variable audio es el reproducttor

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPorcentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { 
    this.audio = new Audio();
    this.trackInfo$.subscribe({
      next: (responseOk) => {
        if (responseOk) {
          this.setAudio(responseOk);
        }
      },
      error: (e) => {
        console.log('error al reproducir -> ',e);
        
      }
    });
    this.listenAllEvent();    
  }

  private listenAllEvent():void{
    this.audio.addEventListener('timeupdate',this.calcularTime,false);
    this.audio.addEventListener('playing',this.setPlayerStatus,false);
    this.audio.addEventListener('play',this.setPlayerStatus,false);
    this.audio.addEventListener('pause',this.setPlayerStatus,false);
    this.audio.addEventListener('ended',this.setPlayerStatus,false);
  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play')
        break;
      case 'playing':
          this.playerStatus$.next('playing')
          break;
      case 'ended':
          this.playerStatus$.next('ended')
          break;      
      default:
        this.playerStatus$.next('paused')
        break;
    }
  }

  private calcularTime = () => {
    console.log('disparando evento');
    const {duration, currentTime} = this.audio;
    //console.table([duration,currentTime]);
    this.setTimeElapsed(currentTime);
    
    this.setTimeRemaining(currentTime,duration);
    this.setPercentage(currentTime,duration);
  }

  private setPercentage(currentTime: number, duration: number):void{
    const percentage = (currentTime * 100)/duration;
    this.playerPorcentage$.next(percentage); 
  }

  private setTimeElapsed(currentTime : number):void{
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60)%60);
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinutes}: ${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime:number, duration: number):void{
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60)%60);

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinutes}: ${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  public setAudio(track: TrackModel):void{
    console.log('desde el MultimediaService -> ',track.url);
    this.audio.src = track.url;
    this.audio.play();
    
  }

  public tooglePlayer():void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(porcentage: number): void{
    const {duration} = this.audio;
    const percentageToSecond = (porcentage * duration )/100;
    this.audio.currentTime = percentageToSecond;
  }

}
