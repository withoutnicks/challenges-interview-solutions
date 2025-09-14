export interface StateWordle {
  answer: string;
  isLoading: boolean;
  turn: number;
  status: "playing" | "finished";
  words: string[][];
}

export type ActionWordle =
  | { type: "SET_ANSWER"; payload: string }
  | { type: "SET_STATUS"; payload: "playing" | "finished" }
  | { type: "SET_TURN"; payload: number }
  | { type: "UPDATE_WORDS"; payload: string[][] }
  | { type: "RESTART_GAME" };
