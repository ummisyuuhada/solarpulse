import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {


  constructor(private router: Router) { }

  ngOnInit(): void {

    this.setupScrollListener();
    // window.addEventListener('scroll', this.toggleShowClass);
  }

  setupScrollListener() {
    const header = document.querySelector('.black-header');
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 400) { // 500px scroll threshold
        header?.classList.add('show'); // Add the class when scrolled down
      } else {
        header?.classList.remove('show'); // Remove the class when scrolled back up
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
}


// toggleShowClass() {
//   const header = document.querySelector(".black-header");

//   window.addEventListener('scroll', () => {
//     if (header) {
//       header.classList.toggle('show', window.scrollY > 100);
//     }
//   })
// }

