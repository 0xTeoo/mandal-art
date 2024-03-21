export type Goal = {
  id: number;
  type: "final" | "sub";
  ideas: Idea[];
}

export type Idea = {
  id: number;
  type: "main" | "sub";
  name: string | null;
}