import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { SecondSectionComponent } from "./second-section/second-section.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { ThirdSectionComponent } from "./third-section/third-section.component";
import { FourthSectionComponent } from "./fourth-section/fourth-section.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { TermsComponent } from './terms/terms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, SecondSectionComponent, AboutUsComponent, ThirdSectionComponent, FourthSectionComponent, ContactUsComponent, TermsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'solarpulse';
}
