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
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-second-section',
  standalone: true,
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.scss']
})
export class SecondSectionComponent implements AfterViewInit, OnDestroy {
  private resizeHandler: (() => void) | undefined = undefined;

  ngAfterViewInit(): void {
    // Handle media query and scroll animations
    this.handleMediaQuery();

    // Setup resize handler
    this.resizeHandler = () => {
      ScrollTrigger.refresh();  // Refresh ScrollTrigger on resize
      this.handleMediaQuery();  // Re-evaluate media queries
    };
    window.addEventListener('resize', this.resizeHandler);

    // TEXTS FADE IN FADE OUT FUNCTIONS
    this.setupFadeInFadeOutEffects();
  }

  handleMediaQuery(): void {
    const mediaQuery1200 = window.matchMedia("(max-width: 1200px)");
    const mediaQuery850 = window.matchMedia("(max-width: 850px)");

    // Clear previous ScrollTriggers to avoid conflicts
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    if (mediaQuery1200.matches || mediaQuery850.matches) {
      // For mobile view (<=1000px), skip horizontal scrolling animations
      return;
    } else {
      // GSAP horizontal scroll animation for non-mobile screens
      const containers = gsap.utils.toArray('.second-container') as HTMLElement[];

      containers.forEach((container) => {
        const sections = container.querySelectorAll('.panel');

        // Calculate the total width for proper horizontal scrolling
        let totalWidth = 0;
        sections.forEach((section) => {
          totalWidth += section.clientWidth;
        });

        // Apply GSAP horizontal scrolling
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: `+=${totalWidth * 0.5}px`,  // Dynamic end based on content width
            invalidateOnRefresh: true,  // Refresh on resize to adjust correctly
          }
        });
      });
    }
  }

  setupFadeInFadeOutEffects(): void {
    // Elements to observe for fade in/out effects
    const backgroundImg = document.querySelectorAll(".tab-image");
    const thirdSectionImages = document.querySelectorAll(".tab-overlay");
    const textSections = document.querySelectorAll(".content-section");

    // IntersectionObserver to trigger fade in/out effects
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);  // Stop observing once it fades in
        }
      });
    }, { threshold: 0.5 });

    // Apply observer to images and text sections
    backgroundImg.forEach(img => observer.observe(img));
    thirdSectionImages.forEach((thirdSectionImage, index) => {
      const img = thirdSectionImage as HTMLElement;
      observer.observe(img);

      // Add delay effect for fade in/out
      const delay = 0.4 + (index % 2) * 0.3;
      img.style.transitionDelay = `${delay}s`;
    });
    textSections.forEach(textSection => observer.observe(textSection));
  }

  ngOnDestroy(): void {
    // Clean up: Remove resize event listener and ScrollTrigger instances
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
