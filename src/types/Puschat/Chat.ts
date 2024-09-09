export interface Chat {
  type: "User" | "System";
  text: string;
}

export type ChatHistory = Chat[];
