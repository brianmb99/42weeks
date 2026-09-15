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

export type LocationRhythmHighlight = {
  title: string;
  timing: string;
  description: string;
  url: string;
};

export type LocationRhythmSegment = {
  label: string;
  mapLabel?: string;
  dates: string;
  detail: string;
  days: number;
  tone: LocationRhythmTone;
  highlights?: LocationRhythmHighlight[];
  featureLink?: {
    title: string;
    href: string;
  };
};

export type LocationActivity = {
  id?: string;
  title: string;
  timing: string;
  description: string;
  links?: LocationPageLink[];
};

export type LocationPanel = {
  eyebrow: string;
  title: string;
  headerNote?: string;
  description?: string;
  items?: string[];
  id?: string;
};

export type LocationFeaturePlan = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items?: string[];
  links?: LocationPageLink[];
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
  mobileRhythmLayout?: "overview-cards";
  basePanel: LocationPanel;
  stayTitle: string;
  stayDescription: string;
  stayChecks: string[];
  activities?: LocationActivity[];
  showActivities?: boolean;
  featurePlans?: LocationFeaturePlan[];
  panels?: LocationPanel[];
  planningNotes: string[];
  bookFirst?: string[];
  links?: LocationPageLink[];
};
