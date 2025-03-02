import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  public portalInfo: any = {
    // companyLogo: './assets/images/logos/optumflex-logo.png',
    companyLogo: './assets/images/logos/optumflex-logo-2.png',
    companyName: 'Optumflex Solutions Pvt. Ltd.',
    tagLine: 'Business & Finance',
    address: 'Ghaziabad, Uttar Pradesh, India',
    phone: '919560356770',
    supportMail: 'contact-us@optumflex.com',
    companyEmail: 'optumflex@gmail.com',
    customerPortal: 'https://www.optumflex.com',
    loginRedirect: 'https://develop-2025.d2pl419v5n1dfb.amplifyapp.com/',
  };
  constructor() { }
}
