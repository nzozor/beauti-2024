export interface TreatmentShowcase {
  Images?: { data: { attributes: TreatmentImages } };
  title: string;
  slug: string;
  Content: string;
  parent: TreatmentShowcase;
  metaTitle: string;
  metaDescription: string;
}

export interface TreatmentImages {
  name: string;
  url: string;
  formats: {
    medium: {
      url: string;
    }
    large: {
      url: string;
    },
    small: {
      url: string;
    },
  };
}
