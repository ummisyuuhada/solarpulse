import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-about-us',
  standalone: true,
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    const textsTransition = gsap.utils.toArray('.text-container:nth-child(n+2)') as HTMLElement[];
    const images = gsap.utils.toArray('.about-image') as HTMLElement[];

    ScrollTrigger.create({
      trigger: '.trigger',
      pin: '.image-container', // Pin the image section
      start: 'top top',
      end: 'bottom bottom',
      endTrigger: '.about-container',
      // pinSpacing: false,
      // scrub: true,
      markers: true
    });

    // gsap.to(".image-container",{
    // let tl = gsap.timeline({

    images.forEach((image, i) => {
      if (i === 0) return; // Skip the first image since it starts visible


      // Fade out the previous image when the trigger is hit
      gsap.to(images[i - 1], {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".text-container:nth-child(n+2)",
          start: 'top +=50%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });

      // Fade in the current image when the trigger is hit
      gsap.to(image, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".text-container:nth-child(n+2)",
          start: 'top +=50%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      });
    });

    gsap.set(textsTransition,{opacity: 0});

   gsap.to(".text-container:nth-child(n+2)",{
        scrollTrigger: {
          trigger: ".text-container:nth-child(n+2)",
          start: `top +=55%`,
          end: `bottom bottom`,
          scrub: true,
          markers: false
        },
        opacity: 1,
   
    }) 
    
  }
}
