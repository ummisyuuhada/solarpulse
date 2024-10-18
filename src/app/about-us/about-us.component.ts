// import { Component, AfterViewInit, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/all';

// gsap.registerPlugin(ScrollTrigger);
// @Component({
//   selector: 'app-about-us',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './about-us.component.html',
//   styleUrls: ['./about-us.component.scss']
// })
// export class AboutUsComponent implements AfterViewInit, OnInit {

//   isMobile: boolean = false;

//   ngOnInit(): void {
//     const mediaQuery = window.matchMedia('(max-width: 815px)');
//     this.isMobile = mediaQuery.matches;

//     mediaQuery.addEventListener('change', (e) => {
//       this.isMobile = e.matches;
//     });

//   }

//   ngAfterViewInit(): void {
//     const handleMediaQuery = () => {
//       const mediaQuery = window.matchMedia('(max-width: 815px)');

//       if (!mediaQuery.matches) {
//         const textsTransition = gsap.utils.toArray('.about-text-container:nth-child(n+2)') as HTMLElement[];
//         const images = gsap.utils.toArray('.about-image') as HTMLElement[];

//         ScrollTrigger.create({
//           trigger: '.about-trigger',
//           pin: '.about-image-container', // Pin the image section
//           start: 'top top',
//           end: 'bottom bottom',
//           endTrigger: '.about-container',
//           // pinSpacing: false,
//           // scrub: true,
//           markers: true
//         });

//         // gsap.to(".about-image-container",{
//         // let tl = gsap.timeline({

//         images.forEach((image, i) => {
//           if (i === 0) return; // Skip the first image since it starts visible


//           // Fade out the previous image when the trigger is hit
//           gsap.to(images[i - 1], {
//             opacity: 0,
//             duration: 0.5,
//             scrollTrigger: {
//               trigger: ".about-text-container:nth-child(n+2)",
//               start: 'top +=50%',
//               toggleActions: 'play none none reverse',
//               markers: true
//             }
//           });

//           // Fade in the current image when the trigger is hit
//           gsap.to(image, {
//             opacity: 1,
//             duration: 0.5,
//             scrollTrigger: {
//               trigger: ".about-text-container:nth-child(n+2)",
//               start: 'top +=50%',
//               toggleActions: 'play none none reverse',
//               markers: true
//             }
//           });
//         });

//         gsap.set(textsTransition, { opacity: 0 });

//         gsap.to(".about-text-container:nth-child(n+2)", {
//           scrollTrigger: {
//             trigger: ".about-text-container:nth-child(n+2)",
//             start: `top +=55%`,
//             end: `bottom bottom`,
//             scrub: true,
//             markers: true
//           },
//           opacity: 1,

//         })
//       }
//       else{
//         const titles = document.querySelectorAll(".title")
//         const descriptions = document.querySelectorAll(".description")

//         const observer = new IntersectionObserver(entries => {
//           entries.forEach(entry => {
//             entry.target.classList.toggle("show", entry.isIntersecting)
//             if (entry.isIntersecting) {
//               observer.unobserve(entry.target)
//             }
//           })
//         }, { threshold: 0.5 })
  
//         titles.forEach(title => {
//           observer.observe(title)
//         })
  
//         descriptions.forEach(description => {
//           observer.observe(description)
//         })
  
//       }
//     }

//     handleMediaQuery();

//     window.addEventListener("resize", () => {
//       ScrollTrigger.refresh();

//     });
//   }
// }

import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
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
export class AboutUsComponent implements AfterViewInit, OnInit, OnDestroy {

  isMobile: boolean = false;
  resizeHandler: any;
  resizeTimeout: any;
  private aboutScrollTriggers: ScrollTrigger[] = []; // Keep track of ScrollTriggers for this component

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(max-width: 815px)');
    this.isMobile = mediaQuery.matches;

    mediaQuery.addEventListener('change', (e) => {
      this.isMobile = e.matches;
    });
  }

  resetImages(images: HTMLElement[]): void {
    images.forEach((image, index) => {
      gsap.set(image, { opacity: index === 0 ? 1 : 0 });
    });
  }

  ngAfterViewInit(): void {
    const handleMediaQuery = () => {
      const mediaQuery = window.matchMedia('(max-width: 815px)');
      const images = gsap.utils.toArray('.about-image') as HTMLElement[];

      // Remove ScrollTriggers specific to this component before recalculating
      this.aboutScrollTriggers.forEach(trigger => trigger.kill());  
      this.aboutScrollTriggers = [];

      if (!mediaQuery.matches) {
        this.resetImages(images);
        this.setupScrollTriggerAnimations(images);  // Only desktop view
      } else {
        this.setupMobileObserver();
        this.resetMobileImages(images);  // Only mobile view
      }

      setTimeout(() => ScrollTrigger.refresh(), 300); // Adjust timing for the refresh
    };

    handleMediaQuery();

    this.resizeHandler = () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        handleMediaQuery();
      }, 300);
    };

    window.addEventListener('resize', this.resizeHandler);
  }

  // ScrollTrigger animation logic for desktop view
  setupScrollTriggerAnimations(images: HTMLElement[]): void {
    const textsTransition = gsap.utils.toArray('.about-text-container:nth-child(n+2)') as HTMLElement[];

    // Main ScrollTrigger for pinning the image container
    const pinTrigger = ScrollTrigger.create({
      trigger: '.about-trigger',
      pin: '.about-image-container',
      start: 'top top',
      end: 'bottom bottom',
      endTrigger: '.about-container',
      scrub: true, // Smooth scrolling
      // markers: true,
      invalidateOnRefresh: true // Ensures the trigger recalculates properly on refresh
    });
    this.aboutScrollTriggers.push(pinTrigger);

    images.forEach((image, i) => {
      if (i === 0) return;

      const fadeOutTrigger = gsap.to(images[i - 1], {
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: textsTransition[i - 1],
          start: 'top +=50%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      }).scrollTrigger!;
      this.aboutScrollTriggers.push(fadeOutTrigger);

      const fadeInTrigger = gsap.to(image, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: textsTransition[i - 1],
          start: 'top +=50%',
          toggleActions: 'play none none reverse',
          markers: false
        }
      }).scrollTrigger!;
      this.aboutScrollTriggers.push(fadeInTrigger);
    });

    gsap.set(textsTransition, { opacity: 0 });

    textsTransition.forEach((text) => {
      const textFadeInTrigger = gsap.to(text, {
        opacity: 1,
        scrollTrigger: {
          trigger: text,
          start: 'top +=55%',
          end: 'bottom bottom',
          scrub: true,
          markers: false
        }
      }).scrollTrigger!;
      this.aboutScrollTriggers.push(textFadeInTrigger);
    });
  }

  setupMobileObserver(): void {
    const titles = document.querySelectorAll('.title');
    const descriptions = document.querySelectorAll('.description');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('show', entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    titles.forEach(title => observer.observe(title));
    descriptions.forEach(description => observer.observe(description));
  }

  resetMobileImages(images: HTMLElement[]): void {
    images.forEach(image => {
      gsap.set(image, { opacity: 1 });
    });
  }

  ngOnDestroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    this.aboutScrollTriggers.forEach(trigger => trigger.kill());  // Ensure all ScrollTriggers are killed on destroy
  }
}
