
export type Difficulty = "EASY" | "MODERATE" | "HARD";

export interface IRoute {
  id: string;
  name: string;
  difficulty: Difficulty;
  duration: string;
  distance: string;
  scenicHighlights: string;
  description?: string; 
  image: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}