export type SegmentFloated = "right" | "left";

export interface CampK12 {
  translate: (inputText: string, fromLang: string, toLang: string) => void;
} 