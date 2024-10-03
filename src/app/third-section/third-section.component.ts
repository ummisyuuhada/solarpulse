import { Component } from '@angular/core';

@Component({
  selector: 'app-third-section',
  standalone: true,
  imports: [],
  templateUrl: './third-section.component.html',
  styleUrl: './third-section.component.scss'
})
export class ThirdSectionComponent {
  ngAfterViewInit(): void {
    // ensure it only runs in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    
    const titles = document.querySelectorAll(".title")
    const descriptions = document.querySelectorAll(".sub-title, .paragraph")

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if(entry.isIntersecting){
          observer.unobserve(entry.target)
        }
      })
    },{threshold:0.5})

    titles.forEach(title =>{
      observer.observe(title)
    })

    descriptions.forEach(description => {
      observer.observe(description)
    })

    }
  }
}
