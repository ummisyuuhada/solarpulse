import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-third-section',
  standalone: true,
  imports: [],
  templateUrl: './third-section.component.html',
  styleUrls: ['./third-section.component.scss']
})
export class ThirdSectionComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const containers = gsap.utils.toArray('.container') as HTMLElement[];

    containers.forEach((container) => {
      const sections = container.querySelectorAll('.panel');

      // Set the total width of the sections for proper scrolling
      const totalWidth = sections.length * 100; // 100vw for each panel

      // GSAP animation for horizontal scroll
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Move sections to the left
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true, // Pin the container while scrolling
          scrub: 1, // Smooth scrubbing
          start: 'top top', // Start at the top of the container
          end: `+=${totalWidth * 3.5}vw`, // Increase scroll duration
        }
      });
    });
  }
}
