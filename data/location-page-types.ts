export type LocationPageLink = {
  title: string;
  url: string;
};

export type LocationPagePhoto = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  source: string;
};

export type LocationRhythmTone =
  | "arrival"
  | "work"
  | "family"
  | "vacation"
  | "travel";

export type LocationRhythmSegment = {
  label: string;
  dates: string;
  detail: string;
  days: number;
  tone: LocationRhythmTone;
};

export type LocationActivity = {
  title: string;
  timing: string;
  description: string;
  links?: LocationPageLink[];
};

export type LocationPanel = {
  eyebrow: string;
  title: string;
  description?: string;
  items?: string[];
  id?: string;
};

export type LocationPagePlan = {
  eyebrow: string;
  title: string;
  dates: string;
  facts: string[];
  summary: string;
  photos: LocationPagePhoto[];
  rhythmTitle: string;
  rhythmSummary: string;
  rhythm: LocationRhythmSegment[];
  stayTitle: string;
  stayDescription: string;
  stayChecks: string[];
  activities: LocationActivity[];
  panels?: LocationPanel[];
  planningNotes: string[];
  bookFirst?: string[];
  links?: LocationPageLink[];
};
