import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements AfterViewInit {
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('startButton') startButton!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;
  @ViewChild('controls') controls!: ElementRef<HTMLDivElement>;
  @ViewChild('playPauseButtons') playPauseButtons!: ElementRef<HTMLDivElement>;
  @ViewChild('buttons') buttons!: ElementRef<HTMLDivElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLInputElement>;
  @ViewChild('currentTimeDisplay') currentTimeDisplay!: ElementRef<HTMLSpanElement>;
  @ViewChild('durationDisplay') durationDisplay!: ElementRef<HTMLSpanElement>;
  @ViewChild('bigPlay') bigPlay!: ElementRef<HTMLElement>;
  @ViewChild('bigPause') bigPause!: ElementRef<HTMLElement>;
  @ViewChild('play') play!: ElementRef<HTMLElement>;
  @ViewChild('pause') pause!: ElementRef<HTMLElement>;

  firstTimeClicking = false;
  isPlaying = false;
  isVolumeSliderVisible = false;
  isMobile = false;

  ngAfterViewInit() {
    const video = this.myVideo.nativeElement;

    video.ontimeupdate = () => this.updateProgressBar();
    video.onloadedmetadata = () => this.updateDurationDisplay(); // Set duration when metadata is loaded

    this.updateSliderBackground();
    this.updateProgressBarBackground();
    this.volumeSlider.nativeElement.addEventListener('input', this.updateVolume.bind(this));
  }


  showControlsAndDim() {
    const video = this.myVideo.nativeElement;
    const controls = this.controls.nativeElement;
    const buttons = this.buttons.nativeElement;
    
    video.style.opacity = '0.8'; // Dim video
    controls.style.opacity = '1'; // Show controls
    buttons.style.opacity = '1'
  }

  hideControlsAndRestore() {
    const video = this.myVideo.nativeElement;
    const controls = this.controls.nativeElement;
    const buttons = this.buttons.nativeElement;
    
    video.style.opacity = '1'; // Restore video brightness
    controls.style.opacity = '0'; // Hide controls
    buttons.style.opacity = '0';
  }


  updateProgressBar() {
    const video = this.myVideo.nativeElement;
    const progress = (video.currentTime / video.duration) * 100;
    this.progressBar.nativeElement.value = progress.toString();
    this.updateCurrentTimeDisplay(video.currentTime);
    this.updateProgressBarBackground();
  }

  updateProgressBarBackground() {
    const progressBar = this.progressBar.nativeElement;
    const value = (parseInt(progressBar.value) - parseInt(progressBar.min)) / (parseInt(progressBar.max) - parseInt(progressBar.min)) * 100;
    progressBar.style.background = `linear-gradient(to right, #dfb323 ${value}%, #fff ${value}%)`;
  }


  updateDurationDisplay() {
    const video = this.myVideo.nativeElement;
    const duration = this.formatTime(video.duration);
    this.durationDisplay.nativeElement.textContent = duration;
  }

  updateCurrentTimeDisplay(currentTime: number) {
    const formattedTime = this.formatTime(currentTime);
    this.currentTimeDisplay.nativeElement.textContent = formattedTime;
  }


  onSeek(event: Event) {
    const video = this.myVideo.nativeElement;
    const progressBar = this.progressBar.nativeElement;
    const seekTime = (parseFloat(progressBar.value) / 100) * video.duration;
    video.currentTime = seekTime;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  updateSliderBackground() {
    const slider = this.volumeSlider.nativeElement;
    const value = (parseInt(slider.value) - parseInt(slider.min)) / (parseInt(slider.max) - parseInt(slider.min)) * 100;
    slider.style.background = `linear-gradient(to right, #f5cb41 ${value}%, #fff ${value}%)`;
  }

  updateVolume() {
    const video = this.myVideo.nativeElement;
    const volume = parseInt(this.volumeSlider.nativeElement.value) / 100;
    video.volume = volume;
    this.updateSliderBackground();
  }

  toggleVideo() {
    if (!this.firstTimeClicking) {

      this.startButton.nativeElement.style.display = "none";
      this.buttons.nativeElement.style.display = "flex";
      this.firstTimeClicking = true;
    }
    this.playPause(); // Use playPause method for consistency
  }

  playPause() {
    const video = this.myVideo.nativeElement;
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      video.play();
      this.bigPlay.nativeElement.style.opacity = '0';
      this.bigPause.nativeElement.style.opacity = '1';
      this.play.nativeElement.style.opacity = '0';
      this.pause.nativeElement.style.opacity = '1';
    } else {
      video.pause();
      this.bigPlay.nativeElement.style.opacity = '1';
      this.bigPause.nativeElement.style.opacity = '0';
      this.play.nativeElement.style.opacity = '1';
      this.pause.nativeElement.style.opacity = '0';
    }
  }

  showVolumeSlider() {
    this.isVolumeSliderVisible = true;
    // this.volumeSlider.nativeElement.style.opacity = '1';
    // this.volumeSlider.nativeElement.style.visibility = 'visible';
  }

  hideVolumeSlider() {
    this.isVolumeSliderVisible = false;
    // this.volumeSlider.nativeElement.style.opacity = '0';
    // this.volumeSlider.nativeElement.style.visibility = 'hidden';
  }

  toggleFullscreen() {
    const videoElement = this.myVideo.nativeElement;
    if (!document.fullscreenElement) {
      videoElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
