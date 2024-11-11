// import { Component, AfterViewInit } from '@angular/core';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// @Component({
//   selector: 'app-second-section',
//   standalone: true,
//   imports: [],
//   templateUrl: './second-section.component.html',
//   styleUrls: ['./second-section.component.scss']
// })
// export class SecondSectionComponent implements AfterViewInit {
//   ngAfterViewInit(): void {
//     const containers = gsap.utils.toArray('.second-container') as HTMLElement[];

//     containers.forEach((container) => {
//       const sections = container.querySelectorAll('.panel');

//       // Set the total width of the sections for proper scrolling
//       const totalWidth = sections.length * 100; // 100vw for each panel

//       // GSAP animation for horizontal scroll
//       gsap.to(sections, {
//         xPercent: -100 * (sections.length - 1), // Move sections to the left
//         ease: 'none',
//         scrollTrigger: {
//           trigger: container,
//           pin: true, // Pin the container while scrolling
//           scrub: 1, // Smooth scrubbing
//           start: 'top top', // Start at the top of the container
//           end: `+=${totalWidth * 3.5}vw`, // Increase scroll duration
//         }
//       });
//     });

//     const backgroundImg = document.querySelectorAll(".tab-image");
//     const thirdSectionImages = document.querySelectorAll(".tab-overlay");
//     const textSections = document.querySelectorAll(".content-section");

//     // Function
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         entry.target.classList.toggle("show", entry.isIntersecting)
//         if(entry.isIntersecting){
//           observer.unobserve(entry.target)
//         }
//       })
//     },{threshold:0.5})

//     // Functions Usage
//     backgroundImg.forEach(backgroundImg => {
//       observer.observe(backgroundImg);
//     })

//     thirdSectionImages.forEach((thirdSectionImage, index) => {
//       const img = thirdSectionImage as HTMLElement;
//       observer.observe(img);  

//       const delay = 0.4 + (index%2) *0.3;

//       img.style.transitionDelay = `${delay}s`;
//     })

//     textSections.forEach(textSection=>{
//       observer.observe(textSection);
//     })

//   }
// }

// import { Component, AfterViewInit } from '@angular/core';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// @Component({
//   selector: 'app-second-section',
//   standalone: true,
//   imports: [],
//   templateUrl: './second-section.component.html',
//   styleUrls: ['./second-section.component.scss']
// })
// export class SecondSectionComponent implements AfterViewInit {

//   ngAfterViewInit(): void {

//     const handleMediaQuery = () => {
//       const mediaQuery1000 = window.matchMedia("(max-width: 1000px)");
//       const mediaQuery850 = window.matchMedia("(max-width: 850px)");

//       if (mediaQuery1000.matches || mediaQuery850.matches) { return }
//       else {
//         const containers = gsap.utils.toArray('.second-container') as HTMLElement[];

//         // Apply GSAP horizontal scrolling animation for non-mobile screens

//         containers.forEach((container) => {
//           const sections = container.querySelectorAll('.panel');

//           // Set the total width of the sections for proper scrolling
//           let totalWidth = 0;
//           sections.forEach((section) => {
//             totalWidth += section.clientWidth; // Sum up the width of each panel
//           });

//           // GSAP animation for horizontal scroll
//           gsap.to(sections, {
//             xPercent: -100 * (sections.length - 1), // Move sections to the left
//             ease: 'none',
//             scrollTrigger: {
//               trigger: container,
//               pin: true, // Pin the container while scrolling
//               scrub: 1, // Smooth scrubbing
//               start: 'top top', // Start at the top of the container
//               end: `+=${totalWidth * 0.5}px`, // Use the total width for dynamic scroll end
//             }
//           });
//         });
//       }
//     }

//     handleMediaQuery();

//     window.addEventListener("resize", handleMediaQuery);


//     // TEXTS FADE IN FADE OUT FUNCTIONS
//     const backgroundImg = document.querySelectorAll(".tab-image");
//     const thirdSectionImages = document.querySelectorAll(".tab-overlay");
//     const textSections = document.querySelectorAll(".content-section");

//     // Function for intersection observer
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         entry.target.classList.toggle("show", entry.isIntersecting);
//         if (entry.isIntersecting) {
//           observer.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.5 });

//     // Apply intersection observer to all images and text sections
//     backgroundImg.forEach(backgroundImg => observer.observe(backgroundImg));
//     thirdSectionImages.forEach((thirdSectionImage, index) => {
//       const img = thirdSectionImage as HTMLElement;
//       observer.observe(img);

//       const delay = 0.4 + (index % 2) * 0.3;
//       img.style.transitionDelay = `${delay}s`;
//     });
//     textSections.forEach(textSection => observer.observe(textSection));
//   }
// }



// MAMAMIA IT WORKED
import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-second-section',
  standalone: true,
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.scss']
})
export class SecondSectionComponent implements AfterViewInit, OnDestroy {
  private isBrowser: boolean = false;
  private resizeHandler: (() => void) | undefined = undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {  // Ensures that browser-specific code runs only on the client side
      this.handleMediaQuery();
      this.setupFadeInFadeOutEffects();

      // Setup resize handler
      this.resizeHandler = () => {
        ScrollTrigger.refresh();
        this.handleMediaQuery();
      };
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  handleMediaQuery(): void {
    const mediaQuery1200 = window.matchMedia("(max-width: 1200px)");
    const mediaQuery850 = window.matchMedia("(max-width: 850px)");

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (mediaQuery1200.matches || mediaQuery850.matches) {
      return;  // Skip animations for small screens
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations(): void {
    const containers = gsap.utils.toArray('.second-container') as HTMLElement[];

    containers.forEach((container) => {
      const sections = container.querySelectorAll('.panel');
      let totalWidth = 0;
      sections.forEach(section => { totalWidth += section.clientWidth; });

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true
        }
      });
    });
  }

  setupFadeInFadeOutEffects(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    const images = document.querySelectorAll(".tab-image, .tab-overlay, .content-section");
    images.forEach(img => observer.observe(img));
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }
}
