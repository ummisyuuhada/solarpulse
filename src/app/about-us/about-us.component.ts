import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    
    gsap.to('.about-left img.about-image1', {
      scrollTrigger: {
        trigger: '.about-container:nth-child(1)',
        start: 'top top', 
        endTrigger: '.about-container:nth-child(2)', 
        end: 'top top', 
        pin: '.about-left',
        pinSpacing: false,
        scrub: true,
      }
    });

    
    // Image 1 fading out and Image 2 fading in
    gsap.to('.about-left img.about-image1', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.about-container:nth-child(2)',
        start: 'top bottom', 
        end: 'top top',
        scrub: true,
        onUpdate: (self) => {
          // Fading in Image 2 as Image 1 fades out
          gsap.to('.about-left img.about-image2', { opacity: self.progress, duration: 0.3 });
        }
      }
    });

    // Ensure Image 2 starts with 0 opacity
    gsap.set('.about-left img.about-image2', { opacity: 0 });

    // Image 2 fading out and Image 1 fading in
    gsap.to('.about-left img.about-image2', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.about-container:nth-child(3)', // Assuming there's a third container
        start: 'top bottom', 
        end: 'top top',
        scrub: true,
        onUpdate: (self) => {
          // Fading in Image 1 as Image 2 fades out
          gsap.to('.about-left img.about-image1', { opacity: self.progress, duration: 0.3 });
        }
      }
    });




  }
}
