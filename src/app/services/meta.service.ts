import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  public portalInfo: any = {
    companyLogo: './assets/images/logos/Avanij-Logo.png',
    companyName: 'Optumflex Solutions Pvt. Ltd.',
    tagLine: 'Business & Finance',
    address: 'Ghaziabad, Uttar Pradesh, India',
    phone: '919560356770',
    supportMail: 'contact-us@optumflex.com',
    companyEmail: 'optumflex@gmail.com',
    customerPortal: 'https://www.optumflex.com',
  };
  constructor() { }
}
