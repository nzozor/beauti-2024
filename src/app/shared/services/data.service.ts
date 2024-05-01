import {Injectable} from '@angular/core';
import {Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TreatmentShowcase} from '../models/treatmentShowcase';

import {catchError, map, switchMap} from 'rxjs/operators';
import {environment} from '@environments/environment';
import {HomePageSlider, HomePageSliderRaw} from '../models/homepageSlider.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  beautiCmsUrl = environment.cmsUrl;
  currentParentTreatment = 'Skin Treatmetns';
  activeTreatmentList: string[] = [''];
  activeTreatment: string = '';

  constructor(private http: HttpClient) {
  }

  getTreatmentShowcase(slug: string): Observable<TreatmentShowcase> {
    return this.http.get<any>(`${this.beautiCmsUrl}/api/treaments?filters[slug][$eq]=${slug.toLowerCase()}&populate=*`).pipe(map(treatment => treatment.data[0].attributes));
  }


  getAboutUsPage(): Observable<{ Content: string }> {
    return this.http.get<{ Content: string }>(`${this.beautiCmsUrl}/api/about-us-page`).pipe(
      map((aboutUsData: any) => {
        return aboutUsData.data.attributes;
      })
    );
  }

  getConsultationPage(): Observable<{ Content: string }> {
    return this.http.get<{ Content: string }>(`${this.beautiCmsUrl}/api/consultation-page`).pipe(
      map((response: any) => {
        return response.data.attributes;
      })
    );
  }

  getHomageBanners(serverDate: Date | null = null): Observable<HomePageSlider[]> {
    return this.http.get<HomePageSliderRaw[]>(`${this.beautiCmsUrl}/api/home-page-banners?populate=*`).pipe(
      map((banners: any) => {
        return banners.data
      }),
      map((banners: HomePageSliderRaw[]) => {
        return banners.map(banner => banner.attributes)
      }),
      map((banners: HomePageSlider[]) => {
        const defaultBanner = () => banners.filter(banner => banner.isDefaultBanner)
        // @ts-ignore
        const filteredBanners = banners
          .filter(banner => serverDate && banner.expirationDate ? new Date(serverDate).getTime() - new Date(banner.expirationDate).getTime() <= 0 : true)
          .filter(banner => serverDate && banner.publication ? new Date(serverDate).getTime() - new Date(banner.publication).getTime() >= 0 : true)
          .sort((a, b) => new Date(b.publication as Date).getTime() - new Date(a.publication as Date).getTime()).filter((banner) => !banner.hide)
          .sort((a, b) => a.rank - b.rank);
        return filteredBanners.length > 0 ? filteredBanners : defaultBanner()
      })
    );
  }


  getTreatmentSections(): Observable<[]> {
    return this.http.get(`${this.beautiCmsUrl}/api/sections?populate=*`).pipe(
      map((response: any) => {
        return response.data;
      }),
      // map((sections: any[]) => this.transformSectionWithHierarchy(sections))
    );
  }

  getTreatmentDetails(): Observable<[]> {
    return this.http.get(`${this.beautiCmsUrl}/api/treaments?populate=*`).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }

  getTreatmentPrices(): Observable<[]> {
    return this.http.get(`${this.beautiCmsUrl}/api/prices?populate=*`).pipe(
      map((response: any) => {
        return response.data;
      }),
    );
  }

  getHomepageSummary(): Observable<[]> {
    return this.http.get(`${this.beautiCmsUrl}/api/homepage-summary`).pipe(
      map((response: any) => {
        return response.data.attributes;
      }),
    );
  }

  // getFullTreatmentHierarchy(): Observable<any> {
  //   return zip(this.getTreatmentSections(), this.getTreatmentDetails(), this.getTreatmentPrices()).pipe(
  //     map(([treatmentSections, treatmentDetails, treatmentPrices]) => {
  //       return this.transformSectionWithHierarchy(treatmentSections, treatmentDetails, treatmentPrices);
  //     })
  //   )
  // }

//   transformSectionWithHierarchy(treatmentSections, treatmentDetails, treatmentPrices) {
//     const hierarchicalData = {};
//     treatmentSections.forEach((item) => {
//       const sectionId = item.id;
//       const sectionName = item.attributes.sectionName;
//
//       if (!item.attributes.section.data) {
//         hierarchicalData[sectionId] = {
//           sectionId: sectionId,
//           sectionName: sectionName,
//           layout: item.attributes.layout,
//           type: TreatmentSectionComponent,
//           subSections: [], // Initialize subsections array for the current section
//           subTreatments: [], // Initialize
//           subPrices: []
//         };
//       }
//     });
//
//     // Process subsections recursively for each top-level section
//     Object.keys(hierarchicalData).forEach((sectionId) => processSubsection(hierarchicalData[sectionId]));
//
// // Step 5: Sort the sections and subsections (sorting alphabetically for this example)
// //     function sortSectionsAndSubsections(section) {
// //       section.subsections.sort((a, b) => a.rank.localeCompare(b.rank));
// //       section.subsections.forEach((subsection) => sortSectionsAndSubsections(subsection));
// //     }
// //
// //     Object.values(hierarchicalData).forEach((section) => sortSectionsAndSubsections(section));
//
// // Step 6: Output or display the ordered data
//     console.log(JSON.stringify(Object.values(hierarchicalData), null, 2));
//     return hierarchicalData;
//
//     function processSubsection(targetSection) {
//       const sectionChildren = treatmentSections.filter(
//         (item) => item.attributes.section.data && item.attributes.section.data.id === Number(targetSection.sectionId)
//       );
//
//       const treatmentChildren = treatmentDetails.filter(
//         (item) => item.attributes.section.data && item.attributes.section.data.id === Number(targetSection.sectionId)
//       )
//       const priceChildren = treatmentPrices.filter(
//         (item) => item.attributes.section.data && item.attributes.section.data.id === Number(targetSection.sectionId)
//       )
//
//       attachTreatmentsToSection();
//       attachPricesToSection();
//       attachChildrenSectionToSection();
//       // Step 1: If a section has some treatment attached to it add in the subTreatment array
//       // For each treatment their related prices need to be added
//       function attachTreatmentsToSection() {
//         if (treatmentChildren.length === 0) return;
//         // attach treatments to section
//         targetSection.subTreatments = treatmentChildren;
//         // attach prices to each treatment
//         targetSection.subTreatments.forEach(treatment => treatment.prices = getTreatmentPrices(treatment));
//
//         function getTreatmentPrices(treatment) {
//           return treatmentPrices.filter(
//             (item) => item.attributes.treament.data && item.attributes.treament.data.id === Number(treatment.id)
//           )
//         }
//       }
//
//       function attachPricesToSection() {
//         // attach prices to a section if some price are found
//         if (priceChildren.length === 0) return;
//         targetSection.subPrices = priceChildren
//       }
//
//       function attachChildrenSectionToSection() {
//         // attach potential subsection to the targeted section
//         if (sectionChildren.length === 0) return;
//         sectionChildren.forEach(subSection => {
//           targetSection.subSections.push({
//             sectionId: subSection.id,
//             sectionName: subSection.attributes.sectionName,
//             layout: subSection.attributes.layout,
//             type: TreatmentSectionComponent,
//             subSections: [], // Initialize subsections array for the current section
//             subTreatments: [], // Initialize
//             subPrices: []
//           })
//         })
//         // Recursively process each subsection
//         sectionChildren.forEach((subSection) => processSubsection(targetSection.subSections.filter(section => section.sectionId === Number(subSection.id))[0]));
//       }
//     }
//   }

  getServerTimeThenBanner(): any {
    return this.getServerDate().pipe(
      switchMap((serverTime: Date) =>
        this.getHomageBanners(serverTime)
      ),
      catchError(() => this.getHomageBanners()
      ))
  }

  getServerDate(): Observable<Date> {
    return this.http.get<Date>(`${environment.dateApi}/date`)
  }

  postConsultation(consultationData: any): Observable<any> {
    return this.http.post(`${this.beautiCmsUrl}/api/consultations`, {
      data: consultationData,
    })
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post(`${environment.mailService}/send-email`, {
      data: emailData,
    })
  }
}
