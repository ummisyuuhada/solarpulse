// import { Routes } from '@angular/router';
// import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
// import { TermsComponent } from './terms/terms.component';
// import { ContactUsComponent } from './contact-us/contact-us.component';

// export const appRoutes: Routes = [
//   { path: 'privacy-policy', component: PrivacyPolicyComponent },
//   { path: 'terms', component: TermsComponent },
//   { path: 'contact-us', component: ContactUsComponent },
//   // Add other routes as needed
//   { path: '', redirectTo: '/contact-us', pathMatch: 'full' },
// ];

// // export const routes: Routes = [];



import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsComponent } from './terms/terms.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const appRoutes: Routes = [
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];
