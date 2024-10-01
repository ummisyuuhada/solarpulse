import { AfterViewInit, Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const texts = document.querySelectorAll(".text-section")
    const image1 = document.querySelector(".image1")
    const image2 = document.querySelectorAll(".image2")

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
        if(entry.isIntersecting){
          observer.unobserve(entry.target)
        }
      })
    },{threshold:0.5})

    texts.forEach(text =>{
      observer.observe(text)
    })

    if(image1){
      observer.observe(image1);
    }
    image2.forEach(image =>{
      observer.observe(image)
    })

    // const imageObserver = new IntersectionObserver(entries => {
    //   const entry = entries[0];
    //   entry.target.classList.toggle("show", entry.isIntersecting);
    //   if(entry.isIntersecting){
    //     imageObserver.unobserve(entry.target)
    //   }
    // },{threshold:0.5})
    }
  }

