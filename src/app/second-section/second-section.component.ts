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

import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-second-section',
  standalone: true,
  imports: [],
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.scss']
})
export class SecondSectionComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const containers = gsap.utils.toArray('.second-container') as HTMLElement[];

    // Check the viewport width
    const isMobileView = window.innerWidth <= 850;

    // Apply GSAP horizontal scrolling animation for non-mobile screens
    if (!isMobileView) {
      containers.forEach((container) => {
        const sections = container.querySelectorAll('.panel');

        // Set the total width of the sections for proper scrolling
        let totalWidth = 0;
        sections.forEach((section) => {
          totalWidth += section.clientWidth; // Sum up the width of each panel
        });

        // GSAP animation for horizontal scroll
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1), // Move sections to the left
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true, // Pin the container while scrolling
            scrub: 1, // Smooth scrubbing
            start: 'top top', // Start at the top of the container
            end: `+=${totalWidth * 0.5}px`, // Use the total width for dynamic scroll end
          }
        });
      });
    }

    const backgroundImg = document.querySelectorAll(".tab-image");
    const thirdSectionImages = document.querySelectorAll(".tab-overlay");
    const textSections = document.querySelectorAll(".content-section");

    // Function for intersection observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    // Apply intersection observer to all images and text sections
    backgroundImg.forEach(backgroundImg => observer.observe(backgroundImg));
    thirdSectionImages.forEach((thirdSectionImage, index) => {
      const img = thirdSectionImage as HTMLElement;
      observer.observe(img);

      const delay = 0.4 + (index % 2) * 0.3;
      img.style.transitionDelay = `${delay}s`;
    });
    textSections.forEach(textSection => observer.observe(textSection));
  }
}

