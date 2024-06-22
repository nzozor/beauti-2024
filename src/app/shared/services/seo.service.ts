import {DOCUMENT} from "@angular/common";
import {Inject, Injectable} from "@angular/core";
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class SeoService {
  defaultMetaContent = `Top-rated boutique skin clinic offers aesthetic, advanced skin and laser hair removal treatments in South London run by aesthetician Cinzia Campigotto`;
  private defaultTitle =
    "Beauti Skin Clinic | Aesthetic and Skin Specialist in South London";
  private seoTitle = 'Beauti Skin Clinic | Oval, Vauxhall, Kennington, Stockwell, brixton, clapham, sw9'

  constructor(private meta: Meta, private titleService: Title, @Inject(DOCUMENT) private doc: Document) {
  }

  get seoAltTitle() {
    return this.defaultTitle;
  }

  public setTitle(newTitle: string) {
    this.doc.querySelector('title')?.remove();
    this.titleService.setTitle(`${newTitle}`);
  }

  public setMeta(meta: MetaDefinition[]) {
    this.doc.querySelector('meta[name="description"]')?.remove();
    this.meta.addTags(meta);
  }

  public setDefaultMeta() {
    this.doc.querySelector('title')?.remove();

    this.titleService.setTitle(
      this.defaultTitle
    );
    this.doc.querySelector('meta[name="description"]')?.remove();

    this.meta.addTags([
      {
        name: 'description',
        content: this.defaultMetaContent
      },
    ]);
  }

  createLinkForCanonicalURL(): void {
    const canonical = this.doc.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.setAttribute('href', 'https://www.beautiskinclinic.com' + this.doc.location?.pathname);
      return;
    }

    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', 'https://www.beautiskinclinic.com' + this.doc.location?.pathname);

    this.doc.head.appendChild(link);
  }
}
