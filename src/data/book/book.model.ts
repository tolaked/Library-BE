import { Model } from "../database";

export interface Book extends Model {
  title: string;
  img_url: string;
  copies?: number;
}

export interface BookDTO {
  title: string;
  img_url: string;
  copies?: number;
}
