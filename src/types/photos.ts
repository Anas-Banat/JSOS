import { StaticImageData } from "next/image";

export type PhotoType = {
  id: number;
  titleEn: string;
  titleAr: string;
  imageUrl: string;
  photosUrl?: StaticImageData[];
};