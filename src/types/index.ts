export interface Memory {
  id: string;
  date: string;
  title: string;
  category:
    | "first-meeting"
    | "first-conversation"
    | "first-date"
    | "first-photo"
    | "funny"
    | "trip"
    | "favorite"
    | "difficult"
    | "achievement"
    | "recent";
  description: string;
  image?: string;
  emoji?: string;
}

export interface QuestionOption {
  label: string;
  emoji?: string;
  response: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface NoEscalation {
  prompts: string[];
  finalLabel: string;
  finalResponse: string;
}

export interface YesNoQuestion {
  id: string;
  question: string;
  yesResponse: string;
  noEscalation: NoEscalation;
}

export interface LoveReason {
  id: string;
  title: string;
  message: string;
  icon?: string;
}

export interface Apology {
  id: string;
  title: string;
  whatHappened: string;
  whatIShouldHaveDone: string;
  whatILearned: string;
  whatIWillDo: string;
}

export interface FuturePlan {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BucketListItem {
  id: string;
  label: string;
  emoji?: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  rotation?: number;
}

export interface IfWeWereQuestion {
  id: string;
  prompt: string;
  myAnswer: string;
}

export interface SpecialDate {
  id: string;
  label: string;
  date: string;
  emoji?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist?: string;
  src: string;
}

export interface LetterParagraph {
  text: string;
}

export interface MapLocation {
  label: string;
  lat: number;
  lng: number;
}

export interface LoveStoryConfig {
  myName: string;
  herName: string;
  relationshipStartDate: string;
  anniversaryDate: string;
  herBirthday: string;
  favoriteColor: string;
  favoriteSong: string;
  mapLocation: MapLocation;

  introLines: string[];

  rememberQuestions: Question[];
  playfulQuestions: YesNoQuestion[];

  memories: Memory[];
  photos: PhotoItem[];
  reasonsILoveYou: LoveReason[];
  apologies: Apology[];
  letter: LetterParagraph[];

  loveMessages: string[];

  futurePlans: FuturePlan[];
  bucketList: BucketListItem[];
  ifWeWere: IfWeWereQuestion[];

  specialDates: SpecialDate[];
  musicTracks: MusicTrack[];

  proposalQuestion: string;
  finalSignature: string;

  roseDedicationTitle: string;
  roseDedicationMessage: string;
}
