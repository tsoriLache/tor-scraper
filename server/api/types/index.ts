export interface ClientRequest {
  clientId: string;
  keywords: string[];
}

export interface Result {
  old: { [x: string]: string[] }[];
  neww: { [x: string]: string[] }[];
}
