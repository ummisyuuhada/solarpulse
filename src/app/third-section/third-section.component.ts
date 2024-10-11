import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-third-section',
  standalone: true,
  imports: [],
  templateUrl: './third-section.component.html',
  styleUrl: './third-section.component.scss'
})
export class ThirdSectionComponent {
  @ViewChildren('video') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit(): void {
    // ensure it only runs in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {

      const titles = document.querySelectorAll(".title")
      const descriptions = document.querySelectorAll(".sub-title, .paragraph")

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle("show", entry.isIntersecting)
          if (entry.isIntersecting) {
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })

      titles.forEach(title => {
        observer.observe(title)
      })

      descriptions.forEach(description => {
        observer.observe(description)
      })

      if (this.videos) {
        const observerOptions: IntersectionObserverInit = {
          threshold: 0.1 // 20% of the video needs to be visible
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.play(); // Play the video when 20% of it is visible
            } else {
              video.pause(); // Pause the video when it's out of view
            }
          });
        }, observerOptions);

        // Observe each video element
        this.videos.forEach(video => {
          observer.observe(video.nativeElement);
        });
      }
    }

  }
}

