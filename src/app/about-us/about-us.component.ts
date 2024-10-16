import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit, OnInit {

  isMobile: boolean = false;

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(max-width: 567px)');
    this.isMobile = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.isMobile = e.matches;
    });

  }

  ngAfterViewInit(): void {
    const handleMediaQuery = () => {
      const mediaQuery = window.matchMedia('(max-width: 567px)');

      if (!mediaQuery.matches) {
        const textsTransition = gsap.utils.toArray('.about-text-container:nth-child(n+2)') as HTMLElement[];
        const images = gsap.utils.toArray('.about-image') as HTMLElement[];

        ScrollTrigger.create({
          trigger: '.about-trigger',
          pin: '.about-image-container', // Pin the image section
          start: 'top top',
          end: 'bottom bottom',
          endTrigger: '.about-container',
          // pinSpacing: false,
          // scrub: true,
          markers: true
        });

        // gsap.to(".about-image-container",{
        // let tl = gsap.timeline({

        images.forEach((image, i) => {
          if (i === 0) return; // Skip the first image since it starts visible


          // Fade out the previous image when the trigger is hit
          gsap.to(images[i - 1], {
            opacity: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: ".about-text-container:nth-child(n+2)",
              start: 'top +=50%',
              toggleActions: 'play none none reverse',
              markers: true
            }
          });

          // Fade in the current image when the trigger is hit
          gsap.to(image, {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: ".about-text-container:nth-child(n+2)",
              start: 'top +=50%',
              toggleActions: 'play none none reverse',
              markers: true
            }
          });
        });

        gsap.set(textsTransition, { opacity: 0 });

        gsap.to(".about-text-container:nth-child(n+2)", {
          scrollTrigger: {
            trigger: ".about-text-container:nth-child(n+2)",
            start: `top +=55%`,
            end: `bottom bottom`,
            scrub: true,
            markers: true
          },
          opacity: 1,

        })
      }
    }

    handleMediaQuery();

    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();

    });
  }
}