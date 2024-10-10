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


  constructor(private router: Router) {}

  ngOnInit(): void {

    this.setupScrollListener();
    // window.addEventListener('scroll', this.toggleShowClass);
  }

  setupScrollListener(){
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


   scrollToSection(sectionId: string) {
    const currentUrl = this.router.url;

    if (currentUrl === '/') {
      this.scrollToTarget(sectionId);
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scrollToTarget(sectionId);
        }, 500);  // Allow some time for the navigation to complete
      });
    }
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

