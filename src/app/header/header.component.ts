import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {

  previousUrl: string = '';
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollListener();
    }
    // window.addEventListener('scroll', this.toggleShowClass);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentUrl = event.urlAfterRedirects;
      // Only refresh ScrollTrigger if navigating to the index page from another page
      if (this.previousUrl !== '/' && currentUrl === '/') {
        setTimeout(() => {
          ScrollTrigger.refresh();  // Refresh ScrollTrigger when navigating to index
        }, 300);  // Delay to ensure DOM updates are complete
      }
      this.previousUrl = currentUrl;  // Update previousUrl for the next navigation
    });

  }

  setupScrollListener() {
    const header = document.querySelector('.black-header');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 400) {
        header?.classList.add('show');
      } else {
        header?.classList.remove('show');
      }
    });
  }


  // scrollToSection(sectionId: string) {
  //   const currentUrl = this.router.url;

  //   // Check if we're on the index page
  //   if (currentUrl === '/') {
  //     this.scrollToTarget(sectionId);  // If on the index, scroll smoothly
  //   } else {
  //     // If not on the index, navigate to the index and scroll after navigation
  //     this.router.navigate(['/']).then(() => {
  //       setTimeout(() => {
  //         this.scrollToTarget(sectionId);  // Wait a bit to let navigation finish, then scroll
  //       }, 500);
  //     });
  //   }
  // }

  scrollToSection(sectionId: string) {
    const currentUrl = this.router.url;

    // Check if the user is coming from the Terms or Privacy Policy pages
    const isFromTermsOrPrivacy = currentUrl.includes('terms') || currentUrl.includes('privacy-policy');
    const isOnIndexPage = currentUrl === '/';

    if (!isOnIndexPage || isFromTermsOrPrivacy) {
      // Navigate to index page and scroll without modifying URL
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.scrollToTarget(sectionId); // Perform smooth scroll to the target section
      }, 700); // Wait for the page to fully load
    });
      // window.location.href = `/#${sectionId}`; // Redirect to the index page and scroll to the section
    }
    else if (currentUrl === '/') {
      this.scrollToTarget(sectionId); // If on the index, scroll smoothly
    }


    // else {
    //   // If not on the index, navigate to the index and scroll after navigation
    //   this.router.navigate(['/']).then(() => {
    //     setTimeout(() => {
    //       this.scrollToTarget(sectionId); // Wait a bit to let navigation finish, then scroll
    //     }, 500);
    //   });
    // }
  }

  scrollToTarget(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
    }
  }

  navigateToHome() {
    const currentUrl = this.router.url;
  
    // Store the current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    if (currentUrl === '/') {
      // If already on the home page, reload the page and restore scroll position
      window.location.reload();
  
      // After reload, scroll to the stored position
      window.addEventListener('load', () => {
        window.scrollTo({ top: scrollPosition, behavior: 'auto' });
      });
    } else {
      // Navigate to the home page and refresh after navigation
      window.location.href = '/';
    }
  }
}

// toggleShowClass() {
//   const header = document.querySelector(".black-header");

//   window.addEventListener('scroll', () => {
//     if (header) {
//       header.classList.toggle('show', window.scrollY > 100);
//     }
//   })
// }

