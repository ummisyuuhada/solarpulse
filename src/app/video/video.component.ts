import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

  firstTimeClicking = false;
  isPlaying = false;
  isVolumeSliderVisible = false;

  ngAfterViewInit() {
    this.updateSliderBackground();
    this.volumeSlider.nativeElement.addEventListener('input', this.updateVolume.bind(this));
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
      this.controls.nativeElement.style.display = "flex";
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
    } else {
      video.pause();
    }
  }

  showVolumeSlider() {
    this.isVolumeSliderVisible = true;
    this.volumeSlider.nativeElement.style.opacity = '1';
    this.volumeSlider.nativeElement.style.visibility = 'visible';
  }

  hideVolumeSlider() {
    this.isVolumeSliderVisible = false;
    this.volumeSlider.nativeElement.style.opacity = '0';
    this.volumeSlider.nativeElement.style.visibility = 'hidden';
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
