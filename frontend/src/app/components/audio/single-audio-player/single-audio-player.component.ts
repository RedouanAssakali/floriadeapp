import {Component, Input, OnInit} from '@angular/core';
import {faStepForward, faPlay, faPause, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {ClassPropertyName} from "@angular/compiler-cli/src/ngtsc/metadata";
@Component({
  selector: 'app-single-audio-player',
  templateUrl: './single-audio-player.component.html',
  styleUrls: ['./single-audio-player.component.css']
})
export class SingleAudioPlayerComponent implements OnInit {

  @Input()
  audioUrl: string;

  faPlay = faPlay;
  faPause = faPause;
  playOrPause: IconDefinition = faPlay;
  event = Event;
  musicContainer = document.getElementById('music-container') as HTMLDivElement;
  audio = new Audio();
  playBtn = document.getElementById('play');
  // document.getElementById('audio') as HTMLAudioElement;
  progress = document.getElementById('progress') as HTMLProgressElement;
  progressContainer = document.getElementById('progress-container') as HTMLProgressElement;
  title: string;
  cover = document.getElementById('cover') as HTMLImageElement;
  currTime = document.querySelector('#currTime');
  durTime = document.querySelector('#durTime');

  coverUrl: string;
// Song titles
  songs = ['ukulele'];
// Keep track of song
  songIndex = 2;
  musicContainerClasses: string = "music-container";
  constructor() { }
  ngOnInit(): void {

    this.audio = document.getElementById('audio') as HTMLAudioElement;


// Initially load song details into DOM
    this.loadSong((this.songs)[this.songIndex]);




    // Event listeners



// Time/song update

    // this.audio.ontimeupdate = this.updateProgress;


// // Click on progress bar
//   this.progressContainer.addEventListener('click', this.setProgress);
//
// // Time of song
//     this.audio.addEventListener('timeupdate',this.DurTime);

  }


  // Update song details
  loadSong(song: string) {
    this.title = "Mother earth about Africa...";
    this.audioUrl = `assets/audio/motherEarth.mp3`;
    this.coverUrl = `assets/images/motherEarth.jpg`;
  }

// Play song
  playSong() {
    this.playOrPause = this.faPause;
    this.musicContainerClasses = "music-container play";
    this.audio.play();
  }

  clickPlay() {

    if (this.playOrPause == this.faPause) {
      this.pauseSong();
    } else {
      this.playSong();
    }
  }
// Pause song
  pauseSong() {

    this.playOrPause = this.faPlay;
    this.musicContainerClasses = "music-container";

    this.audio.pause();
  }





// Update progress bar
//     updateProgress = (e: any): Event =>  {
//     const { duration, currentTime } = e.getGlobalEventTarget();
//     const progressPercent = (currentTime / duration) * 100;
//     this.progress.style.width = `${progressPercent}%`;
//     return e;
//   }

// Set progress bar
  setProgress(e: any) {
    const width = e.clientWidth;
    const clickX = e.offsetX;
    const duration = this.audio.duration;

    this.audio.currentTime = (clickX / width) * duration;
  }

//get duration & currentTime for Time of song
  DurTime(e: any) {
    const {duration,currentTime} =  e.Event.target;
    var sec;
    var sec_d;

    // define minutes currentTime
    let min: string | number = (currentTime==null)? 0:
      Math.floor(currentTime/60);
    min = min <10 ? '0'+min:min;

    // define seconds currentTime
    function get_sec (currentTime: any, x:any) {
      if(Math.floor(x) >= 60){

        for (var i = 1; i<=60; i++){
          if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
            sec = Math.floor(x) - (60*i);
            sec = sec <10 ? '0'+sec:sec;
          }
        }
      }else{
        sec = Math.floor(x);
        sec = sec <10 ? '0'+sec:sec;
      }
    }

    get_sec (currentTime,sec);

    // change currentTime DOM
    this.currTime.innerHTML = min +':'+ sec;

    // define minutes duration
    let min_d = (isNaN(duration) === true)? '0':
      Math.floor(duration/60);
    min_d = min_d <10 ? '0'+min_d:min_d;


    function get_sec_d (x:any) {
      if(Math.floor(x) >= 60){

        for (var i = 1; i<=60; i++){
          if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
            sec_d = Math.floor(x) - (60*i);
            sec_d = sec_d <10 ? '0'+sec_d:sec_d;
          }
        }
      }else{
        sec_d = (isNaN(duration) === true)? '0':
          Math.floor(x);
        sec_d = sec_d <10 ? '0'+sec_d:sec_d;
      }
    }

    // define seconds duration

    get_sec_d (duration);

    // change duration DOM
    this.durTime.innerHTML = min_d +':'+ sec_d;

  };


}


