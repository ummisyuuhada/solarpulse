import { Component } from '@angular/core';




@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],  // Import RouterModule for routing functionality
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {}




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
