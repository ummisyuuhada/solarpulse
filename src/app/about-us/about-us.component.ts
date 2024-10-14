// import { Component, AfterViewInit } from '@angular/core';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/all';

// gsap.registerPlugin(ScrollTrigger);
// @Component({
//   selector: 'app-about-us',
//   standalone: true,
//   templateUrl: './about-us.component.html',
//   styleUrls: ['./about-us.component.scss']
// })
// export class AboutUsComponent implements AfterViewInit {


//   ngAfterViewInit(): void {
//     const textsTransition = gsap.utils.toArray('.about-text-container:nth-child(n+2)') as HTMLElement[];
//     const images = gsap.utils.toArray('.about-image') as HTMLElement[];


//     const isMobileView = window.innerWidth <= 850;
    
//     ScrollTrigger.create({
//       trigger: '.about-trigger',
//       pin: '.about-image-container', // Pin the image section
//       start: 'top top',
//       end: 'bottom bottom',
//       endTrigger: '.about-container',
//       // pinSpacing: false,
//       // scrub: true,
//       markers: true
//     });

//     // gsap.to(".about-image-container",{
//     // let tl = gsap.timeline({

//     images.forEach((image, i) => {
//       if (i === 0) return; // Skip the first image since it starts visible


//       // Fade out the previous image when the trigger is hit
//       gsap.to(images[i - 1], {
//         opacity: 0,
//         duration: 0.5,
//         scrollTrigger: {
//           trigger: ".about-text-container:nth-child(n+2)",
//           start: 'top +=50%',
//           toggleActions: 'play none none reverse',
//           markers: false
//         }
//       });

//       // Fade in the current image when the trigger is hit
//       gsap.to(image, {
//         opacity: 1,
//         duration: 0.5,
//         scrollTrigger: {
//           trigger: ".about-text-container:nth-child(n+2)",
//           start: 'top +=50%',
//           toggleActions: 'play none none reverse',
//           markers: false
//         }
//       });
//     });

//     gsap.set(textsTransition,{opacity: 0});

//    gsap.to(".about-text-container:nth-child(n+2)",{
//         scrollTrigger: {
//           trigger: ".about-text-container:nth-child(n+2)",
//           start: `top +=55%`,
//           end: `bottom bottom`,
//           scrub: true,
//           markers: false
//         },
//         opacity: 1,
   
//     }) 
    
//   }
// }
import { Component, AfterViewInit, HostListener } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { CommonModule } from '@angular/common';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements AfterViewInit {
  isMobileView: boolean = false;

  ngAfterViewInit(): void {
    this.checkViewport();
    this.setupAnimations();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkViewport();
    this.setupAnimations(); // Re-run animations on resize if needed
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 850;
  }

  setupAnimations() {
    const textsTransition = gsap.utils.toArray('.about-text-container:nth-child(n+2)') as HTMLElement[];
    const images = gsap.utils.toArray('.about-image') as HTMLElement[];

    if (!this.isMobileView) {
      // Scroll-based animations for larger screens
      ScrollTrigger.create({
        trigger: '.about-trigger',
        pin: '.about-image-container', // Pin the image section
        start: 'top top',
        end: 'bottom bottom',
        endTrigger: '.about-container',
        // markers: true // Enable markers for debugging
      });

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
            markers: false
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
            markers: false
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
          markers: false
        },
        opacity: 1,
      });
    } else {
      // For mobile view, set images and texts directly
      gsap.set(images, { opacity: 0 });
      gsap.set(images[0], { opacity: 1 }); // Show the first image
    }
  }
}
