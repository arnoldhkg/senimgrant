export type Language = "kk" | "ru" | "en";
export type Quota = "general" | "rural" | "social" | "target";

export interface Specialty {
  code: string;
  name: Record<Language, string>; // Енді бұл жерде 3 тілдегі атау сақталады
  cat: string;
  grants: number;
  min: number;
  target: number;
  score: number[];
  subjects: string[];
  desc: Record<Language, string>; // Екі тілдегі сипаттама
  demand: number;
  salary: number | null;
}

export interface University {
  code: string;
  name: string;
  city: string;
  type: string;
  website: string | null;
  focus: string[];
  rating: number | null;
  dorm: boolean | null;
  mil: boolean | null;
  price: number | null;
}