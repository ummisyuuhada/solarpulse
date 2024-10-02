import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent {

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
  }

 
// toggleShowClass() {
//   const header = document.querySelector(".black-header");

//   window.addEventListener('scroll', () => {
//     if (header) {
//       header.classList.toggle('show', window.scrollY > 100);
//     }
//   })
// }

