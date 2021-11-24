export interface Course {
  id?: string;
  name: string;
  description: string;
  price: number;
  createdOn: number;
  createdBy: string;
  imageUrl: string;
  lessons: Lesson[];
  reviews: Review[];
  isDiscount: boolean;
  discountRate?: number;
  discountType?: DISCOUNT_TYPE;
  isTax: boolean;
  taxRate?: number;
  taxType?: DISCOUNT_TYPE;
}

export enum DISCOUNT_TYPE {
  'FIXED' = 'FIXED',
  'PERCENTAGE' = 'PERCENTAGE',
}

export interface Review {
  createdOn: string;
  createdBy: string;
  reviewBody: string;
  rating: number;
}

export interface Lesson {
  seqNo: number;
  isDone: boolean;
  description: string;
  duration: number;
  chapters: Chapter[];
}

export interface Chapter {
  isDone?: boolean;
  content: string;
  duration: number;
}
