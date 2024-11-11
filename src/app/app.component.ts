import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators'; // test
import { CommonModule, NgIf, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SecondSectionComponent } from "./second-section/second-section.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { ThirdSectionComponent } from "./third-section/third-section.component";
import { FourthSectionComponent } from "./fourth-section/fourth-section.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { HomeSecondComponent } from "./home-second/home-second.component";
import { VideoComponent } from "./video/video.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    SecondSectionComponent,
    AboutUsComponent,
    ThirdSectionComponent,
    FourthSectionComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsComponent,
    PrivacyPolicyComponent,
    HomeSecondComponent,
    VideoComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'solarpulse';
  isBrowser: boolean; // To check if running on browser

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Listen to router events and update whether to show general content
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.isBrowser) {
        const currentRoute = this.router.url;
        this.showGeneralContent = !(currentRoute === '/privacy-policy' || currentRoute === '/terms');
        setTimeout(() => {
          window.scrollTo(0, 0); // Scroll to the top of the page, only if in browser
        }, 100);
      }
    });
  }

  showGeneralContent = true;
  showScrollToTop: boolean = false;

  // Scroll event listener
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) { // Ensure this code only runs in the browser
      const yOffset = window.pageYOffset || document.documentElement.scrollTop;
      this.showScrollToTop = yOffset > 300; // Show when user scrolls down 300px

      const scrollToTopButton = document.querySelector(".scroll-to-top");
      if (scrollToTopButton) {
        if (this.showScrollToTop) {
          scrollToTopButton.classList.add('show');
          scrollToTopButton.classList.remove('hide');
        } else {
          scrollToTopButton.classList.add('hide');
          scrollToTopButton.classList.remove('show');
        }
      }
    }
  }

  // Scroll to top method
  scrollToTop() {
    if (this.isBrowser) { // Only execute if running in a browser
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}