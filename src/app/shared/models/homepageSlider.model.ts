export interface HomePageSliderRaw {
  attributes: HomePageSlider;
}

export interface HomePageSlider {
  images: Image[];
  image: { data: { attributes: { url: string, formats: any } } };
  imgSmall: { data: { attributes: { url: string, formats: any } } };
  title1: string;
  findOutMoreUrl: string;
  asterisk: string;
  _id: string;
  name?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  slug: string;
  title: string;
  treatment?: string;
  treatmentParent?: string;
  parent?: HomePageSlider;
  id: string;
  publication?: Date;
  expirationDate?: Date;
  title2?: "Skin Consultation with Cinzia",
  title3?: "Have a skin concern? We can help you.",
  title4?: "Beauti Skin Clinic Founder: Cinzia Campigotto",
  hide: boolean;
  isDefaultBanner: boolean;
  rank: number;
}

export interface Image {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  width: number;
  height: number;
  url: string;
  formats: Formats;
  provider: Provider;
  related: HomePageSlider[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export enum EXT {
  JPEG = ".jpeg",
}

export interface Formats {
  thumbnail: Large;
  large: Large;
  medium: Large;
  small: Large;
}

export interface Large {
  hash: LargeHash;
  ext: EXT;
  mime: MIME;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export enum LargeHash {
  LargeTreatmentSkinbeautyclinic704E97B81C = "large_treatment_skinbeautyclinic_704e97b81c",
  MediumTreatmentSkinbeautyclinic704E97B81C = "medium_treatment_skinbeautyclinic_704e97b81c",
  SmallTreatmentSkinbeautyclinic704E97B81C = "small_treatment_skinbeautyclinic_704e97b81c",
  ThumbnailTreatmentSkinbeautyclinic704E97B81C = "thumbnail_treatment_skinbeautyclinic_704e97b81c",
}

export enum MIME {
  ImageJPEG = "image/jpeg",
}

export enum Provider {
  Local = "local",
}
