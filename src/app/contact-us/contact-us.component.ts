import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, HttpClientModule],  // Import RouterModule for routing functionality
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  email: string = '';
  placeholderText: string = 'Email Address';  // Default placeholder text


  constructor(private http: HttpClient) { }

  sendEmail() {
    if (this.email) {
      // Send a request to the backend to send an email
      this.http.post('http://localhost:3000/send-email', { email: this.email }).subscribe(
        (response) => {
          console.log('Email sent successfully!', response);

          //clear input
          this.email = '';

          //set placeholder to indicate success
          this.placeholderText = 'Email sent successfully';

          //set timeout for 1 seconds, then revert back to default placeholder
          setTimeout(() => {
            this.placeholderText = 'Email Address';
          }, 2000);
        },
        (error) => {
          console.log('Error sending email:', error);
        }
      );
    } else {
      alert('Please enter a valid email address.');
    }
  }
}




// import { Component, OnInit } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-contact-us',
//   standalone: true,
//   imports: [RouterModule, CommonModule],
//   templateUrl: './contact-us.component.html',
//   styleUrls: ['./contact-us.component.scss']
// })
// export class ContactUsComponent implements OnInit {
//   isHandsetPortrait = false;
//   isHandsetLandscape = false;
//   isTabletPortrait = false;
//   isTabletLandscape = false;
//   isDesktop = false;

//   constructor(private breakpointObserver: BreakpointObserver) {}

//   ngOnInit(): void {
//     this.breakpointObserver.observe([
//       Breakpoints.HandsetPortrait,  // Mobile Portrait
//       Breakpoints.HandsetLandscape, // Mobile Landscape
//       Breakpoints.TabletPortrait,   // Tablet Portrait
//       Breakpoints.TabletLandscape,  // Tablet Landscape
//       Breakpoints.Web               // Desktop
//     ]).subscribe((state: BreakpointState) => {
//       this.isHandsetPortrait = state.breakpoints[Breakpoints.HandsetPortrait];
//       this.isHandsetLandscape = state.breakpoints[Breakpoints.HandsetLandscape];
//       this.isTabletPortrait = state.breakpoints[Breakpoints.TabletPortrait];
//       this.isTabletLandscape = state.breakpoints[Breakpoints.TabletLandscape];
//       this.isDesktop = state.breakpoints[Breakpoints.Web];
//     });
//   }
// }
